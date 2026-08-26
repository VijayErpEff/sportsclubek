import "server-only";
import { EmailClient, type EmailMessage } from "@azure/communication-email";

/**
 * Azure Communication Services email transport.
 * Server-only — never import from client components.
 */

const SENDER = process.env.ACS_SENDER_ADDRESS || "DoNotReply@levelupsports.us";
/**
 * Business inbox(es) for notifications. `CONTACT_EMAIL` may be a single
 * address or a comma/semicolon-separated list, e.g.
 * "info@levelupsports.us, vijay@levelupsports.us".
 */
export const BUSINESS_INBOX: string[] = (process.env.CONTACT_EMAIL || "info@levelupsports.us")
  .split(/[,;]/)
  .map((s) => s.trim())
  .filter(Boolean);

/** Address applicants/customers should reply to (first business inbox). */
export const REPLY_TO_INBOX = BUSINESS_INBOX[0];

let client: EmailClient | null | undefined;

function getClient(): EmailClient | null {
  if (client !== undefined) return client;
  const conn = process.env.ACS_CONNECTION_STRING;
  client = conn ? new EmailClient(conn) : null;
  return client;
}

export function isEmailConfigured(): boolean {
  return getClient() !== null;
}

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  /** Plain-text alternative; derived from HTML when omitted. */
  text?: string;
  replyTo?: string;
}

/** How long to wait for ACS to confirm delivery hand-off before returning. */
const CONFIRM_TIMEOUT_MS = 5000;

/**
 * Sends an email through ACS. `beginSend` throws immediately on auth/validation
 * errors (the request was rejected). Once accepted, ACS queues the message; we
 * wait a bounded time for the "Succeeded" confirmation so a serverless function
 * (Netlify: 10s cap) never hangs on polling. Returns the operation id.
 */
export async function sendEmail(input: SendEmailInput): Promise<string> {
  const acs = getClient();
  if (!acs) throw new Error("ACS email is not configured (ACS_CONNECTION_STRING missing)");

  const recipients = (Array.isArray(input.to) ? input.to : [input.to]).map((address) => ({ address }));

  const message: EmailMessage = {
    senderAddress: SENDER,
    recipients: { to: recipients },
    content: {
      subject: input.subject,
      html: input.html,
      plainText: input.text ?? htmlToText(input.html),
    },
    ...(input.replyTo ? { replyTo: [{ address: input.replyTo }] } : {}),
  };

  const poller = await acs.beginSend(message);

  const confirmed = await Promise.race([
    poller.pollUntilDone(),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), CONFIRM_TIMEOUT_MS)),
  ]);

  if (confirmed === null) {
    const state = poller.getOperationState();
    const id = state.result?.id ?? "unknown";
    console.warn(`[email] ACS accepted message ${id} but confirmation not received within ${CONFIRM_TIMEOUT_MS}ms`);
    return id;
  }
  if (confirmed.status !== "Succeeded") {
    throw new Error(`ACS send failed: ${confirmed.status} ${confirmed.error?.message ?? ""}`.trim());
  }
  return confirmed.id;
}

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|h[1-6]|li)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&bull;/g, "•")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
