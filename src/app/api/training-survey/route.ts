import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const SURVEY_KEY = "training_survey_responses";
const LEADS_KEY = "leads";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

const VALID_DURATION = ["under_1mo", "1_3mo", "3_6mo", "6mo_plus"];
const VALID_PROGRESS = ["clear", "some", "not_yet"];
const VALID_NPS = ["promoter", "passive", "detractor"];

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const {
      sports, duration, rating, progress, positives, improvements,
      feedback, nps, interests, athleteName, name, phone, email,
    } = body;

    // Validate required fields
    if (!duration || !VALID_DURATION.includes(duration)) {
      return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
    }
    if (!progress || !VALID_PROGRESS.includes(progress)) {
      return NextResponse.json({ error: "Invalid progress response" }, { status: 400 });
    }
    if (rating >= 4 && (!nps || !VALID_NPS.includes(nps))) {
      return NextResponse.json({ error: "Invalid NPS response" }, { status: 400 });
    }
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name, phone, and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const response = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      sports: Array.isArray(sports) ? sports : [],
      duration,
      rating,
      progress,
      positives: Array.isArray(positives) ? positives : [],
      improvements: Array.isArray(improvements) ? improvements : [],
      feedback: typeof feedback === "string" ? feedback.trim().slice(0, 500) : "",
      nps: nps || "",
      interests: Array.isArray(interests) ? interests : [],
      athleteName: typeof athleteName === "string" ? athleteName.trim().slice(0, 100) : "",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      timestamp: new Date().toISOString(),
    };

    // Store survey response
    await redis.lpush(SURVEY_KEY, JSON.stringify(response));

    // Also store as a lead for the leads dashboard
    const contextParts = ["Training survey"];
    if (response.rating) contextParts.push(`Rating: ${response.rating}/5`);
    if (response.progress) contextParts.push(`Progress: ${response.progress}`);
    if (response.nps) contextParts.push(`NPS: ${response.nps}`);
    if (response.sports.length) contextParts.push(`Sports: ${response.sports.join(", ")}`);
    if (response.interests.length) contextParts.push(`Interested: ${response.interests.join(", ")}`);

    const lead = {
      id: response.id,
      email: response.email,
      name: response.name,
      phone: response.phone,
      source: "training_survey",
      context: contextParts.join(", "),
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

      const avgRating =
        responses.reduce((s: number, r: { rating: number }) => s + (r.rating || 0), 0) / total;
      const npsCount = { promoter: 0, passive: 0, detractor: 0 };
      const progressCount: Record<string, number> = {};
      const durationCount: Record<string, number> = {};
      const sportCount: Record<string, number> = {};
      const positiveCount: Record<string, number> = {};
      const improvementCount: Record<string, number> = {};
      const interestCount: Record<string, number> = {};

      for (const r of responses) {
        const resp = r as {
          nps: string; progress: string; duration: string;
          sports: string[]; positives: string[]; improvements: string[]; interests: string[];
        };
        if (resp.nps && npsCount[resp.nps as keyof typeof npsCount] !== undefined) {
          npsCount[resp.nps as keyof typeof npsCount]++;
        }
        progressCount[resp.progress] = (progressCount[resp.progress] || 0) + 1;
        durationCount[resp.duration] = (durationCount[resp.duration] || 0) + 1;
        for (const s of resp.sports || []) sportCount[s] = (sportCount[s] || 0) + 1;
        for (const p of resp.positives || []) positiveCount[p] = (positiveCount[p] || 0) + 1;
        for (const i of resp.improvements || []) improvementCount[i] = (improvementCount[i] || 0) + 1;
        for (const i of resp.interests || []) interestCount[i] = (interestCount[i] || 0) + 1;
      }

      const npsTotal = npsCount.promoter + npsCount.passive + npsCount.detractor;
      const npsScore = npsTotal ? Math.round(((npsCount.promoter - npsCount.detractor) / npsTotal) * 100) : 0;

      return NextResponse.json({
        total,
        avgRating: Math.round(avgRating * 10) / 10,
        npsScore,
        npsBreakdown: npsCount,
        progressBreakdown: progressCount,
        durationBreakdown: durationCount,
        topSports: Object.entries(sportCount).sort((a, b) => b[1] - a[1]),
        topPositives: Object.entries(positiveCount).sort((a, b) => b[1] - a[1]),
        topImprovements: Object.entries(improvementCount).sort((a, b) => b[1] - a[1]),
        topInterests: Object.entries(interestCount).sort((a, b) => b[1] - a[1]),
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
