"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = useCallback((state: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage unavailable
    }
    setVisible(false);
    setShowPreferences(false);
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
  };

  if (!visible) return null;

  return (
    <>
      {/* Main Banner */}
      {!showPreferences && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-description"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white p-4 shadow-lg md:p-6"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p id="cookie-description" className="text-sm text-neutral-600 text-center sm:text-left">
              We use cookies to improve your experience. You can accept all
              cookies, reject non-essential cookies, or customize your
              preferences.
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => setShowPreferences(true)}>
                Manage Preferences
              </Button>
              <Button variant="outline" size="sm" onClick={handleRejectAll}>
                Reject All
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowPreferences(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label="Cookie preferences"
            aria-modal="true"
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">
                Cookie Preferences
              </h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close preferences"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-neutral-600 mb-6">
              Choose which cookies you&apos;d like to allow. Necessary cookies
              are always enabled as they are essential for the site to function.
            </p>

            <div className="space-y-4">
              {/* Necessary */}
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div>
                  <p className="font-semibold text-sm text-neutral-900">
                    Necessary
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Essential for the website to function. Cannot be disabled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  aria-label="Necessary cookies (always enabled)"
                  className="h-5 w-5 rounded border-neutral-300 text-accent focus:ring-accent"
                />
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div>
                  <p className="font-semibold text-sm text-neutral-900">
                    Analytics
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) =>
                    setConsent((prev) => ({
                      ...prev,
                      analytics: e.target.checked,
                    }))
                  }
                  aria-label="Analytics cookies"
                  className="h-5 w-5 rounded border-neutral-300 text-accent focus:ring-accent"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
                <div>
                  <p className="font-semibold text-sm text-neutral-900">
                    Marketing
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Used to deliver relevant ads and track campaign performance.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consent.marketing}
                  onChange={(e) =>
                    setConsent((prev) => ({
                      ...prev,
                      marketing: e.target.checked,
                    }))
                  }
                  aria-label="Marketing cookies"
                  className="h-5 w-5 rounded border-neutral-300 text-accent focus:ring-accent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleRejectAll}
              >
                Reject All
              </Button>
              <Button size="sm" className="flex-1" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
