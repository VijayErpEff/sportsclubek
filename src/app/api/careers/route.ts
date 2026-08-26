import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import { sendEmail, BUSINESS_INBOX, REPLY_TO_INBOX, isEmailConfigured } from "@/lib/email/acs";
import { notificationEmail, autoReplyEmail } from "@/lib/email/templates";

const APPLICATIONS_KEY = "career_applications";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface CareerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  timestamp: string;
}

/**
 * POST — persist a career application to Redis, then notify the hiring inbox
 * and send the applicant a confirmation via ACS.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const position = String(body.position ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Name, email, and position are required." }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const application: CareerApplication = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      email,
      phone,
      position,
      message: message.slice(0, 5000),
      timestamp: new Date().toISOString(),
    };

    // 1. Persist first — the application must never be lost because email failed.
    let stored = false;
    if (redis) {
      try {
        await redis.lpush(APPLICATIONS_KEY, JSON.stringify(application));
        stored = true;
      } catch (err) {
        console.error("[Careers] Redis error:", err);
      }
    }

    // 2. Notify hiring inbox + confirm to applicant, in parallel (Netlify 10s cap).
    let notified = false;
    if (isEmailConfigured()) {
      const [notifyResult, replyResult] = await Promise.allSettled([
        sendEmail({
          to: BUSINESS_INBOX,
          replyTo: email,
          subject: `[Application] ${position} — ${name}`,
          html: notificationEmail({
            type: "Career Application",
            subject: position,
            fromName: name,
            fromEmail: email,
            phone,
            message,
            extra: [{ label: "Position", value: position }],
            receivedAt: application.timestamp,
          }),
        }),
        sendEmail({
          to: email,
          replyTo: REPLY_TO_INBOX,
          subject: `Application received: ${position} — LevelUP Sports`,
          html: autoReplyEmail({
            subject: "We received your application",
            name,
            message: `Thanks for applying for the ${position} role at LevelUP Sports & Athletics Club. We read every application personally, and we're excited you want to help athletes in Elkton level up.`,
            nextSteps: [
              "Our hiring team reviews your application within 3–5 business days.",
              "If it looks like a fit, we'll email or call you to set up a conversation at the facility.",
              "Questions in the meantime? Reply to info@levelupsports.us or call (443) 406-6494.",
            ],
            preheader: `Thanks ${name.split(" ")[0]} — your ${position} application is in. Here's what happens next.`,
          }),
        }),
      ]);
      notified = notifyResult.status === "fulfilled";
      if (notifyResult.status === "rejected") console.error("[Careers] notification failed:", notifyResult.reason);
      if (replyResult.status === "rejected") console.error("[Careers] auto-reply failed:", replyResult.reason);
    }

    if (!stored && !notified) {
      return NextResponse.json(
        { error: "We couldn't submit your application. Please email info@levelupsports.us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: application.id, stored, notified });
  } catch (err) {
    console.error("[Careers] error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

/** GET ?pin=… — list all applications, newest first (admin only). */
export async function GET(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("pin") !== ADMIN_PIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await redis.lrange(APPLICATIONS_KEY, 0, -1);
    const applications = raw.map((item: string | object) =>
      typeof item === "string" ? JSON.parse(item) : item
    );
    return NextResponse.json(applications, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
