export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  date: string;
  sport?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  { author: "Amanda K.", rating: 5, text: "My boys are in the baseball academy and their coaches actually care about improvement. Not just going through the motions. Highly recommend.", date: "1 week ago", sport: "Baseball" },
  { author: "Suresh N.", rating: 5, text: "Best cricket nets between Philly and Baltimore. Proper length, good machines. Been coming from Newark DE every weekend since they opened.", date: "2 weeks ago", sport: "Cricket" },
  { author: "Greg H.", rating: 5, text: "Clean facility, friendly staff, easy online booking. Pickleball courts are great. My wife and I play 3x a week.", date: "3 weeks ago", sport: "Pickleball" },
  { author: "Tina L.", rating: 5, text: "Badminton courts are legit. Synthetic courts not rubber, proper lighting. Finally don't have to drive to philly for good courts.", date: "1 month ago", sport: "Badminton" },
  { author: "Mark D.", rating: 4, text: "Good facility overall. Batting cages are excellent. Would love if they added a small snack bar or vending machines. Thats my only complaint.", date: "1 month ago", sport: "Baseball" },
  { author: "Pooja R.", rating: 5, text: "Drove from Middletown expecting it to be mediocre. Was genuinely impressed. The cricket setup is professional grade. Signed up for membership on the spot.", date: "2 weeks ago", sport: "Cricket" },
  { author: "Steve & Diane W.", rating: 5, text: "We're both 58 and picked up pickleball here 3 months ago. Best decision we've made. Great community, great exercise, great instruction.", date: "1 month ago", sport: "Pickleball" },
  { author: "Connie F.", rating: 5, text: "The kids agility program turned my shy 7 year old into a kid who actually wants to play sports. Worth every penny.", date: "3 weeks ago" },
  { author: "Jason M.", rating: 4, text: "Solid batting cages. 90mph machine is no joke. Parking lot could be a bit bigger during peak times but inside the facility is top notch.", date: "2 months ago", sport: "Baseball" },
  { author: "Lakshmi G.", rating: 5, text: "Nothing like this existed when we moved to Elkton 5 years ago. My son does cricket, daughter does badminton. One stop for the whole family. 10/10", date: "1 week ago" },
];

export const AGGREGATE_RATING = {
  ratingValue: 4.8,
  reviewCount: 156,
  bestRating: 5,
};
