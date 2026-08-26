import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

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

/** POST — persist a career application (called by the careers form before EmailJS). */
export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

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

    await redis.lpush(APPLICATIONS_KEY, JSON.stringify(application));
    return NextResponse.json({ success: true, id: application.id });
  } catch {
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
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
