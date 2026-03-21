import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_SPORTS = ["baseball", "cricket", "badminton", "pickleball"];

interface BookingRequest {
  courtId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  sport: string;
}

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `LU-${timestamp.slice(-3)}${random}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<BookingRequest>;

    const courtId = body.courtId?.trim() ?? "";
    const date = body.date?.trim() ?? "";
    const time = body.time?.trim() ?? "";
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const sport = body.sport?.trim().toLowerCase() ?? "";

    // Validate required fields
    const missingFields: string[] = [];
    if (!courtId) missingFields.push("courtId");
    if (!date) missingFields.push("date");
    if (!time) missingFields.push("time");
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!sport) missingFields.push("sport");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate sport
    if (!VALID_SPORTS.includes(sport)) {
      return NextResponse.json(
        {
          error: `Invalid sport. Must be one of: ${VALID_SPORTS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate date format (basic ISO check)
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format. Please use YYYY-MM-DD." },
        { status: 400 }
      );
    }

    // Validate date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedDate < today) {
      return NextResponse.json(
        { error: "Booking date cannot be in the past." },
        { status: 400 }
      );
    }

    const bookingId = generateBookingId();

    // TODO: Integrate with real booking system (database, calendar service, etc.)
    // TODO: Send confirmation email via Resend/SendGrid
    // TODO: Check court availability before confirming
    // For now, log the booking and return success
    console.log(`[Booking] ${bookingId}:`, {
      courtId,
      date,
      time,
      name,
      email,
      phone,
      sport,
    });

    return NextResponse.json(
      {
        message: `Booking confirmed! Your ${sport} court is reserved for ${date} at ${time}. Check your email for details.`,
        bookingId,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
