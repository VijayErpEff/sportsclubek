"use client";

import { useState, type FormEvent } from "react";
import { Download, LockKeyhole, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import type { SafeRegistration } from "@/lib/storage/tournament-registration";

interface ListResponse {
  total: number;
  byPayment: { pending: number; paid: number; waived: number };
  totalPlayers: number;
  registrations: SafeRegistration[];
}

const STATUS_STYLES: Record<SafeRegistration["paymentStatus"], string> = {
  paid: "bg-secondary/15 text-accent-hover",
  waived: "bg-info/10 text-primary",
  pending: "bg-warning/15 text-neutral-800",
};

export function RegistrationsBoard() {
  const [pin, setPin] = useState("");
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const load = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!pin) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/tournaments/smash-cup/registrations?pin=${encodeURIComponent(pin)}`,
        { cache: "no-store" }
      );
      if (res.status === 401) {
        setError("That PIN didn't match.");
        setData(null);
        return;
      }
      if (!res.ok) {
        setError("Couldn't load registrations. Try again in a moment.");
        return;
      }
      const json = (await res.json()) as ListResponse;
      // Newest first — the API list is an lpush stack, so it already is.
      setData(json);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = () => {
    if (!data) return;
    const rows: string[][] = [
      [
        "Registration ID",
        "Team",
        "Captain",
        "Captain Email",
        "Captain Phone",
        "Players",
        "Roster (name / age)",
        "Emergency Contact",
        "Emergency Phone",
        "Payment Method",
        "Payment Status",
        "Notes",
        "Registered At",
      ],
      ...data.registrations.map((r) => [
        r.id,
        r.teamName,
        r.captain.name,
        r.captain.email,
        r.captain.phone,
        String(r.players.length),
        r.players.map((p) => `${p.name}${p.age ? ` (${p.age})` : ""}`).join("; "),
        r.emergencyContact.name,
        r.emergencyContact.phone,
        r.paymentMethod === "pay_online" ? "App" : "Pay later",
        r.paymentStatus,
        r.notes ?? "",
        new Date(r.createdAt).toLocaleString("en-US", { timeZone: "America/New_York" }),
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `smash-cup-oct-2026-registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <form
        onSubmit={load}
        className="bg-white rounded-xl border border-neutral-200 p-5 md:p-6 shadow-sm max-w-md"
      >
        <div className="flex items-center gap-2 mb-4 text-neutral-900">
          <LockKeyhole className="h-4 w-4 text-accent" aria-hidden="true" />
          <h2 className="font-display font-bold">Enter the staff PIN</h2>
        </div>
        <FloatingInput
          label="Staff PIN"
          name="pin"
          type="password"
          inputMode="numeric"
          required
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          error={error ?? undefined}
          autoComplete="off"
        />
        <Button type="submit" size="md" isLoading={loading} className="mt-4 w-full sm:w-auto">
          View registrations
        </Button>
      </form>
    );
  }

  const { registrations, byPayment } = data;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Teams", value: data.total },
          { label: "Players", value: data.totalPlayers },
          { label: "Paid", value: byPayment.paid + byPayment.waived },
          { label: "Payment pending", value: byPayment.pending },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {s.label}
            </p>
            <p className="font-mono text-3xl font-bold text-neutral-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="md" onClick={() => load()} isLoading={loading}>
          <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
          Refresh
        </Button>
        <Button type="button" size="md" onClick={exportCsv} disabled={registrations.length === 0}>
          <Download className="h-4 w-4 mr-2" aria-hidden="true" />
          Export CSV
        </Button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      {registrations.length === 0 ? (
        <div className="bg-neutral-50 border border-dashed border-neutral-300 rounded-xl p-10 text-center text-neutral-500">
          No teams have registered yet. Share{" "}
          <span className="font-mono text-neutral-700">levelupsports.us/go/volleyball-register</span>{" "}
          to get the first one in.
        </div>
      ) : (
        <ol className="space-y-3">
          {registrations.map((r, idx) => {
            const isOpen = !!open[r.id];
            return (
              <li key={r.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [r.id]: !isOpen }))}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 md:p-5 flex items-start gap-3 min-h-[44px]"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md bg-neutral-100 text-xs font-bold text-neutral-600 font-mono"
                  >
                    {registrations.length - idx}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-display font-bold text-neutral-900">{r.teamName}</span>
                      <span className="font-mono text-xs text-neutral-400">{r.id}</span>
                      <span
                        className={cn(
                          "text-[11px] font-bold uppercase tracking-wider rounded-md px-2 py-0.5",
                          STATUS_STYLES[r.paymentStatus]
                        )}
                      >
                        {r.paymentStatus}
                        {r.paymentStatus === "pending" &&
                          (r.paymentMethod === "pay_online" ? " · app" : " · pay later")}
                      </span>
                    </span>
                    <span className="block text-sm text-neutral-600 mt-1">
                      {r.captain.name} ·{" "}
                      <a href={`tel:${r.captain.phone}`} className="hover:text-accent">
                        {r.captain.phone}
                      </a>{" "}
                      ·{" "}
                      <a href={`mailto:${r.captain.email}`} className="hover:text-accent break-all">
                        {r.captain.email}
                      </a>
                    </span>
                    <span className="block text-xs text-neutral-400 mt-1">
                      {r.players.length} players · registered{" "}
                      {new Date(r.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        timeZone: "America/New_York",
                      })}
                    </span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-neutral-400 shrink-0 mt-1" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-400 shrink-0 mt-1" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-neutral-100 p-4 md:p-5 grid md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                        Roster
                      </p>
                      <ol className="space-y-1 text-sm text-neutral-700">
                        {r.players.map((p, i) => (
                          <li key={`${r.id}-${i}`} className="flex gap-2">
                            <span className="font-mono text-xs text-neutral-400 w-4">{i + 1}</span>
                            <span>
                              {p.name}
                              {p.age ? <span className="text-neutral-400"> · {p.age}</span> : null}
                              {p.isCaptain ? <span className="text-accent"> · C</span> : null}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Emergency contact
                        </p>
                        <p className="text-neutral-700">
                          {r.emergencyContact.name} ·{" "}
                          <a href={`tel:${r.emergencyContact.phone}`} className="hover:text-accent">
                            {r.emergencyContact.phone}
                          </a>
                        </p>
                      </div>
                      {r.notes && (
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                            Notes
                          </p>
                          <p className="text-neutral-700 whitespace-pre-wrap">{r.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
