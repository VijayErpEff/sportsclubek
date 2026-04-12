import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const NOTIFY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID ?? "";
const REPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID ?? "";

function isConfigured(): boolean {
  return Boolean(SERVICE_ID && PUBLIC_KEY);
}

async function sendAutoReply(params: {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
}): Promise<void> {
  if (!REPLY_TEMPLATE_ID) return;
  await emailjs.send(SERVICE_ID, REPLY_TEMPLATE_ID, params, PUBLIC_KEY);
}

export async function sendContactForm(params: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  if (!isConfigured()) throw new Error("EmailJS not configured");

  await emailjs.send(
    SERVICE_ID,
    NOTIFY_TEMPLATE_ID,
    {
      type: "Contact Form",
      from_name: params.name,
      from_email: params.email,
      phone: params.phone || "Not provided",
      subject: params.subject,
      message: params.message,
    },
    PUBLIC_KEY
  );

  await sendAutoReply({
    to_email: params.email,
    to_name: params.name,
    subject: "We received your message",
    message:
      "Thank you for contacting LevelUp Sports! We'll get back to you within 24 hours.",
  });
}

export async function sendSubscription(email: string): Promise<void> {
  if (!isConfigured()) throw new Error("EmailJS not configured");

  await emailjs.send(
    SERVICE_ID,
    NOTIFY_TEMPLATE_ID,
    {
      type: "Newsletter Subscription",
      from_name: "",
      from_email: email,
      phone: "",
      subject: "New Subscriber",
      message: `${email} has subscribed to the newsletter.`,
    },
    PUBLIC_KEY
  );

  await sendAutoReply({
    to_email: email,
    to_name: "",
    subject: "Welcome to LevelUp Sports!",
    message:
      "Thanks for subscribing! You'll receive updates about programs, events, and special offers.",
  });
}

export async function sendCareerApplication(params: {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
}): Promise<void> {
  if (!isConfigured()) throw new Error("EmailJS not configured");

  await emailjs.send(
    SERVICE_ID,
    NOTIFY_TEMPLATE_ID,
    {
      type: "Career Application",
      from_name: params.name,
      from_email: params.email,
      phone: params.phone || "Not provided",
      subject: `Application: ${params.position}`,
      message: params.message,
    },
    PUBLIC_KEY
  );

  await sendAutoReply({
    to_email: params.email,
    to_name: params.name,
    subject: "Application Received — LevelUp Sports",
    message: `Thank you for applying for the ${params.position} position! Our team will review your application and reach out within a few business days.`,
  });
}
