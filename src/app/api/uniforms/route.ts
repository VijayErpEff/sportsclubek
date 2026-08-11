import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const UNIFORMS_KEY = "uniform_submissions";
const LEADS_KEY = "leads";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

const VALID_SIZES = ["YXS", "YS", "YM", "YL", "AS", "AM", "AL", "AXL", "A2XL"];

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const {
      athleteName, sports, jerseySize, trackPantsSize,
      parentName, phone, email, notes,
    } = body;

    // Validate required fields
    if (!athleteName?.trim()) {
      return NextResponse.json({ error: "Athlete name is required" }, { status: 400 });
    }
    if (!Array.isArray(sports) || sports.length === 0) {
      return NextResponse.json({ error: "Select at least one sport" }, { status: 400 });
    }
    if (!jerseySize || !VALID_SIZES.includes(jerseySize)) {
      return NextResponse.json({ error: "Invalid jersey size" }, { status: 400 });
    }
    if (!trackPantsSize || !VALID_SIZES.includes(trackPantsSize)) {
      return NextResponse.json({ error: "Invalid track pants size" }, { status: 400 });
    }
    if (!parentName?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Parent name, phone, and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const submission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      athleteName: athleteName.trim().slice(0, 100),
      sports,
      jerseySize,
      trackPantsSize,
      notes: typeof notes === "string" ? notes.trim().slice(0, 300) : "",
      parentName: parentName.trim().slice(0, 100),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      timestamp: new Date().toISOString(),
    };

    // Store uniform submission
    await redis.lpush(UNIFORMS_KEY, JSON.stringify(submission));

    // Also store as a lead for the leads dashboard
    const lead = {
      id: submission.id,
      email: submission.email,
      name: submission.parentName,
      phone: submission.phone,
      source: "uniforms",
      context: `Uniform sizing — Athlete: ${submission.athleteName}, Sports: ${submission.sports.join(", ")}, Jersey: ${submission.jerseySize}, Track pants: ${submission.trackPantsSize}`,
      timestamp: submission.timestamp,
    };
    await redis.lpush(LEADS_KEY, JSON.stringify(lead));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
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
    const raw = await redis.lrange(UNIFORMS_KEY, 0, -1);
    const submissions = raw.map((item: string | object) =>
      typeof item === "string" ? JSON.parse(item) : item
    );

    // Summary mode — size counts for placing the vendor order
    if (searchParams.get("summary") === "true") {
      const jerseyCount: Record<string, number> = {};
      const pantsCount: Record<string, number> = {};
      const sportCount: Record<string, number> = {};

      for (const s of submissions) {
        const sub = s as { jerseySize: string; trackPantsSize: string; sports: string[] };
        jerseyCount[sub.jerseySize] = (jerseyCount[sub.jerseySize] || 0) + 1;
        pantsCount[sub.trackPantsSize] = (pantsCount[sub.trackPantsSize] || 0) + 1;
        for (const sport of sub.sports || []) sportCount[sport] = (sportCount[sport] || 0) + 1;
      }

      return NextResponse.json({
        total: submissions.length,
        jerseySizes: jerseyCount,
        trackPantsSizes: pantsCount,
        bySport: sportCount,
      }, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json(submissions, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
