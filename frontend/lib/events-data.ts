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
    title: "Trinity Ball 2026",
    location: "Front Square, Trinity College",
    date: "Apr 12",
    time: "9:00 PM",
    attendees: 7500,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    category: "Music",
    lat: 53.3438,
    lng: -6.2546,
    description: "The biggest night of the year featuring top international artists.",
    organizer: "Trinity Ents",
    logo: ""
  },
  {
    id: "2",
    title: "Startup Pitch Night",
    location: "Tangent, Trinity College",
    date: "Mar 29",
    time: "6:30 PM",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    category: "Tech",
    lat: 53.3441,
    lng: -6.2588,
    description: "Pitch your startup idea to VCs and successful entrepreneurs.",
    organizer: "Entrepreneurial Society",
    logo: ""
  },
  {
    id: "3",
    title: "Life Drawing Session",
    location: "Arts Block, Trinity College",
    date: "Mar 30",
    time: "7:00 PM",
    attendees: 45,
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=300&fit=crop",
    category: "Art",
    lat: 53.3429,
    lng: -6.2537,
    description: "Weekly life drawing session with live models. All skill levels welcome.",
    organizer: "Visual Arts Society",
    logo: ""
  },
  {
    id: "4",
    title: "Mindfulness & Yoga",
    location: "Sports Centre, Trinity College",
    date: "Mar 31",
    time: "5:30 PM",
    attendees: 80,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    category: "Wellness",
    lat: 53.3451,
    lng: -6.2512,
    description: "Destress before exams with guided meditation and yoga flow.",
    organizer: "Yoga Society",
    logo: ""
  },
  {
    id: "5",
    title: "International Food Festival",
    location: "Dining Hall, Trinity College",
    date: "Apr 1",
    time: "12:00 PM",
    attendees: 350,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    category: "Food",
    lat: 53.3435,
    lng: -6.2556,
    description: "Taste authentic dishes from over 30 different countries.",
    organizer: "International Students Society",
    logo: ""
  },
  {
    id: "6",
    title: "Comedy Improv Night",
    location: "Players Theatre, Trinity College",
    date: "Apr 2",
    time: "9:00 PM",
    attendees: 180,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=300&fit=crop",
    category: "Entertainment",
    lat: 53.3445,
    lng: -6.2565,
    description: "Laugh out loud with Trinity Players improv comedy show.",
    organizer: "Players",
    logo: ""
  },
  {
    id: "7",
    title: "Vintage Clothing Sale",
    location: "Regent House, Trinity College",
    date: "Apr 3",
    time: "10:00 AM",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "Shopping",
    lat: 53.3442,
    lng: -6.2548,
    description: "Sustainable fashion sale with unique vintage finds.",
    organizer: "Fashion Society",
    logo: ""
  },
  {
    id: "8",
    title: "Coding Workshop: AI Basics",
    location: "O'Reilly Institute, Trinity College",
    date: "Apr 4",
    time: "2:00 PM",
    attendees: 60,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    category: "Education",
    lat: 53.3433,
    lng: -6.2501,
    description: "Learn the fundamentals of machine learning and AI.",
    organizer: "Computer Science Society",
    logo: ""
  },
  {
    id: "9",
    title: "Trad Session",
    location: "Pav Bar, Trinity College",
    date: "Apr 5",
    time: "8:30 PM",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=300&fit=crop",
    category: "Music",
    lat: 53.3448,
    lng: -6.2505,
    description: "Live traditional Irish music session with open floor.",
    organizer: "Trad Society",
    logo: ""
  },
  {
    id: "10",
    title: "Club Night: Neon Dreams",
    location: "Button Factory, Temple Bar",
    date: "Apr 6",
    time: "11:00 PM",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    category: "Nightlife",
    lat: 53.3457,
    lng: -6.2673,
    description: "Electronic music night featuring student DJs.",
    organizer: "DJ Society",
    logo: ""
  },
  {
    id: "11",
    title: "Debate: AI Ethics",
    location: "GMB, Trinity College",
    date: "Apr 7",
    time: "7:00 PM",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
    category: "Education",
    lat: 53.3440,
    lng: -6.2575,
    description: "Join the oldest student society for a debate on AI and ethics.",
    organizer: "Hist",
    logo: ""
  },
  {
    id: "12",
    title: "Literary Reading Night",
    location: "Berkeley Library, Trinity College",
    date: "Apr 8",
    time: "6:00 PM",
    attendees: 75,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    category: "Art",
    lat: 53.3432,
    lng: -6.2555,
    description: "Student poetry and prose readings in an intimate setting.",
    organizer: "Phil",
    logo: ""
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

// Trinity College Dublin colors - Blue and Gold
export const categoryColors: Record<string, string> = {
  Music: "#1A3A6E",
  Tech: "#1A3A6E",
  Art: "#1A3A6E",
  Wellness: "#1A3A6E",
  Food: "#C9A227",
  Entertainment: "#C9A227",
  Shopping: "#C9A227",
  Education: "#1A3A6E",
  Nightlife: "#C9A227",
  All: "#1A3A6E"
}
