import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const COURT_KEY = "court_status";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
  if (!redis) {
    return NextResponse.json(null, { headers: NO_CACHE_HEADERS });
  }

  try {
    const data = await redis.get(COURT_KEY);
    return NextResponse.json(data ?? null, { headers: NO_CACHE_HEADERS });
  } catch {
    return NextResponse.json(null, {
      status: 500,
      headers: NO_CACHE_HEADERS,
    });
  }
}

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json(
      { error: "Storage not configured" },
      { status: 503 }
    );
  }

  try {
    const { state, pin } = await request.json();

    if (pin !== ADMIN_PIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await redis.set(COURT_KEY, JSON.stringify(state));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
