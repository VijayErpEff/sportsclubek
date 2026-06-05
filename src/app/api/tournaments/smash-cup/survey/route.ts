import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const SURVEY_KEY = "tournament:smash-cup:survey";
const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

interface SurveyResponse {
  id: string;
  team: string;
  overall: number;
  details: Record<string, number>;
  best: string[];
  improve: string[];
  feedback: string;
  playAgain: string;
  shoutout: string;
  name: string;
  email: string;
  timestamp: string;
}

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { team, overall, details, best, improve, feedback, playAgain, shoutout, name, email } = body;

    if (!team || typeof team !== "string") {
      return NextResponse.json({ error: "Team is required" }, { status: 400 });
    }
    if (typeof overall !== "number" || overall < 1 || overall > 5) {
      return NextResponse.json({ error: "Overall rating must be 1-5" }, { status: 400 });
    }

    const cleanDetails: Record<string, number> = {};
    if (details && typeof details === "object") {
      for (const [k, v] of Object.entries(details)) {
        if (typeof v === "number" && v >= 1 && v <= 5) cleanDetails[k] = v;
      }
    }

    const response: SurveyResponse = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      team: team.trim().slice(0, 60),
      overall,
      details: cleanDetails,
      best: Array.isArray(best) ? best.slice(0, 12) : [],
      improve: Array.isArray(improve) ? improve.slice(0, 12) : [],
      feedback: typeof feedback === "string" ? feedback.trim().slice(0, 500) : "",
      playAgain: typeof playAgain === "string" ? playAgain : "",
      shoutout: typeof shoutout === "string" ? shoutout.trim().slice(0, 300) : "",
      name: typeof name === "string" ? name.trim().slice(0, 80) : "",
      email: typeof email === "string" ? email.trim().toLowerCase().slice(0, 120) : "",
      timestamp: new Date().toISOString(),
    };

    await redis.lpush(SURVEY_KEY, JSON.stringify(response));
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
  if (searchParams.get("pin") !== ADMIN_PIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await redis.lrange(SURVEY_KEY, 0, -1);
    const responses: SurveyResponse[] = raw.map((item: string | object) =>
      typeof item === "string" ? JSON.parse(item) : item
    );

    if (searchParams.get("summary") !== "true") {
      return NextResponse.json(responses, { headers: NO_CACHE_HEADERS });
    }

    const total = responses.length;
    if (total === 0) {
      return NextResponse.json({ total: 0 }, { headers: NO_CACHE_HEADERS });
    }

    const avgOverall = responses.reduce((s, r) => s + (r.overall || 0), 0) / total;

    const detailSums: Record<string, { sum: number; n: number }> = {};
    const bestCount: Record<string, number> = {};
    const improveCount: Record<string, number> = {};
    const teamCount: Record<string, number> = {};
    const playAgainCount = { promoter: 0, passive: 0, detractor: 0 };
    const shoutouts: string[] = [];

    for (const r of responses) {
      for (const [k, v] of Object.entries(r.details || {})) {
        const d = (detailSums[k] ??= { sum: 0, n: 0 });
        d.sum += v;
        d.n += 1;
      }
      for (const b of r.best || []) bestCount[b] = (bestCount[b] || 0) + 1;
      for (const i of r.improve || []) improveCount[i] = (improveCount[i] || 0) + 1;
      if (r.team) teamCount[r.team] = (teamCount[r.team] || 0) + 1;
      if (r.playAgain && r.playAgain in playAgainCount) {
        playAgainCount[r.playAgain as keyof typeof playAgainCount]++;
      }
      if (r.shoutout) shoutouts.push(r.shoutout);
    }

    const avgDetails = Object.fromEntries(
      Object.entries(detailSums).map(([k, { sum, n }]) => [k, Math.round((sum / n) * 10) / 10])
    );
    const paTotal = playAgainCount.promoter + playAgainCount.passive + playAgainCount.detractor;
    const playAgainScore = paTotal
      ? Math.round(((playAgainCount.promoter - playAgainCount.detractor) / paTotal) * 100)
      : 0;

    return NextResponse.json(
      {
        total,
        avgOverall: Math.round(avgOverall * 10) / 10,
        avgDetails,
        playAgainScore,
        playAgainBreakdown: playAgainCount,
        responsesByTeam: Object.entries(teamCount).sort((a, b) => b[1] - a[1]),
        topBest: Object.entries(bestCount).sort((a, b) => b[1] - a[1]),
        topImprove: Object.entries(improveCount).sort((a, b) => b[1] - a[1]),
        shoutouts,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch surveys" }, { status: 500 });
  }
}
