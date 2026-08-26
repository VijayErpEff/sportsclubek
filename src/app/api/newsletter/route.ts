import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import { sendEmail, BUSINESS_INBOX, isEmailConfigured } from "@/lib/email/acs";
import { notificationEmail, autoReplyEmail } from "@/lib/email/templates";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBSCRIBERS_KEY = "newsletter_subscribers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    // Persist subscriber (set → naturally de-duplicated). Non-fatal if Redis is absent.
    let isNew = true;
    if (redis) {
      try {
        const added = await redis.sadd(SUBSCRIBERS_KEY, email);
        isNew = added === 1;
        if (isNew) {
          await redis.lpush(
            "leads",
            JSON.stringify({
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              email,
              name: "",
              phone: "",
              source: "newsletter",
              context: "",
              timestamp: new Date().toISOString(),
            })
          );
        }
      } catch (err) {
        console.error("[Newsletter] Redis error:", err);
      }
    }

    if (!isEmailConfigured()) {
      console.error("[Newsletter] ACS not configured");
      return NextResponse.json({ message: "Successfully subscribed!" });
    }

    // Welcome email (always — even for repeat subscribers so the UI promise holds).
    await sendEmail({
      to: email,
      replyTo: BUSINESS_INBOX,
      subject: "Welcome to LevelUP Sports — you're on the list",
      html: autoReplyEmail({
        subject: "You're in. Welcome to the club.",
        message:
          "Thanks for subscribing. You'll be the first to hear about new programs, open houses, tournament registration, and member-only offers from LevelUP Sports & Athletics Club in Elkton, MD.\n\nExpect a couple of emails a month — no spam, and you can unsubscribe any time by replying to any message.",
        nextSteps: [
          "Add DoNotReply@levelupsports.us to your contacts so updates never land in spam.",
          "Check the live schedule for open courts, cages, and academy sessions.",
          "Follow us on Instagram and Facebook for daily highlights from the facility.",
        ],
        preheader: "Programs, open houses, and member offers — straight to your inbox.",
      }),
    });

    // Internal heads-up for new subscribers only.
    if (isNew) {
      try {
        await sendEmail({
          to: BUSINESS_INBOX,
          replyTo: email,
          subject: `[Subscriber] ${email}`,
          html: notificationEmail({
            type: "Newsletter Subscription",
            subject: "New subscriber",
            fromName: "",
            fromEmail: email,
            phone: "",
            message: `${email} subscribed to the newsletter from the website footer.`,
          }),
        });
      } catch (err) {
        console.error("[Newsletter] internal notify failed:", err);
      }
    }

    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch (err) {
    console.error("[Newsletter] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
