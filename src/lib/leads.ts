export async function captureLead(data: {
  email: string;
  name?: string;
  phone?: string;
  source: "sport_preference" | "blog" | "returning_visitor" | "tour_request" | "survey";
  context?: string;
}): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
