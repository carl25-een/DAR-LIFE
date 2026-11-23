// DAR LIFE — dummy event data for development.
//
// This file holds hard-coded sample events so the frontend can be designed
// and built before the database exists. It will be replaced by real data
// from the database (Supabase/PostgreSQL) in a later phase — nothing here
// is real, and no real organiser or event is being advertised.

export type TicketType = {
  name: string;
  priceTsh: number;
  remaining: number;
  total: number;
};

export type EventItem = {
  id: string; // URL slug, e.g. "coco-beach-sunset-sessions"
  title: string;
  category: string;
  date: string; // ISO date, e.g. "2026-12-05"
  timeLabel: string; // Human-readable time, e.g. "7:00 PM – 11:00 PM"
  venue: string;
  area: string; // Neighbourhood / part of Dar es Salaam
  priceTsh: number; // Starting price; 0 means free
  imageGradient: string; // Tailwind gradient classes used as the card cover
  organiser: string;
  featured: boolean;
  description: string;
  ticketTypes: TicketType[];
};

export const CATEGORIES = [
  "Music & Concerts",
  "Parties & Nightlife",
  "Brunch & Dining",
  "Fashion & Beauty",
  "Fitness & Sports",
  "Networking & Business",
  "Art & Culture",
  "Festivals",
  "Workshops",
  "Travel & Outdoor",
] as const;

export const EVENTS: EventItem[] = [
  {
    id: "dar-jazz-night-slipway",
    title: "Dar Jazz Night at The Slipway",
    category: "Music & Concerts",
    date: "2026-12-05",
    timeLabel: "7:00 PM – 11:00 PM",
    venue: "The Slipway Terrace",
    area: "Masaki",
    priceTsh: 45000,
    imageGradient: "from-amber-500 via-orange-600 to-rose-700",
    organiser: "Sauti Live",
    featured: true,
    description:
      "An open-air evening of live jazz overlooking the bay — local quartets, a vinyl-only interlude set, and food stalls from Masaki favourites. Doors open at 6:30 PM; seating is first come, first served on the terrace.",
    ticketTypes: [
      { name: "Regular", priceTsh: 45000, remaining: 132, total: 200 },
      { name: "VIP — front terrace table", priceTsh: 120000, remaining: 14, total: 40 },
      { name: "Early Bird", priceTsh: 35000, remaining: 0, total: 100 },
    ],
  },
  {
    id: "coco-beach-sunset-sessions",
    title: "Coco Beach Sunset Sessions",
    category: "Parties & Nightlife",
    date: "2026-12-11",
    timeLabel: "4:00 PM – 12:00 AM",
    venue: "Coco Beach",
    area: "Oyster Bay",
    priceTsh: 30000,
    imageGradient: "from-orange-400 via-rose-500 to-purple-700",
    organiser: "Bahari Beats",
    featured: true,
    description:
      "Dar's favourite shoreline turns into an open-air dancefloor from golden hour to midnight. Amapiano, Afro house and singeli sets from resident DJs, with street-food vendors along the beach path.",
    ticketTypes: [
      { name: "Regular", priceTsh: 30000, remaining: 480, total: 800 },
      { name: "Group of 4", priceTsh: 100000, remaining: 45, total: 100 },
      { name: "VIP cabana (up to 6)", priceTsh: 250000, remaining: 6, total: 12 },
    ],
  },
  {
    id: "masaki-brunch-club",
    title: "The Masaki Brunch Club",
    category: "Brunch & Dining",
    date: "2026-12-12",
    timeLabel: "10:00 AM – 2:00 PM",
    venue: "Garden Bistro, Chole Road",
    area: "Masaki",
    priceTsh: 65000,
    imageGradient: "from-yellow-400 via-amber-500 to-orange-600",
    organiser: "Brunch Club DSM",
    featured: false,
    description:
      "A long-table brunch with a Swahili-coastal twist: mbaazi and coconut pancakes, grilled pweza bites, fresh Madafu, and bottomless kahawa. One seating only, forty seats at the table.",
    ticketTypes: [
      { name: "Brunch seat", priceTsh: 65000, remaining: 11, total: 40 },
      { name: "Brunch seat + drinks package", priceTsh: 95000, remaining: 8, total: 20 },
    ],
  },
  {
    id: "swahili-fashion-weekend",
    title: "Swahili Fashion Weekend — Designer Showcase",
    category: "Fashion & Beauty",
    date: "2026-12-19",
    timeLabel: "6:00 PM – 10:00 PM",
    venue: "Hyatt Regency, The Kilimanjaro Ballroom",
    area: "Upanga",
    priceTsh: 25000,
    imageGradient: "from-fuchsia-500 via-purple-600 to-indigo-800",
    organiser: "Dar Style Collective",
    featured: true,
    description:
      "A runway showcase of Tanzanian and East African designers — kanga and kitenge reworked for the modern wardrobe, plus a pop-up market of local accessories and beauty brands in the foyer.",
    ticketTypes: [
      { name: "Regular", priceTsh: 25000, remaining: 210, total: 300 },
      { name: "Front row", priceTsh: 80000, remaining: 18, total: 50 },
      { name: "Early Bird", priceTsh: 18000, remaining: 0, total: 80 },
    ],
  },
  {
    id: "sunrise-yoga-mbezi-beach",
    title: "Sunrise Yoga & Beach Clean-Up",
    category: "Fitness & Sports",
    date: "2026-12-06",
    timeLabel: "6:00 AM – 8:30 AM",
    venue: "Mbezi Beach, Africana area",
    area: "Mbezi Beach",
    priceTsh: 20000,
    imageGradient: "from-teal-400 via-emerald-500 to-green-700",
    organiser: "Pumzika Wellness",
    featured: false,
    description:
      "Start Sunday facing the ocean: a 60-minute all-levels flow at sunrise, followed by a voluntary 30-minute beach clean-up and fresh juice. Mats provided if you book in advance.",
    ticketTypes: [
      { name: "Yoga only", priceTsh: 20000, remaining: 26, total: 50 },
      { name: "Yoga + mat hire + juice", priceTsh: 30000, remaining: 15, total: 30 },
    ],
  },
  {
    id: "dar-founders-mixer",
    title: "Dar Founders & Freelancers Mixer",
    category: "Networking & Business",
    date: "2026-12-10",
    timeLabel: "5:30 PM – 8:30 PM",
    venue: "Co-working Rooftop, Ohio Street",
    area: "City Centre",
    priceTsh: 0,
    imageGradient: "from-sky-500 via-blue-600 to-indigo-700",
    organiser: "Dar Founders Circle",
    featured: false,
    description:
      "A free, no-pitch evening for founders, freelancers and the Dar-curious: structured introductions, a 20-minute fireside chat on selling services online, and plenty of unstructured time. Registration required — capacity is capped.",
    ticketTypes: [
      { name: "Free registration", priceTsh: 0, remaining: 37, total: 120 },
    ],
  },
  {
    id: "kariakoo-heritage-walk",
    title: "Kariakoo Heritage Walking Tour",
    category: "Art & Culture",
    date: "2026-12-12",
    timeLabel: "8:00 AM – 11:00 AM",
    venue: "Meet at Kariakoo Market, Uhuru Street entrance",
    area: "Kariakoo",
    priceTsh: 15000,
    imageGradient: "from-red-500 via-orange-600 to-amber-600",
    organiser: "Tembea Dar",
    featured: false,
    description:
      "A guided walk through Dar's most electric neighbourhood — the Kariakoo market halls, Swahili-Arab architecture, legendary fabric shops, and the stories behind the streets. Ends with chai and maandazi at a local spot.",
    ticketTypes: [
      { name: "Adult", priceTsh: 15000, remaining: 19, total: 25 },
      { name: "Student (with ID)", priceTsh: 8000, remaining: 10, total: 15 },
    ],
  },
  {
    id: "dar-food-festival-mikocheni",
    title: "Dar Food Festival",
    category: "Festivals",
    date: "2026-12-26",
    timeLabel: "12:00 PM – 10:00 PM",
    venue: "Mikocheni Grounds, Rose Garden Road",
    area: "Mikocheni",
    priceTsh: 10000,
    imageGradient: "from-lime-500 via-green-600 to-emerald-800",
    organiser: "Chakula Events",
    featured: false,
    description:
      "Boxing Day, Dar style: sixty-plus food stalls from nyama choma grills to Zanzibari biryani and urojo, cooking demos, a chilli-eating contest, and live bands into the evening. Entry ticket includes one tasting token.",
    ticketTypes: [
      { name: "Entry", priceTsh: 10000, remaining: 1450, total: 2000 },
      { name: "Entry + 5 tasting tokens", priceTsh: 35000, remaining: 320, total: 500 },
    ],
  },
  {
    id: "pottery-workshop-mikocheni",
    title: "Beginners' Pottery Workshop",
    category: "Workshops",
    date: "2026-12-13",
    timeLabel: "10:00 AM – 1:00 PM",
    venue: "Udongo Studio",
    area: "Mikocheni",
    priceTsh: 55000,
    imageGradient: "from-stone-500 via-amber-700 to-orange-900",
    organiser: "Udongo Studio",
    featured: false,
    description:
      "Three hours at the wheel with a local ceramicist: throw, trim and glaze two pieces to collect the following weekend. Clay, tools, apron and firing included. No experience needed; groups capped at twelve.",
    ticketTypes: [
      { name: "Workshop seat", priceTsh: 55000, remaining: 4, total: 12 },
    ],
  },
  {
    id: "bagamoyo-day-escape",
    title: "Bagamoyo Day Escape — History & Beach",
    category: "Travel & Outdoor",
    date: "2026-12-19",
    timeLabel: "7:00 AM – 6:00 PM",
    venue: "Departs from Slipway, Masaki",
    area: "Bagamoyo day trip",
    priceTsh: 85000,
    imageGradient: "from-cyan-500 via-sky-600 to-blue-800",
    organiser: "Pwani Adventures",
    featured: false,
    description:
      "A full-day guided escape up the coast: Kaole ruins, the Old Fort and Caravan Serai museum, then a slow afternoon on the beach with a seafood lunch. Return transport from the Slipway departure point included.",
    ticketTypes: [
      { name: "Adult", priceTsh: 85000, remaining: 16, total: 30 },
      { name: "Child (under 12)", priceTsh: 50000, remaining: 9, total: 15 },
    ],
  },
];

export function getEventById(id: string): EventItem | undefined {
  return EVENTS.find((event) => event.id === id);
}

export function formatPrice(priceTsh: number): string {
  if (priceTsh === 0) return "Free";
  return `TSh ${priceTsh.toLocaleString("en-US")}`;
}

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
