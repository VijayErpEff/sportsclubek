import { NextResponse } from "next/server";
import { sendEmail, BUSINESS_INBOX, REPLY_TO_INBOX, isEmailConfigured } from "@/lib/email/acs";
import { notificationEmail, autoReplyEmail } from "@/lib/email/templates";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let name: string, email: string, phone: string, subject: string, message: string;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name?.trim() || "";
      email = body.email?.trim() || "";
      phone = body.phone?.trim() || "";
      subject = body.subject?.trim() || "";
      message = body.message?.trim() || "";
    } else {
      const formData = await request.formData();
      name = (formData.get("name") as string)?.trim() || "";
      email = (formData.get("email") as string)?.trim() || "";
      phone = (formData.get("phone") as string)?.trim() || "";
      subject = (formData.get("subject") as string)?.trim() || "";
      message = (formData.get("message") as string)?.trim() || "";
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (!isEmailConfigured()) {
      console.error("[Contact] ACS not configured");
      return NextResponse.json({ error: "Email service unavailable. Please call (443) 406-6494." }, { status: 503 });
    }

    const [notifyResult, replyResult] = await Promise.allSettled([
      sendEmail({
        to: BUSINESS_INBOX,
        replyTo: email,
        subject: `[Contact] ${subject} — ${name}`,
        html: notificationEmail({ type: "Contact Form", subject, fromName: name, fromEmail: email, phone, message }),
      }),
      sendEmail({
        to: email,
        replyTo: REPLY_TO_INBOX,
        subject: `We got your message about ${subject} — LevelUP Sports`,
        html: autoReplyEmail({
          subject: "Thanks for reaching out",
          name,
          message: `We received your message about ${subject} and a member of our team will reply within one business day. For anything urgent, call us at (443) 406-6494 — we're at the facility seven days a week.`,
          nextSteps: [
            "Our front desk reviews your message and routes it to the right coach or manager.",
            "You'll hear back by email within one business day.",
            "Prefer to talk it through? Call (443) 406-6494 or stop by 701 E Pulaski Hwy, Elkton.",
          ],
          preheader: `Thanks ${name.split(" ")[0]} — we'll reply about ${subject} within one business day.`,
        }),
      }),
    ]);
    if (replyResult.status === "rejected") console.error("[Contact] auto-reply failed:", replyResult.reason);
    if (notifyResult.status === "rejected") {
      console.error("[Contact] notification failed:", notifyResult.reason);
      return NextResponse.json({ error: "Failed to send message. Please try again or call (443) 406-6494." }, { status: 500 });
    }

    return NextResponse.json({ message: "Thank you! We'll get back to you soon." });
  } catch (err) {
    console.error("[Contact] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
