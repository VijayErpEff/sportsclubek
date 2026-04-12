import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const CONSENT_KEY = "consents";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

const VALID_TYPES = ["membership_agreement", "liability_waiver"] as const;

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { type, name, email, phone, isMinor, guardianName } = body;

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid consent type" }, { status: 400 });
    }
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (type === "liability_waiver" && isMinor && !guardianName?.trim()) {
      return NextResponse.json({ error: "Guardian name is required for minors" }, { status: 400 });
    }

    const record = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      isMinor: !!isMinor,
      guardianName: isMinor ? guardianName?.trim() || "" : "",
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
      userAgent: request.headers.get("user-agent") || "",
      timestamp: new Date().toISOString(),
    };

    await redis.lpush(CONSENT_KEY, JSON.stringify(record));

    return NextResponse.json({ success: true, id: record.id });
  } catch {
    return NextResponse.json({ error: "Failed to save consent" }, { status: 500 });
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
    const raw = await redis.lrange(CONSENT_KEY, 0, -1);
    const records = raw.map((item: string | object) =>
      typeof item === "string" ? JSON.parse(item) : item
    );

    const type = searchParams.get("type");
    const filtered = type ? records.filter((r: { type: string }) => r.type === type) : records;

    return NextResponse.json(filtered, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch consents" }, { status: 500 });
  }
}
