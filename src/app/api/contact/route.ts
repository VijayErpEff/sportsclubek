import { NextResponse } from "next/server";

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
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || "info@levelupsports.us";

    if (resendApiKey) {
      // Send via Resend
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "LevelUp Sports <noreply@levelupsports.us>",
          to: [toEmail],
          subject: `[Contact] ${subject} — from ${name}`,
          reply_to: email,
          html: `<h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p>${message.replace(/\n/g, "<br />")}</p>`,
        }),
      });

      if (!res.ok) {
        console.error("[Contact] Resend error:", await res.text());
        return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
      }
    } else {
      // Fallback: log to console when no email service configured
      console.log(`[Contact] From: ${name} <${email}>, Subject: ${subject}`);
      console.log(`[Contact] Message: ${message}`);
    }

    return NextResponse.json(
      { message: "Thank you! We'll get back to you soon." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
