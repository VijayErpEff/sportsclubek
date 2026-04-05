import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const LEADS_KEY = "leads";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { email, name, phone, source, context } = body;

    if (!email || !source) {
      return NextResponse.json({ error: "Email and source required" }, { status: 400 });
    }

    const lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      email: email.trim().toLowerCase(),
      name: name?.trim() || "",
      phone: phone?.trim() || "",
      source,
      context: context || "",
      timestamp: new Date().toISOString(),
    };

    await redis.lpush(LEADS_KEY, JSON.stringify(lead));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const pin = searchParams.get("pin");

  if (pin !== ADMIN_PIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await redis.lrange(LEADS_KEY, 0, -1);
    const leads = raw.map((item: string | object) =>
      typeof item === "string" ? JSON.parse(item) : item
    );
    return NextResponse.json(leads, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
