"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { sendCareerApplication } from "@/lib/emailjs";

export function CareerApplyButton({
  position,
  className,
  children,
}: {
  position: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <AnimatePresence>
        {open && <CareerModal position={position} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function CareerModal({
  position,
  onClose,
}: {
  position: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await sendCareerApplication({
        name: (data.get("name") as string)?.trim() || "",
        email: (data.get("email") as string)?.trim() || "",
        phone: (data.get("phone") as string)?.trim() || "",
        position,
        message: (data.get("message") as string)?.trim() || "",
      });
      setStatus("success");
    } catch {
      setErrorMessage("Failed to submit. Please try again or email us directly.");
      setStatus("error");
    }
  };

  const inputCn =
    "w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl p-6 w-full max-w-md bg-white border border-neutral-200 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg font-bold text-neutral-900">
            Apply Now
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-neutral-500 mb-5">{position}</p>

        {status === "success" ? (
          <div className="text-center py-6" aria-live="polite">
            <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
            <h4 className="text-lg font-bold text-neutral-900 mb-2">Application Sent!</h4>
            <p className="text-sm text-neutral-600 mb-4">
              We&apos;ll review your application and get back to you soon. Check your email for a confirmation.
            </p>
            <button
              onClick={onClose}
              className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="career-name" className="block text-sm font-medium text-neutral-900 mb-1">
                  Name <span className="text-error">*</span>
                </label>
                <input
                  id="career-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputCn}
                />
              </div>
              <div>
                <label htmlFor="career-email" className="block text-sm font-medium text-neutral-900 mb-1">
                  Email <span className="text-error">*</span>
                </label>
                <input
                  id="career-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputCn}
                />
              </div>
            </div>

            <div>
              <label htmlFor="career-phone" className="block text-sm font-medium text-neutral-900 mb-1">
                Phone
              </label>
              <input
                id="career-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 123-4567"
                className={inputCn}
              />
            </div>

            <div>
              <label htmlFor="career-message" className="block text-sm font-medium text-neutral-900 mb-1">
                Tell us about yourself <span className="text-error">*</span>
              </label>
              <textarea
                id="career-message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y text-sm"
                placeholder="Your experience, qualifications, and why you'd like to join LevelUp Sports..."
              />
            </div>

            {status === "error" && (
              <p className="text-error text-sm" aria-live="polite">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
