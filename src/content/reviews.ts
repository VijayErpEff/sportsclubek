export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  date: string;
  sport?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  { author: "Sarah M.", rating: 5, text: "Best sports facility in Cecil County! My kids love the baseball academy.", date: "2 weeks ago", sport: "Baseball" },
  { author: "Rajiv P.", rating: 5, text: "Finally a proper cricket facility nearby. Coach Sharma is excellent.", date: "1 month ago", sport: "Cricket" },
  { author: "Jennifer T.", rating: 5, text: "Clean, modern facility. We come for pickleball 3x a week!", date: "3 weeks ago", sport: "Pickleball" },
  { author: "David C.", rating: 5, text: "Competition-grade badminton courts. Best in the tri-state area.", date: "1 week ago", sport: "Badminton" },
  { author: "Michael R.", rating: 5, text: "Kids Agility program is amazing. My daughter's coordination has improved so much.", date: "2 months ago" },
  { author: "Tom K.", rating: 4, text: "Great batting cages and coaching. Parking can be tight on weekends.", date: "1 month ago", sport: "Baseball" },
  { author: "Priya D.", rating: 5, text: "Drive 40 mins from Wilmington. Worth every mile for the cricket nets.", date: "3 weeks ago", sport: "Cricket" },
  { author: "Lisa A.", rating: 5, text: "Started pickleball at 55. The beginner lessons here are wonderful.", date: "2 months ago", sport: "Pickleball" },
];

export const AGGREGATE_RATING = {
  ratingValue: 4.9,
  reviewCount: 127,
  bestRating: 5,
};
