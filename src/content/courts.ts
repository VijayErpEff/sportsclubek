export interface Court {
  id: string;
  name: string;
  sport: "baseball" | "cricket" | "badminton" | "pickleball";
  type: "cage" | "court" | "net";
  capacity: number;
  pricePerHour: number;
  features: string[];
}

export const COURTS: Court[] = [
  { id: "bc-1", name: "Batting Cage 1", sport: "baseball", type: "cage", capacity: 2, pricePerHour: 35, features: ["Pitching machine", "70 MPH max", "Helmet provided"] },
  { id: "bc-2", name: "Batting Cage 2", sport: "baseball", type: "cage", capacity: 2, pricePerHour: 35, features: ["Pitching machine", "85 MPH max", "Helmet provided"] },
  { id: "bc-3", name: "Batting Cage 3", sport: "baseball", type: "cage", capacity: 2, pricePerHour: 45, features: ["Pro pitching machine", "90 MPH max", "Video analysis"] },
  { id: "cn-1", name: "Cricket Net 1", sport: "cricket", type: "net", capacity: 4, pricePerHour: 40, features: ["Bowling machine", "Full-length pitch", "Side netting"] },
  { id: "cn-2", name: "Cricket Net 2", sport: "cricket", type: "net", capacity: 4, pricePerHour: 40, features: ["Bowling machine", "Full-length pitch", "Side netting"] },
  { id: "bd-1", name: "Badminton Court 1", sport: "badminton", type: "court", capacity: 4, pricePerHour: 30, features: ["BWF-approved", "Synthetic flooring", "Rackets available"] },
  { id: "bd-2", name: "Badminton Court 2", sport: "badminton", type: "court", capacity: 4, pricePerHour: 30, features: ["BWF-approved", "Synthetic flooring", "Rackets available"] },
  { id: "bd-3", name: "Badminton Court 3", sport: "badminton", type: "court", capacity: 4, pricePerHour: 30, features: ["BWF-approved", "Synthetic flooring", "Rackets available"] },
  { id: "pk-1", name: "Pickleball Court 1", sport: "pickleball", type: "court", capacity: 4, pricePerHour: 25, features: ["USAPA-standard", "Paddle rental available"] },
  { id: "pk-2", name: "Pickleball Court 2", sport: "pickleball", type: "court", capacity: 4, pricePerHour: 25, features: ["USAPA-standard", "Paddle rental available"] },
];

// Simulated availability - in production this would come from a booking API
export type TimeSlot = { time: string; available: boolean; courtId: string };

export function generateTimeSlots(courtId: string, date: Date): TimeSlot[] {
  // Generate hourly slots from 9AM to 9PM
  // Use a deterministic seed based on courtId + date for consistent "random" availability
  const slots: TimeSlot[] = [];
  const dateStr = date.toISOString().slice(0, 10);
  const seed = (courtId + dateStr).split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  for (let hour = 9; hour <= 20; hour++) {
    const timeStr = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
    // Deterministic pseudo-random based on seed + hour
    const available = ((seed * (hour + 1) * 7) % 10) > 3; // ~60% availability
    slots.push({ time: timeStr, available, courtId });
  }
  return slots;
}
