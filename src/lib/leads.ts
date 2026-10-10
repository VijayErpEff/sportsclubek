import { trackLead } from "@/lib/analytics";

export async function captureLead(data: {
  email: string;
  name?: string;
  phone?: string;
  source: "sport_preference" | "blog" | "returning_visitor" | "tour_request" | "survey" | "camp_survey";
  context?: string;
}): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) trackLead(data.source);
    return res.ok;
  } catch {
    return false;
  }
}
