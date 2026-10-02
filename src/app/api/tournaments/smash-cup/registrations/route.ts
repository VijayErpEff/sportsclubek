import { NextResponse } from "next/server";
import { redis } from "@/lib/storage/redis";
import {
  KEYS,
  toSafeRegistration,
  type VolleyballRegistration,
} from "@/lib/storage/tournament-registration";

const ADMIN_PIN = process.env.ADMIN_PIN || "6886";

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
    const ids = await redis.lrange(KEYS.list, 0, -1);
    if (!ids.length) {
      return NextResponse.json(
        { total: 0, registrations: [] },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const records = await Promise.all(
      ids.map(async (id: string) => {
        const raw = await redis!.get<string | object>(KEYS.reg(id));
        if (!raw) return null;
        const reg: VolleyballRegistration =
          typeof raw === "string" ? JSON.parse(raw) : (raw as VolleyballRegistration);
        return toSafeRegistration(reg);
      })
    );

    const registrations = records.filter((r): r is NonNullable<typeof r> => r !== null);

    // Aggregate counts useful for the host
    const byPayment = { pending: 0, paid: 0, waived: 0 };
    let totalPlayers = 0;
    for (const r of registrations) {
      byPayment[r.paymentStatus] = (byPayment[r.paymentStatus] || 0) + 1;
      totalPlayers += r.players.length;
    }

    return NextResponse.json(
      {
        total: registrations.length,
        byPayment,
        totalPlayers,
        registrations,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}
