import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? "";
const SUBSCRIBE_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_SUBSCRIBE_TEMPLATE_ID ?? "";
const AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID ?? "";

function isConfigured(): boolean {
  return Boolean(SERVICE_ID && PUBLIC_KEY);
}

export async function sendContactForm(params: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  if (!isConfigured()) throw new Error("EmailJS not configured");

  // Send form to business
  await emailjs.send(
    SERVICE_ID,
    CONTACT_TEMPLATE_ID,
    {
      from_name: params.name,
      from_email: params.email,
      phone: params.phone || "Not provided",
      subject: params.subject,
      message: params.message,
    },
    PUBLIC_KEY
  );

  // Send confirmation to user
  if (AUTOREPLY_TEMPLATE_ID) {
    await emailjs.send(
      SERVICE_ID,
      AUTOREPLY_TEMPLATE_ID,
      {
        to_name: params.name,
        to_email: params.email,
        subject: "We received your message",
        message:
          "Thank you for contacting LevelUP Sports! We'll get back to you within 24 hours.",
      },
      PUBLIC_KEY
    );
  }
}

export async function sendSubscription(email: string): Promise<void> {
  if (!isConfigured()) throw new Error("EmailJS not configured");

  // Notify business
  await emailjs.send(
    SERVICE_ID,
    SUBSCRIBE_TEMPLATE_ID,
    { subscriber_email: email },
    PUBLIC_KEY
  );

  // Send welcome to subscriber
  if (AUTOREPLY_TEMPLATE_ID) {
    await emailjs.send(
      SERVICE_ID,
      AUTOREPLY_TEMPLATE_ID,
      {
        to_name: "",
        to_email: email,
        subject: "Welcome to LevelUP Sports!",
        message:
          "Thanks for subscribing! You'll receive updates about programs, events, and special offers.",
      },
      PUBLIC_KEY
    );
  }
}
