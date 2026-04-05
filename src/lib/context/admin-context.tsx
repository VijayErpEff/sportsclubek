"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { PinModal } from "@/components/ui/pin-modal";
import type { AdminAuth } from "@/lib/hooks/use-admin-auth";

const DEFAULT_PIN = "6886";

const AdminContext = createContext<AdminAuth | null>(null);

/**
 * Single admin auth provider — renders one PinModal for the entire app.
 * No more double-prompt when multiple components need admin access.
 */
export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminMode, setAdminMode] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pinInputRef = useRef<HTMLInputElement>(null!);
  const searchParams = useSearchParams();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && searchParams.has("admin") && !adminMode) {
      setPinModalOpen(true);
      setPinValue("");
      setPinError(false);
      setTimeout(() => pinInputRef.current?.focus(), 100);
    }
  }, [mounted, searchParams, adminMode]);

  const submitPin = useCallback(() => {
    if (pinValue === DEFAULT_PIN) {
      setAdminMode(true);
      setPinModalOpen(false);
    } else {
      setPinError(true);
      setPinValue("");
      pinInputRef.current?.focus();
    }
  }, [pinValue]);

  const closePinModal = useCallback(() => {
    setPinModalOpen(false);
    setPinValue("");
    setPinError(false);
  }, []);

  const openPinModal = useCallback(() => {
    setPinModalOpen(true);
    setPinValue("");
    setPinError(false);
    setTimeout(() => pinInputRef.current?.focus(), 100);
  }, []);

  const exitAdmin = useCallback(() => setAdminMode(false), []);

  const auth: AdminAuth = {
    adminMode,
    pinModalOpen,
    pinValue,
    pinError,
    pinInputRef,
    setPinValue,
    submitPin,
    closePinModal,
    openPinModal,
    exitAdmin,
  };

  return (
    <AdminContext.Provider value={auth}>
      {children}
      <PinModal auth={auth} variant="light" />
    </AdminContext.Provider>
  );
}

/**
 * Use the shared admin auth state. Must be inside AdminProvider.
 */
export function useAdmin(): AdminAuth {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
