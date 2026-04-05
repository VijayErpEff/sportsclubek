"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { sendContactForm } from "@/lib/emailjs";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await sendContactForm({
        name: (data.get("name") as string)?.trim() || "",
        email: (data.get("email") as string)?.trim() || "",
        phone: (data.get("phone") as string)?.trim() || "",
        subject: (data.get("subject") as string)?.trim() || "",
        message: (data.get("message") as string)?.trim() || "",
      });
      setStatus("success");
    } catch {
      setErrorMessage("Failed to send message. Please try again or call us directly.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8" aria-live="polite">
        <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
        <p className="text-neutral-600">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          Check your email for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-900 mb-1">
            Name <span className="text-error">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-900 mb-1">
            Email <span className="text-error">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-neutral-900 mb-1">
          Phone
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-neutral-900 mb-1">
          Subject <span className="text-error">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          className="w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          defaultValue=""
        >
          <option value="" disabled>Select a topic</option>
          <option value="Booking & Reservations">Booking &amp; Reservations</option>
          <option value="Memberships">Memberships</option>
          <option value="Academy Programs">Academy Programs</option>
          <option value="Careers & Employment">Careers &amp; Employment</option>
          <option value="Events & Open House">Events &amp; Open House</option>
          <option value="Offers & Promotions">Offers &amp; Promotions</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-900 mb-1">
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y"
          placeholder="How can we help you?"
        />
      </div>

      {status === "error" && (
        <p className="text-error text-sm" aria-live="polite">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
