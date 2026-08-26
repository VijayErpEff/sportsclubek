import "server-only";
import { EmailClient, type EmailMessage } from "@azure/communication-email";

/**
 * Azure Communication Services email transport.
 * Server-only — never import from client components.
 */

const SENDER = process.env.ACS_SENDER_ADDRESS || "DoNotReply@levelupsports.us";
export const BUSINESS_INBOX = process.env.CONTACT_EMAIL || "info@levelupsports.us";

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

/**
 * Sends an email through ACS. Waits for the send to be accepted by the
 * service, then returns the operation id. Throws on failure.
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
  const result = await poller.pollUntilDone();
  if (result.status !== "Succeeded") {
    throw new Error(`ACS send failed: ${result.status} ${result.error?.message ?? ""}`.trim());
  }
  return result.id;
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
