import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import { isValidSchedule } from "@/content/schedule";

// The full weekly schedule as edited in admin mode. Absent = use the code
// default (WEEKLY_SCHEDULE). Older patch-style keys ("schedule_overrides",
// "schedule_overrides_v2") are no longer read but are kept for reference.
const SCHEDULE_KEY = "schedule_config";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
  if (!redis) {
    return NextResponse.json(null, {
      headers: NO_CACHE_HEADERS,
    });
  }

  try {
    const data = await redis.get(SCHEDULE_KEY);
    const schedule = typeof data === "string" ? JSON.parse(data) : data;
    return NextResponse.json(isValidSchedule(schedule) ? schedule : null, {
      headers: NO_CACHE_HEADERS,
    });
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
    const { schedule, pin } = await request.json();

    if (pin !== ADMIN_PIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isValidSchedule(schedule)) {
      return NextResponse.json({ error: "Invalid schedule" }, { status: 400 });
    }

    await redis.set(SCHEDULE_KEY, JSON.stringify(schedule));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
