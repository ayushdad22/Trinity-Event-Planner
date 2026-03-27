export interface Event {
  id: string
  title: string
  location: string
  date: string
  time: string
  attendees: number
  image: string
  category: string
  lat: number
  lng: number
  description: string
  organizer: string
  logo: string
}

export const events: Event[] = [
  {
    id: "1",
    title: "Rooftop Music Festival",
    location: "Brooklyn Heights",
    date: "Mar 28",
    time: "8:00 PM",
    attendees: 482,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    category: "Music",
    lat: 40.6958,
    lng: -73.9947,
    description: "Live performances from local indie bands with stunning city views.",
    organizer: "Brooklyn Music Society",
    logo: "https://logo.clearbit.com/spotify.com"
  },
  {
    id: "2",
    title: "Tech Startup Meetup",
    location: "SoHo",
    date: "Mar 29",
    time: "6:30 PM",
    attendees: 156,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    category: "Tech",
    lat: 40.7233,
    lng: -73.9983,
    description: "Network with founders and investors in the NYC tech scene.",
    organizer: "NYC Tech Hub",
    logo: "https://logo.clearbit.com/techcrunch.com"
  },
  {
    id: "3",
    title: "Art Gallery Opening",
    location: "Chelsea",
    date: "Mar 30",
    time: "7:00 PM",
    attendees: 89,
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop",
    category: "Art",
    lat: 40.7465,
    lng: -74.0014,
    description: "Exclusive preview of contemporary works by emerging artists.",
    organizer: "Chelsea Art Collective",
    logo: "https://logo.clearbit.com/artsy.net"
  },
  {
    id: "4",
    title: "Sunset Yoga in the Park",
    location: "Central Park",
    date: "Mar 31",
    time: "5:30 PM",
    attendees: 234,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    category: "Wellness",
    lat: 40.7829,
    lng: -73.9654,
    description: "Unwind with a relaxing yoga session as the sun sets over Manhattan.",
    organizer: "Mindful Movement NYC",
    logo: "https://logo.clearbit.com/mindbodyonline.com"
  },
  {
    id: "5",
    title: "Food & Wine Festival",
    location: "Lower East Side",
    date: "Apr 1",
    time: "12:00 PM",
    attendees: 1250,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    category: "Food",
    lat: 40.7150,
    lng: -73.9843,
    description: "Taste dishes from 50+ local restaurants and wineries.",
    organizer: "NYC Food Society",
    logo: "https://logo.clearbit.com/yelp.com"
  },
  {
    id: "6",
    title: "Comedy Night Live",
    location: "East Village",
    date: "Apr 2",
    time: "9:00 PM",
    attendees: 320,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=300&fit=crop",
    category: "Entertainment",
    lat: 40.7264,
    lng: -73.9877,
    description: "Stand-up performances from NYC's funniest comedians.",
    organizer: "Laugh Factory NYC",
    logo: "https://logo.clearbit.com/netflix.com"
  },
  {
    id: "7",
    title: "Vintage Market",
    location: "Williamsburg",
    date: "Apr 3",
    time: "10:00 AM",
    attendees: 567,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Shopping",
    lat: 40.7081,
    lng: -73.9571,
    description: "Browse unique finds from over 100 vintage vendors.",
    organizer: "Brooklyn Flea",
    logo: "https://logo.clearbit.com/etsy.com"
  },
  {
    id: "8",
    title: "Photography Workshop",
    location: "DUMBO",
    date: "Apr 4",
    time: "2:00 PM",
    attendees: 45,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    category: "Education",
    lat: 40.7033,
    lng: -73.9881,
    description: "Learn street photography techniques from professionals.",
    organizer: "NYC Photo Academy",
    logo: "https://logo.clearbit.com/adobe.com"
  },
  {
    id: "9",
    title: "Jazz Night",
    location: "Harlem",
    date: "Apr 5",
    time: "8:30 PM",
    attendees: 178,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=300&fit=crop",
    category: "Music",
    lat: 40.8116,
    lng: -73.9465,
    description: "Experience the soul of Harlem with live jazz performances.",
    organizer: "Harlem Jazz Society",
    logo: "https://logo.clearbit.com/soundcloud.com"
  },
  {
    id: "10",
    title: "Boat Party",
    location: "Hudson River",
    date: "Apr 6",
    time: "10:00 PM",
    attendees: 890,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    category: "Nightlife",
    lat: 40.7580,
    lng: -74.0180,
    description: "Dance the night away with stunning views of the skyline.",
    organizer: "NYC Nightlife Club",
    logo: "https://logo.clearbit.com/eventbrite.com"
  }
]

export const categories = [
  "All",
  "Music",
  "Tech",
  "Art",
  "Wellness",
  "Food",
  "Entertainment",
  "Shopping",
  "Education",
  "Nightlife"
]

export const categoryColors: Record<string, string> = {
  Music: "#E91E63",
  Tech: "#2196F3",
  Art: "#9C27B0",
  Wellness: "#4CAF50",
  Food: "#FF9800",
  Entertainment: "#F44336",
  Shopping: "#00BCD4",
  Education: "#3F51B5",
  Nightlife: "#673AB7",
  All: "#607D8B"
}
