"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalPreference<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);

  // Initialize from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch {
      // localStorage unavailable or invalid JSON — use default
    }
  }, [key]);

  // Sync across tabs via storage event
  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key !== key) return;

      try {
        if (event.newValue === null) {
          setStoredValue(defaultValue);
        } else {
          setStoredValue(JSON.parse(event.newValue) as T);
        }
      } catch {
        setStoredValue(defaultValue);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, defaultValue]);

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // localStorage unavailable — state still updates in-memory
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
