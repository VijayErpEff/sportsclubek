"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";

const DEFAULT_PIN = "6886";

export interface AdminAuth {
  adminMode: boolean;
  adminPin: string;
  pinModalOpen: boolean;
  pinValue: string;
  pinError: boolean;
  pinInputRef: React.RefObject<HTMLInputElement>;
  setPinValue: (v: string) => void;
  submitPin: () => void;
  closePinModal: () => void;
  openPinModal: () => void;
  exitAdmin: () => void;
}

export function useAdminAuth(pin = DEFAULT_PIN): AdminAuth {
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
    if (pinValue === pin) {
      setAdminMode(true);
      setPinModalOpen(false);
    } else {
      setPinError(true);
      setPinValue("");
      pinInputRef.current?.focus();
    }
  }, [pinValue, pin]);

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

  return {
    adminMode,
    adminPin: adminMode ? pin : "",
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
}
