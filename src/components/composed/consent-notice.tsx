import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/**
 * One-line legal notice under every lead/contact form. `sms` adds the TCPA
 * consent sentence for forms that collect a phone number.
 */
export function ConsentNotice({
  sms = false,
  marketing = false,
  className,
}: {
  sms?: boolean;
  marketing?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("text-[11px] leading-relaxed text-neutral-500", className)}>
      By submitting, you agree to our{" "}
      <Link href="/terms" className="underline underline-offset-2 hover:text-neutral-700">
        Terms
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-700">
        Privacy Policy
      </Link>
      {marketing && " and to receive emails from LevelUP Sports about programs, events, and offers (unsubscribe anytime)"}
      {sms &&
        ". If you give a phone number, you consent to calls and text messages from LevelUP Sports at that number, including automated messages, about your inquiry and our programs. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out"}
      .
    </p>
  );
}
