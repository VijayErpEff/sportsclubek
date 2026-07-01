codeunit 50222 "EEE Sales Line Split Mgt"
{
    // Auto-splits a machine sales line into Warranty/Install/Tooling/PM/EOW Inspection child lines
    // at order entry, keeping the customer-facing order total unchanged (DMD-BC-2026-001).
    // A "split child line" is any Sales Line whose "EEE Machine Line No." points at the machine
    // line (covers both system-inserted lines and lines re-added manually per FR-12).
    // SingleInstance so the IsAdjusting re-entrancy guard is shared across nested validate events.
    SingleInstance = true;

    var
        MachineFAMgt: Codeunit "EEE Machine FA Mgt";
        IsAdjusting: Boolean;
        HeaderBeingDeleted: Boolean;
        MfrModelMissingMsg: Label 'The Manufacturer/Model combination does not exist.';
        NoWarrantyInstallPermErr: Label 'You do not have permission to edit Warranty or Install amounts. Contact a Sales Manager.';
        NoToolingPermErr: Label 'You do not have permission to edit Tooling, PM or EOW Inspection amounts.';
        NoDeleteWarrantyInstallErr: Label 'You do not have permission to delete Warranty or Install lines. Contact a Sales Manager.';
        CreatingLinesTxt: Label 'Creating revenue-split lines...';
        SplitAppliedMsg: Label 'Revenue split applied to %1: Warranty, Install, Tooling, PM and EOW Inspection lines were added and the machine unit price was set to the residual. The order total is unchanged.', Comment = '%1 = machine item No.';

    [EventSubscriber(ObjectType::Table, Database::"Sales Line", 'OnAfterValidateEvent', 'No.', false, false)]
    local procedure OnAfterValidateNo(var Rec: Record "Sales Line"; var xRec: Record "Sales Line")
    begin
        if IsAdjusting then
            exit;
        if Rec."EEE Machine Line No." <> 0 then
            exit;
        if not IsApplicableDocument(Rec) then
            exit;
        if Rec.Type <> Rec.Type::Item then
            exit;
        if Rec."No." = '' then
            exit;
        if not MachineFAMgt.IsMachinePostingGroup(Rec."Gen. Prod. Posting Group") then
            exit;
        if ChildLinesExist(Rec) then
            exit;
        SplitSalesLine(Rec);
    end;

    [EventSubscriber(ObjectType::Table, Database::"Sales Line", 'OnAfterValidateEvent', 'Unit Price', false, false)]
    local procedure OnAfterValidateUnitPrice(var Rec: Record "Sales Line"; var xRec: Record "Sales Line")
    begin
        if IsAdjusting then
            exit;
        if not IsApplicableDocument(Rec) then
            exit;

        if Rec."EEE Machine Line No." <> 0 then begin
            CheckChildEditPermission(Rec);
            RecalcParentOf(Rec);
            exit;
        end;

        if not MachineFAMgt.IsMachinePostingGroup(Rec."Gen. Prod. Posting Group") then
            exit;

        if not ChildLinesExist(Rec) then begin
            SplitSalesLine(Rec);
            exit;
        end;

        // Machine line re-priced by the user: the entered value is the new bundled total.
        Rec."EEE Original Price" := Rec."Unit Price";
        Rec.Modify(true);
        RecalculateMachineLine(Rec);
    end;

    [EventSubscriber(ObjectType::Table, Database::"Sales Line", 'OnAfterValidateEvent', 'Quantity', false, false)]
    local procedure OnAfterValidateQuantity(var Rec: Record "Sales Line"; var xRec: Record "Sales Line")
    var
        Child: Record "Sales Line";
    begin
        if IsAdjusting then
            exit;
        if Rec."EEE Machine Line No." <> 0 then
            exit;
        if not IsApplicableDocument(Rec) then
            exit;
        if Rec.Type <> Rec.Type::Item then
            exit;
        if not MachineFAMgt.IsMachinePostingGroup(Rec."Gen. Prod. Posting Group") then
            exit;
        if not ChildLinesExist(Rec) then begin
            SplitSalesLine(Rec);
            exit;
        end;

        IsAdjusting := true;
        FilterChildLines(Child, Rec);
        if Child.FindSet() then
            repeat
                Child.Validate(Quantity, Rec.Quantity);
                Child.Modify(true);
            until Child.Next() = 0;
        IsAdjusting := false;
    end;

    [EventSubscriber(ObjectType::Table, Database::"Sales Line", 'OnBeforeDeleteEvent', '', false, false)]
    local procedure OnBeforeDeleteSalesLine(var Rec: Record "Sales Line"; RunTrigger: Boolean)
    var
        Child: Record "Sales Line";
    begin
        if IsAdjusting then
            exit;
        if HeaderBeingDeleted then
            exit;
        if not IsApplicableDocument(Rec) then
            exit;

        if Rec."EEE Machine Line No." <> 0 then begin
            if IsWarrantyOrInstall(Rec) and not CanEditWarrantyInstall() then
                Error(NoDeleteWarrantyInstallErr);
            exit;
        end;

        if not MachineFAMgt.IsMachinePostingGroup(Rec."Gen. Prod. Posting Group") then
            exit;

        IsAdjusting := true;
        FilterChildLines(Child, Rec);
        if not Child.IsEmpty() then
            Child.DeleteAll(true);
        IsAdjusting := false;
    end;

    [EventSubscriber(ObjectType::Table, Database::"Sales Line", 'OnAfterDeleteEvent', '', false, false)]
    local procedure OnAfterDeleteSalesLine(var Rec: Record "Sales Line"; RunTrigger: Boolean)
    begin
        if IsAdjusting then
            exit;
        if HeaderBeingDeleted then
            exit;
        if not IsApplicableDocument(Rec) then
            exit;
        if Rec."EEE Machine Line No." <> 0 then
            RecalcParentOf(Rec);
    end;

    // While a Sales Header is being deleted the platform removes every line itself; skip our
    // per-line cascade/recalc to avoid deleting child lines twice (and to not block on permission).
    [EventSubscriber(ObjectType::Table, Database::"Sales Header", 'OnBeforeDeleteEvent', '', false, false)]
    local procedure OnBeforeDeleteSalesHeader(var Rec: Record "Sales Header"; RunTrigger: Boolean)
    begin
        HeaderBeingDeleted := true;
    end;

    [EventSubscriber(ObjectType::Table, Database::"Sales Header", 'OnAfterDeleteEvent', '', false, false)]
    local procedure OnAfterDeleteSalesHeader(var Rec: Record "Sales Header"; RunTrigger: Boolean)
    begin
        HeaderBeingDeleted := false;
    end;

    local procedure SplitSalesLine(var MachineLine: Record "Sales Line")
    var
        SalesSetup: Record "Sales & Receivables Setup";
        Item: Record Item;
        ProgressDialog: Dialog;
        WarrantyPrice: Decimal;
        InstallPrice: Decimal;
        MfrCode: Code[10];
        OrderDate: Date;
        MfrMissing: Boolean;
    begin
        if IsAdjusting then
            exit;
        if not IsApplicableDocument(MachineLine) then
            exit;
        if MachineLine."Line No." = 0 then
            exit;
        SalesSetup.Get();

        if GuiAllowed() then
            ProgressDialog.Open(CreatingLinesTxt);

        IsAdjusting := true;
        MachineLine."EEE Original Price" := MachineLine."Unit Price";
        MachineLine.Modify(true);

        OrderDate := GetOrderDate(MachineLine);
        if Item.Get(MachineLine."No.") then
            MfrCode := Item."Manufacturer Code";

        if not GetWarrantyInstallPrices(MfrCode, MachineLine."No.", OrderDate, WarrantyPrice, InstallPrice) then begin
            WarrantyPrice := 0;
            InstallPrice := 0;
            MfrMissing := true;
        end;

        CreateSplitLine(MachineLine, SalesSetup."EEE Service Warranty Item No.", 10, WarrantyPrice);
        CreateSplitLine(MachineLine, SalesSetup."EEE Service Install Item No.", 20, InstallPrice);
        CreateSplitLine(MachineLine, SalesSetup."EEE Tooling Item No.", 30, 0);
        CreateSplitLine(MachineLine, SalesSetup."EEE PM Service Item No.", 40, 0);
        CreateSplitLine(MachineLine, SalesSetup."EEE Service Break Fix Item No.", 50, 0);
        IsAdjusting := false;

        RecalculateMachineLine(MachineLine);

        if GuiAllowed() then begin
            ProgressDialog.Close();
            if MfrMissing then
                Message(MfrModelMissingMsg);
            SendSplitNotification(MachineLine);
        end;
    end;

    local procedure SendSplitNotification(MachineLine: Record "Sales Line")
    var
        SplitNotification: Notification;
    begin
        SplitNotification.Message(StrSubstNo(SplitAppliedMsg, MachineLine."No."));
        SplitNotification.Scope(NotificationScope::LocalScope);
        SplitNotification.Send();
    end;

    local procedure CreateSplitLine(MachineLine: Record "Sales Line"; ItemNo: Code[20]; LineOffset: Integer; UnitPriceVal: Decimal)
    var
        SalesLine: Record "Sales Line";
    begin
        if ItemNo = '' then
            exit;

        SalesLine.Init();
        SalesLine."Document Type" := MachineLine."Document Type";
        SalesLine."Document No." := MachineLine."Document No.";
        SalesLine."Line No." := MachineLine."Line No." + LineOffset;
        SalesLine."EEE Is Auto-Generated" := true;
        SalesLine."EEE Machine Line No." := MachineLine."Line No.";
        SalesLine.Insert(true);

        // The placeholder service item's own Gen. Prod. Posting Group must drive revenue routing.
        // Clear the header-inherited product group so ApplyProductGroupPostingGroup (fired by the
        // No. validation below) does not overwrite SVC-WARRANTY/SVC-INSTALL/... with the machine group.
        SalesLine."EEE Product Group" := '';

        SalesLine.Validate(Type, SalesLine.Type::Item);
        SalesLine.Validate("No.", ItemNo);
        SalesLine.Validate(Quantity, MachineLine.Quantity);
        SalesLine.Validate("Unit Price", UnitPriceVal);
        if MachineLine."Purchasing Code" <> '' then
            SalesLine.Validate("Purchasing Code", MachineLine."Purchasing Code");
        SalesLine."Location Code" := MachineLine."Location Code";
        SalesLine."EEE Is Auto-Generated" := true;
        SalesLine."EEE Machine Line No." := MachineLine."Line No.";
        SalesLine.Modify(true);
    end;

    local procedure RecalculateMachineLine(var MachineLine: Record "Sales Line")
    var
        Child: Record "Sales Line";
        Residual: Decimal;
    begin
        if IsAdjusting then
            exit;
        if MachineLine."EEE Machine Line No." <> 0 then
            exit;

        Residual := MachineLine."EEE Original Price";
        FilterChildLines(Child, MachineLine);
        if Child.FindSet() then
            repeat
                Residual -= Child."Unit Price";
            until Child.Next() = 0;

        IsAdjusting := true;
        MachineLine.Validate("Unit Price", Residual);
        MachineLine.Modify(true);
        IsAdjusting := false;
    end;

    // Called from the "EEE Original Price" field OnValidate when a user corrects the bundled price.
    // No Modify here: the page persists the record after the field validates.
    procedure RecalcFromOriginalPriceChange(var MachineLine: Record "Sales Line")
    var
        Child: Record "Sales Line";
        Residual: Decimal;
    begin
        if IsAdjusting then
            exit;
        if not IsApplicableDocument(MachineLine) then
            exit;
        if MachineLine."EEE Machine Line No." <> 0 then
            exit;
        if not ChildLinesExist(MachineLine) then
            exit;

        Residual := MachineLine."EEE Original Price";
        FilterChildLines(Child, MachineLine);
        if Child.FindSet() then
            repeat
                Residual -= Child."Unit Price";
            until Child.Next() = 0;

        IsAdjusting := true;
        MachineLine.Validate("Unit Price", Residual);
        IsAdjusting := false;
    end;

    local procedure RecalcParentOf(Child: Record "Sales Line")
    var
        MachineLine: Record "Sales Line";
    begin
        if Child."EEE Machine Line No." = 0 then
            exit;
        if MachineLine.Get(Child."Document Type", Child."Document No.", Child."EEE Machine Line No.") then
            RecalculateMachineLine(MachineLine);
    end;

    procedure GetWarrantyInstallPrices(MfrCode: Code[10]; ModelItemNo: Code[20]; OrderDate: Date; var WarrantyPrice: Decimal; var InstallPrice: Decimal): Boolean
    var
        Pricing: Record "EEE Warranty Install Pricing";
    begin
        WarrantyPrice := 0;
        InstallPrice := 0;
        Pricing.SetRange("Manufacturer Code", MfrCode);
        Pricing.SetRange("Manufacturer Model", ModelItemNo);
        Pricing.SetFilter("Effective Date", '<=%1', OrderDate);
        if Pricing.FindLast() then begin
            WarrantyPrice := Pricing."Warranty Price";
            InstallPrice := Pricing."Install Price";
            exit(true);
        end;
        exit(false);
    end;

    local procedure FilterChildLines(var Child: Record "Sales Line"; MachineLine: Record "Sales Line")
    begin
        Child.Reset();
        Child.SetRange("Document Type", MachineLine."Document Type");
        Child.SetRange("Document No.", MachineLine."Document No.");
        Child.SetRange("EEE Machine Line No.", MachineLine."Line No.");
    end;

    local procedure ChildLinesExist(MachineLine: Record "Sales Line"): Boolean
    var
        Child: Record "Sales Line";
    begin
        if MachineLine."Line No." = 0 then
            exit(false);
        FilterChildLines(Child, MachineLine);
        exit(not Child.IsEmpty());
    end;

    local procedure IsApplicableDocument(SalesLine: Record "Sales Line"): Boolean
    begin
        exit(SalesLine."Document Type" = SalesLine."Document Type"::Order);
    end;

    local procedure GetOrderDate(MachineLine: Record "Sales Line"): Date
    var
        SalesHeader: Record "Sales Header";
    begin
        if SalesHeader.Get(MachineLine."Document Type", MachineLine."Document No.") then
            if SalesHeader."Order Date" <> 0D then
                exit(SalesHeader."Order Date");
        exit(WorkDate());
    end;

    local procedure IsWarrantyOrInstall(Child: Record "Sales Line"): Boolean
    var
        SalesSetup: Record "Sales & Receivables Setup";
    begin
        SalesSetup.Get();
        exit(
            (Child."No." = SalesSetup."EEE Service Warranty Item No.") or
            (Child."No." = SalesSetup."EEE Service Install Item No."));
    end;

    local procedure CheckChildEditPermission(Child: Record "Sales Line")
    begin
        if IsWarrantyOrInstall(Child) then begin
            if not CanEditWarrantyInstall() then
                Error(NoWarrantyInstallPermErr);
        end else
            if not CanEditToolingPMEOWI() then
                Error(NoToolingPermErr);
    end;

    local procedure CanEditWarrantyInstall(): Boolean
    var
        ToolingPMEOWI: Boolean;
        WarrantyInstall: Boolean;
    begin
        GetCurrentPermissions(ToolingPMEOWI, WarrantyInstall);
        exit(WarrantyInstall);
    end;

    local procedure CanEditToolingPMEOWI(): Boolean
    var
        ToolingPMEOWI: Boolean;
        WarrantyInstall: Boolean;
    begin
        GetCurrentPermissions(ToolingPMEOWI, WarrantyInstall);
        exit(ToolingPMEOWI);
    end;

    local procedure GetCurrentPermissions(var ToolingPMEOWI: Boolean; var WarrantyInstall: Boolean)
    var
        UserPersonalization: Record "User Personalization";
        Perm: Record "EEE Profile Rev. Split Perm";
    begin
        ToolingPMEOWI := false;
        WarrantyInstall := false;
        if not UserPersonalization.Get(UserSecurityId()) then
            exit;
        if UserPersonalization."Profile ID" = '' then
            exit;
        if Perm.Get(UserPersonalization.Scope, UserPersonalization."App ID", UserPersonalization."Profile ID") then begin
            ToolingPMEOWI := Perm."Edit Tooling PM EOWI Amts";
            WarrantyInstall := Perm."Edit Warranty Install Amts";
        end;
    end;

    procedure IsSplitChildLine(SalesLine: Record "Sales Line"): Boolean
    begin
        exit(SalesLine."EEE Machine Line No." <> 0);
    end;

    procedure CanCurrentUserEditLine(SalesLine: Record "Sales Line"): Boolean
    begin
        if SalesLine."EEE Machine Line No." = 0 then
            exit(true);
        if IsWarrantyOrInstall(SalesLine) then
            exit(CanEditWarrantyInstall());
        exit(CanEditToolingPMEOWI());
    end;
}
