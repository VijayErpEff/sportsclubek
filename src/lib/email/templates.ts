/**
 * Branded HTML email templates (ported from docs/email-templates/*.html).
 * All user-supplied values are escaped before interpolation.
 */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const nl2br = (value: string) => escapeHtml(value).replace(/\n/g, "<br>");

const FONT = "font-family:Arial,Helvetica,sans-serif;";

function shell(body: string, preheader = ""): string {
  const hidden = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f5f5fa;opacity:0;">${escapeHtml(preheader)}${"&#847;&zwnj;&nbsp;".repeat(40)}</div>`
    : "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background-color:#f5f5fa;${FONT}">${hidden}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5fa;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
${body}
</table></td></tr></table></body></html>`;
}

export interface NotificationInput {
  type: "Contact Form" | "Newsletter Subscription" | "Career Application";
  subject: string;
  fromName: string;
  fromEmail: string;
  phone: string;
  message: string;
  /** Extra label/value rows shown above the message (e.g. Position). */
  extra?: Array<{ label: string; value: string }>;
  /** ISO timestamp of the submission; defaults to now. */
  receivedAt?: string;
}

function formatEastern(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short", month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  }) + " ET";
}

/** Internal notification sent to the business inbox. */
export function notificationEmail(input: NotificationInput): string {
  const rows: Array<{ label: string; value: string; href?: string }> = [
    { label: "Name", value: input.fromName || "—" },
    { label: "Email", value: input.fromEmail, href: `mailto:${input.fromEmail}` },
    { label: "Phone", value: input.phone || "Not provided" },
    ...(input.extra ?? []),
  ];

  const rowHtml = rows
    .map((r, i) => {
      const bg = i % 2 === 0 ? "#f5f5fa" : "#ffffff";
      const border = i < rows.length - 1 ? "border-bottom:1px solid #e8e8ee;" : "";
      const value = r.href
        ? `<a href="${escapeHtml(r.href)}" style="color:#1B7D3A;font-size:14px;font-weight:600;text-decoration:none;">${escapeHtml(r.value)}</a>`
        : `<span style="color:#1a1a2e;font-size:14px;font-weight:600;">${escapeHtml(r.value)}</span>`;
      return `<tr><td style="padding:12px 16px;background-color:${bg};${border}">
<span style="color:#8a8a9a;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">${escapeHtml(r.label)}</span><br>${value}</td></tr>`;
    })
    .join("");

  const replySubject = encodeURIComponent(`Re: ${input.subject}`);
  const received = formatEastern(input.receivedAt);
  const phoneDigits = input.phone.replace(/\D/g, "");
  const callBtn = phoneDigits
    ? `&nbsp;&nbsp;<a href="tel:${phoneDigits}" style="display:inline-block;background-color:#1B3A5C;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:8px;">Call</a>`
    : "";

  return shell(`
<tr><td style="background-color:#1B3A5C;padding:24px 32px;text-align:center;">
  <h1 style="margin:0 0 4px;color:#ffffff;font-size:20px;font-weight:700;">${escapeHtml(input.type)}</h1>
  <p style="margin:0;color:#ffffff;opacity:0.55;font-size:12px;">Received ${escapeHtml(received)} via levelupsports.us</p></td></tr>
<tr><td style="padding:24px 32px 0;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
  <td style="background-color:#1B7D3A;color:#ffffff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:6px 14px;border-radius:20px;">${escapeHtml(input.subject)}</td>
</tr></table></td></tr>
<tr><td style="padding:20px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8ee;border-radius:8px;overflow:hidden;">${rowHtml}</table></td></tr>
<tr><td style="padding:0 32px 24px;">
  <p style="color:#8a8a9a;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin:0 0 8px;">Message</p>
  <div style="background-color:#f5f5fa;border-radius:8px;padding:16px;color:#1a1a2e;font-size:14px;line-height:1.6;border-left:3px solid #1B7D3A;">${nl2br(input.message)}</div></td></tr>
<tr><td style="padding:0 32px 28px;text-align:center;">
  <a href="mailto:${escapeHtml(input.fromEmail)}?subject=${replySubject}" style="display:inline-block;background-color:#1B7D3A;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 32px;border-radius:8px;">Reply to ${escapeHtml(input.fromName || input.fromEmail)}</a>${callBtn}</td></tr>
<tr><td style="background-color:#0F2440;padding:16px 32px;text-align:center;">
  <p style="margin:0;color:#ffffff;opacity:0.4;font-size:10px;">LevelUP Sports &bull; levelupsports.us &bull; Replying to this email goes directly to ${escapeHtml(input.fromEmail)}</p></td></tr>`,
  `${input.type}: ${input.fromName || input.fromEmail} — ${input.message.slice(0, 90)}`);
}

export interface AutoReplyInput {
  /** Headline inside the email (e.g. "We received your application"). */
  subject: string;
  /** Greeting name; omitted when empty. */
  name?: string;
  message: string;
  /** "What happens next" bullets. */
  nextSteps?: string[];
  /** Short preview line shown in inbox list views. */
  preheader?: string;
}

/** Confirmation sent to the person who submitted a form. */
export function autoReplyEmail(input: AutoReplyInput): string {
  const link = (href: string, label: string) =>
    `<a href="${href}" style="display:block;background-color:#f5f5fa;border-radius:8px;padding:10px 14px;text-decoration:none;color:#1B3A5C;font-size:12px;font-weight:600;text-align:center;">${label}</a>`;

  return shell(`
<tr><td style="background-color:#1B3A5C;padding:28px 32px;text-align:center;">
  <h1 style="margin:0 0 4px;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.3px;">LevelUP Sports</h1>
  <p style="margin:0;color:#ffffff;opacity:0.5;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Athletics Club</p></td></tr>
<tr><td style="padding:32px 32px 16px;">
  <h2 style="margin:0 0 12px;color:#1a1a2e;font-size:18px;font-weight:700;">${escapeHtml(input.subject)}</h2>
  ${input.name ? `<p style="margin:0 0 10px;color:#1a1a2e;font-size:15px;font-weight:600;">Hi ${escapeHtml(input.name.split(" ")[0])},</p>` : ""}
  <p style="margin:0;color:#4a4a5a;font-size:15px;line-height:1.7;">${nl2br(input.message)}</p></td></tr>
${input.nextSteps?.length ? `<tr><td style="padding:0 32px 8px;">
  <p style="margin:0 0 8px;color:#8a8a9a;font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">What happens next</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${input.nextSteps.map((step, i) => `<tr>
    <td width="28" valign="top" style="padding:0 0 8px;"><span style="display:inline-block;width:22px;height:22px;line-height:22px;border-radius:11px;background-color:#1B7D3A;color:#ffffff;font-size:12px;font-weight:700;text-align:center;">${i + 1}</span></td>
    <td valign="top" style="padding:2px 0 8px 6px;color:#4a4a5a;font-size:14px;line-height:1.5;">${escapeHtml(step)}</td></tr>`).join("")}</table></td></tr>` : ""}
<tr><td style="padding:16px 32px;"><div style="background-color:#f5f5fa;border-radius:8px;padding:16px;">
  <p style="margin:0 0 4px;color:#1a1a2e;font-size:13px;font-weight:600;">Need to reach us?</p>
  <p style="margin:0;color:#4a4a5a;font-size:13px;line-height:1.6;">Call <a href="tel:4434066494" style="color:#1B7D3A;text-decoration:none;font-weight:600;">(443) 406-6494</a> or email <a href="mailto:info@levelupsports.us" style="color:#1B7D3A;text-decoration:none;font-weight:600;">info@levelupsports.us</a></p></div></td></tr>
<tr><td style="padding:8px 32px 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td width="50%" style="padding:0 4px 8px 0;">${link("https://levelupsports.us/schedule", "View Schedule")}</td>
  <td width="50%" style="padding:0 0 8px 4px;">${link("https://levelupsports.us/memberships", "Memberships")}</td>
</tr></table></td></tr>
<tr><td style="padding:0 32px 28px;text-align:center;">
  <a href="https://levelupsports.us" style="display:inline-block;background-color:#1B7D3A;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 32px;border-radius:8px;">Visit Our Website</a></td></tr>
<tr><td style="background-color:#0F2440;padding:20px 32px;text-align:center;">
  <p style="margin:0 0 6px;color:#ffffff;font-size:12px;font-weight:600;">LevelUP Sports &amp; Athletics Club</p>
  <p style="margin:0 0 4px;color:#ffffff;opacity:0.4;font-size:11px;">701 E Pulaski Hwy, Elkton, MD 21921</p>
  <p style="margin:0 0 10px;color:#ffffff;opacity:0.4;font-size:11px;"><a href="tel:4434066494" style="color:#ffffff;text-decoration:none;">(443) 406-6494</a>&nbsp;&bull;&nbsp;<a href="mailto:info@levelupsports.us" style="color:#ffffff;text-decoration:none;">info@levelupsports.us</a></p>
  <p style="margin:0;"><a href="https://www.facebook.com/people/LevelUp-Sports-Athletics-Club/61579103465434/" style="color:#ffffff;opacity:0.35;text-decoration:none;font-size:11px;margin:0 6px;">Facebook</a><a href="https://www.instagram.com/levelupsportsandathleticsclub/" style="color:#ffffff;opacity:0.35;text-decoration:none;font-size:11px;margin:0 6px;">Instagram</a></p>
  <p style="margin:10px 0 0;color:#ffffff;opacity:0.3;font-size:10px;">This mailbox is not monitored — reply to info@levelupsports.us instead.</p></td></tr>`,
  input.preheader ?? input.message.slice(0, 120));
}
