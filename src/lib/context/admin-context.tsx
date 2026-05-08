"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PinModal } from "@/components/ui/pin-modal";
import type { AdminAuth } from "@/lib/hooks/use-admin-auth";

// Read ?admin from window.location instead of next/navigation's
// useSearchParams — calling that hook in the root layout opts every
// route on the site out of static rendering, which strips the SSR'd
// HTML out of crawler responses (BAILOUT_TO_CLIENT_SIDE_RENDERING).

const DEFAULT_PIN = "6886";

const AdminContext = createContext<AdminAuth | null>(null);

/**
 * Single admin auth provider — renders one PinModal for the entire app.
 * No more double-prompt when multiple components need admin access.
 */
export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminMode, setAdminMode] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pinInputRef = useRef<HTMLInputElement>(null!);
  const hasTriggered = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || adminMode || hasTriggered.current) return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("admin")) {
      hasTriggered.current = true;
      setPinModalOpen(true);
      setPinValue("");
      setPinError(false);
      setTimeout(() => pinInputRef.current?.focus(), 100);
    }
  }, [mounted, pathname, adminMode]);

  const submitPin = useCallback(() => {
    if (pinValue === DEFAULT_PIN) {
      setAdminMode(true);
      setAdminPin(pinValue);
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

  const exitAdmin = useCallback(() => {
    setAdminMode(false);
    setAdminPin("");
    hasTriggered.current = false;
    // Remove ?admin from URL so it doesn't re-trigger
    const params = new URLSearchParams(window.location.search);
    params.delete("admin");
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [router, pathname]);

  const auth: AdminAuth = {
    adminMode,
    adminPin,
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
