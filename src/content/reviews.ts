export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  date: string;
  sport?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  { author: "Barry Janney", rating: 5, text: "Very impressed! Staff was so nice and got us booked for Little League practice last minute. Great cages and booking flexibility. Not many indoor options in Cecil County.", date: "2 weeks ago", sport: "Baseball" },
  { author: "Frank Dowling", rating: 5, text: "Great facility to have indoor baseball practice. Nice tunnels & room for team to run full practice.", date: "2 weeks ago", sport: "Baseball" },
  { author: "Arianna Lawson", rating: 5, text: "Had a bachelorette pickleball afternoon here and it was great. Staff were really friendly, facilities were clean and brand new.", date: "1 month ago", sport: "Pickleball" },
  { author: "Prakash Miriyala", rating: 5, text: "Best place for sports! We had 200 players in volleyball, cricket, badminton and ping pong. Space accommodated everyone. Team is awesome and supportive.", date: "1 month ago" },
  { author: "Venkata R. Medasani", rating: 5, text: "I've been playing pickleball here and it's been a great experience! Courts are well maintained, atmosphere is energetic, everyone is welcoming.", date: "1 month ago", sport: "Pickleball" },
  { author: "Srinivas Vadlamani", rating: 5, text: "Excellent staff and new infrastructure. Can try more than one sport — soccer, cricket, pickleball. All indoor so I can play rain or shine!", date: "2 months ago" },
  { author: "Ravindra P N", rating: 5, text: "Great facility for any indoor sports. I loved playing badminton. Should try pickleball as well.", date: "1 month ago", sport: "Badminton" },
  { author: "Marie Beiler", rating: 5, text: "New & clean & well organized! Great place to play pickleball indoors. Staff was very friendly & helpful!", date: "1 month ago", sport: "Pickleball" },
  { author: "RagaSudha Tammana", rating: 5, text: "Visited multiple times with friends for badminton/pickleball. Facility is nice — very neat and clean.", date: "1 month ago", sport: "Badminton" },
  { author: "Prafulbodas", rating: 5, text: "Excellent facility. Very spacious, clean and budget friendly. Staff was nice. Recommend for kids and adults.", date: "2 months ago" },
  { author: "Jed Baldomar", rating: 5, text: "Welcoming hosts, clean and spacious facility! Excited for the future and looking forward to events.", date: "2 months ago" },
  { author: "Mark Barczewski", rating: 5, text: "Great looking facility. A lot of possibilities. Check it out for any sport interests.", date: "2 months ago" },
  { author: "Abubakr Syed", rating: 5, text: "It looks awesome inside and outside. The activities are also amazing.", date: "2 months ago" },
];

export const AGGREGATE_RATING = {
  ratingValue: 5.0,
  reviewCount: 20,
  bestRating: 5,
};
