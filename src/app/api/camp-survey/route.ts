import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";

const SURVEY_KEY = "camp_survey_responses";
const LEADS_KEY = "leads";

const VALID_PROGRAMS = ["full_day", "half_sports", "half_coding", "unsure"];
const VALID_NPS = ["promoter", "passive", "detractor"];
const VALID_TESTIMONIAL = ["named", "anon", "no"];

export async function POST(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const {
      program, rating, highlights, improvements, feedback,
      nps, interests, testimonial, name, phone, email,
    } = body;

    // Validate required fields
    if (!program || !VALID_PROGRAMS.includes(program)) {
      return NextResponse.json({ error: "Invalid program" }, { status: 400 });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
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
      program,
      rating: typeof rating === "number" ? rating : 0,
      highlights: Array.isArray(highlights) ? highlights : [],
      improvements: Array.isArray(improvements) ? improvements : [],
      feedback: typeof feedback === "string" ? feedback.trim().slice(0, 500) : "",
      nps: nps || "",
      interests: Array.isArray(interests) ? interests : [],
      testimonial: VALID_TESTIMONIAL.includes(testimonial) ? testimonial : "",
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      timestamp: new Date().toISOString(),
    };

    // Store survey response
    await redis.lpush(SURVEY_KEY, JSON.stringify(response));

    // Also store as a lead for the leads dashboard
    const contextParts = [`Camp survey`];
    if (response.rating) contextParts.push(`Rating: ${response.rating}/5`);
    if (response.nps) contextParts.push(`NPS: ${response.nps}`);
    if (response.program) contextParts.push(`Program: ${response.program}`);
    if (response.interests.length) contextParts.push(`Interested: ${response.interests.join(", ")}`);

    const lead = {
      id: response.id,
      email: response.email,
      name: response.name,
      phone: response.phone,
      source: "camp_survey",
      context: contextParts.join(", "),
      timestamp: response.timestamp,
    };
    await redis.lpush(LEADS_KEY, JSON.stringify(lead));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save survey" }, { status: 500 });
  }
}
