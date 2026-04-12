import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const SURVEY_KEY = "survey_responses";
const LEADS_KEY = "leads";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

const VALID_VISITOR_TYPES = ["member", "visited", "not_visited", "exploring"];
const VALID_NPS = ["promoter", "passive", "detractor"];

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const {
      visitorType, sports, rating, positives, improvements,
      feedback, nps, name, phone, email, barriers, triggers,
    } = body;

    const hasVisited = visitorType === "member" || visitorType === "visited";

    // Validate required fields
    if (!visitorType || !VALID_VISITOR_TYPES.includes(visitorType)) {
      return NextResponse.json({ error: "Invalid visitor type" }, { status: 400 });
    }
    // Rating and NPS only required for visitors
    if (hasVisited) {
      if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
      }
      if (rating >= 4 && (!nps || !VALID_NPS.includes(nps))) {
        return NextResponse.json({ error: "Invalid NPS response" }, { status: 400 });
      }
    }
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name, phone, and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const response = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      visitorType,
      sports: Array.isArray(sports) ? sports : [],
      rating: typeof rating === "number" ? rating : 0,
      positives: Array.isArray(positives) ? positives : [],
      improvements: Array.isArray(improvements) ? improvements : [],
      feedback: typeof feedback === "string" ? feedback.trim().slice(0, 500) : "",
      nps: nps || "",
      barriers: Array.isArray(barriers) ? barriers : [],
      triggers: Array.isArray(triggers) ? triggers : [],
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      timestamp: new Date().toISOString(),
    };

    // Store survey response
    await redis.lpush(SURVEY_KEY, JSON.stringify(response));

    // Also store as a lead for the leads dashboard
    const contextParts = [];
    if (response.rating) contextParts.push(`Rating: ${response.rating}/5`);
    if (response.nps) contextParts.push(`NPS: ${response.nps}`);
    if (response.sports.length) contextParts.push(`Sports: ${response.sports.join(", ")}`);
    if (response.barriers.length) contextParts.push(`Barriers: ${response.barriers.join(", ")}`);

    const lead = {
      id: response.id,
      email: response.email,
      name: response.name,
      phone: response.phone,
      source: "survey",
      context: contextParts.join(", ") || "no details",
      timestamp: response.timestamp,
    };
    await redis.lpush(LEADS_KEY, JSON.stringify(lead));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save survey" }, { status: 500 });
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
    const raw = await redis.lrange(SURVEY_KEY, 0, -1);
    const responses = raw.map((item: string | object) =>
      typeof item === "string" ? JSON.parse(item) : item
    );

    // Summary mode
    if (searchParams.get("summary") === "true") {
      const total = responses.length;
      if (total === 0) {
        return NextResponse.json({ total: 0 }, {
          headers: { "Cache-Control": "no-store" },
        });
      }

      const ratedResponses = responses.filter((r: { rating: number }) => r.rating > 0);
      const avgRating = ratedResponses.length
        ? ratedResponses.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / ratedResponses.length
        : 0;
      const npsCount = { promoter: 0, passive: 0, detractor: 0 };
      const visitorCount: Record<string, number> = {};
      const sportCount: Record<string, number> = {};
      const positiveCount: Record<string, number> = {};
      const improvementCount: Record<string, number> = {};
      const barrierCount: Record<string, number> = {};
      const triggerCount: Record<string, number> = {};

      for (const r of responses) {
        const resp = r as {
          nps: string; visitorType: string;
          sports: string[]; positives: string[]; improvements: string[];
          barriers?: string[]; triggers?: string[];
        };
        if (resp.nps && npsCount[resp.nps as keyof typeof npsCount] !== undefined) {
          npsCount[resp.nps as keyof typeof npsCount]++;
        }
        visitorCount[resp.visitorType] = (visitorCount[resp.visitorType] || 0) + 1;
        for (const s of resp.sports) sportCount[s] = (sportCount[s] || 0) + 1;
        for (const p of resp.positives) positiveCount[p] = (positiveCount[p] || 0) + 1;
        for (const i of resp.improvements) improvementCount[i] = (improvementCount[i] || 0) + 1;
        for (const b of resp.barriers || []) barrierCount[b] = (barrierCount[b] || 0) + 1;
        for (const t of resp.triggers || []) triggerCount[t] = (triggerCount[t] || 0) + 1;
      }

      const npsTotal = npsCount.promoter + npsCount.passive + npsCount.detractor;
      const npsScore = npsTotal ? Math.round(((npsCount.promoter - npsCount.detractor) / npsTotal) * 100) : 0;

      return NextResponse.json({
        total,
        avgRating: Math.round(avgRating * 10) / 10,
        npsScore,
        npsBreakdown: npsCount,
        visitorBreakdown: visitorCount,
        topSports: Object.entries(sportCount).sort((a, b) => b[1] - a[1]),
        topPositives: Object.entries(positiveCount).sort((a, b) => b[1] - a[1]),
        topImprovements: Object.entries(improvementCount).sort((a, b) => b[1] - a[1]),
        topBarriers: Object.entries(barrierCount).sort((a, b) => b[1] - a[1]),
        topTriggers: Object.entries(triggerCount).sort((a, b) => b[1] - a[1]),
      }, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json(responses, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch surveys" }, { status: 500 });
  }
}
