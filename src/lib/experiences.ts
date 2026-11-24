// DAR LIFE — dummy experience data for development.
//
// Same idea as src/lib/events.ts: hard-coded sample experiences so the
// Experiences listing and detail pages can be designed and built before
// the database exists. It will be replaced by real data from the database
// (Supabase/PostgreSQL) in a later phase — nothing here is real, and no
// real provider or experience is being advertised.
//
// An "experience" differs from an "event" in one way that matters for the
// design: it runs on repeatable slots (e.g. every Saturday morning) rather
// than on a single date, so each experience lists bookable slots instead
// of one date and one set of ticket types.

export type ExperienceSlot = {
  label: string; // e.g. "Every Saturday · 8:00 AM"
  priceTsh: number;
  remaining: number;
  total: number;
};

export type ExperienceItem = {
  id: string; // URL slug, e.g. "bongoyo-island-boat-trips"
  title: string;
  category: string;
  area: string; // Neighbourhood / part of Dar es Salaam
  priceTsh: number; // Starting price; 0 means free
  durationLabel: string; // e.g. "Half-day · 4 hours"
  imageGradient: string; // Tailwind gradient classes used as the card cover
  provider: string;
  featured: boolean;
  description: string;
  slots: ExperienceSlot[];
};

export const EXPERIENCE_CATEGORIES = [
  "Island & Beach",
  "Food & Cooking",
  "Outdoors & Sport",
  "Culture & Tours",
] as const;

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "bongoyo-island-boat-trips",
    title: "Bongoyo Island Boat Trips",
    category: "Island & Beach",
    area: "Masaki",
    priceTsh: 60000,
    durationLabel: "Half-day · departs 9:00 AM, returns 4:00 PM",
    imageGradient: "from-neutral-900 via-neutral-700 to-neutral-500",
    provider: "Pwani Adventures",
    featured: true,
    description:
      "A slow half-day off the Masaki coast: boat out to Bongoyo Island, swim and snorkel in the clear water, then a grilled-seafood lunch under the trees before the boat back. Life jackets and snorkel gear included; bring sunscreen and a towel.",
    slots: [
      { label: "Saturday · 9:00 AM", priceTsh: 60000, remaining: 9, total: 20 },
      { label: "Sunday · 9:00 AM", priceTsh: 60000, remaining: 14, total: 20 },
      { label: "Saturday · 9:00 AM + lunch upgrade", priceTsh: 85000, remaining: 6, total: 12 },
    ],
  },
  {
    id: "swahili-cooking-classes",
    title: "Swahili Cooking Classes",
    category: "Food & Cooking",
    area: "Kariakoo",
    priceTsh: 55000,
    durationLabel: "Morning · market tour + lunch, 4 hours",
    imageGradient: "from-zinc-950 via-zinc-800 to-zinc-600",
    provider: "Chakula Kitchen",
    featured: true,
    description:
      "Start at Kariakoo Market picking spices, coconut and fresh fish with your host, then cook a full Swahili lunch together — pilau, kachumbari, mbaazi and coconut rice — and sit down to eat what you made. Recipes to take home.",
    slots: [
      { label: "Saturday · 9:00 AM", priceTsh: 55000, remaining: 5, total: 10 },
      { label: "Sunday · 9:00 AM", priceTsh: 55000, remaining: 8, total: 10 },
    ],
  },
  {
    id: "padel-courts-masaki",
    title: "Padel Courts in Masaki",
    category: "Outdoors & Sport",
    area: "Masaki",
    priceTsh: 40000,
    durationLabel: "Hourly court bookings, 7:00 AM – 10:00 PM",
    imageGradient: "from-stone-900 via-stone-700 to-stone-500",
    provider: "Masaki Padel Club",
    featured: false,
    description:
      "Four floodlit padel courts a short walk from the Slipway. Book by the hour, rackets and balls available to hire at the desk, and a café on site for the post-match debrief. Coaching sessions run on Saturday mornings.",
    slots: [
      { label: "Weekday hour · court hire", priceTsh: 40000, remaining: 18, total: 24 },
      { label: "Weekend hour · court hire", priceTsh: 55000, remaining: 7, total: 16 },
      { label: "Saturday coaching · 2 hours", priceTsh: 70000, remaining: 4, total: 8 },
    ],
  },
  {
    id: "golden-hour-photo-walks",
    title: "Golden-Hour Photo Walks",
    category: "Culture & Tours",
    area: "City Centre",
    priceTsh: 25000,
    durationLabel: "Evening · 2 hours, from 5:00 PM",
    imageGradient: "from-neutral-950 via-neutral-800 to-neutral-600",
    provider: "Tembea Dar",
    featured: false,
    description:
      "A guided walk through Old Town and the harbour as the light turns gold — Swahili doors, the fish market at dusk, and the ferry point. A local photographer leads and gives tips as you go; any camera, including a phone, works.",
    slots: [
      { label: "Friday · 5:00 PM", priceTsh: 25000, remaining: 11, total: 15 },
      { label: "Saturday · 5:00 PM", priceTsh: 25000, remaining: 6, total: 15 },
    ],
  },
  {
    id: "mbudya-island-snorkelling",
    title: "Mbudya Island Snorkelling Day",
    category: "Island & Beach",
    area: "Mbezi Beach",
    priceTsh: 75000,
    durationLabel: "Full day · departs 8:30 AM, returns 5:00 PM",
    imageGradient: "from-zinc-800 via-zinc-600 to-zinc-400",
    provider: "Bahari Beats",
    featured: false,
    description:
      "Boat from the Mbezi Beach jetty to Mbudya Island's marine reserve: snorkel over the reef, swim in the lagoon, and a beach barbecue lunch. Masks, fins and life jackets included; the boat leaves on time, so arrive by 8:00 AM.",
    slots: [
      { label: "Saturday · 8:30 AM", priceTsh: 75000, remaining: 12, total: 25 },
      { label: "Sunday · 8:30 AM", priceTsh: 75000, remaining: 19, total: 25 },
    ],
  },
  {
    id: "dar-sunset-dhow-cruise",
    title: "Dar Sunset Dhow Cruise",
    category: "Island & Beach",
    area: "Masaki",
    priceTsh: 90000,
    durationLabel: "Evening · 2.5 hours, 5:00 PM – 7:30 PM",
    imageGradient: "from-stone-950 via-stone-800 to-stone-600",
    provider: "Sauti Live",
    featured: true,
    description:
      "A traditional dhow out of the Msasani bay at sunset, with live taarab drifting across the deck and soft drinks and bites served on board. The cruise returns as the city lights come on — the slow way to end a Dar day.",
    slots: [
      { label: "Friday · 5:00 PM", priceTsh: 90000, remaining: 3, total: 30 },
      { label: "Saturday · 5:00 PM", priceTsh: 90000, remaining: 16, total: 30 },
      { label: "Private dhow (up to 12)", priceTsh: 850000, remaining: 2, total: 4 },
    ],
  },
];

export function getExperienceById(id: string): ExperienceItem | undefined {
  return EXPERIENCES.find((experience) => experience.id === id);
}
