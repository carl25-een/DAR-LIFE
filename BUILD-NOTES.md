# DAR LIFE — Build Notes

## Increment 1: Project scaffold + event discovery frontend

**Status:** Built and verified. `npm run build` passes clean, and a dev-server
smoke check confirmed the home page, an event detail page, and the 404
behaviour for unknown events.

This increment is **frontend only**. There is no database, no login, and no
payments yet — all event content is dummy data (see "What is dummy" below).

---

## What was built

- **Home page** (`/`)
  - Sticky navbar: DAR LIFE wordmark, Events / Experiences / Vendors links,
    "Sign in" link and a "Create event" button.
  - Hero: "What's happening in Dar es Salaam?" with a search box.
  - Live search (filters by event title, venue, organiser or area as you
    type) and category filter chips.
  - "Featured events" row (the 3 events marked featured).
  - "Upcoming events" grid of event cards.
  - "Experiences to explore" teaser strip and a vendor marketplace teaser.
  - Footer.
- **Event detail pages** (`/events/<id>`)
  - Cover banner, title, organiser, full description, date/time and venue.
  - Ticket types with prices in TSh and how many are left (sold-out types
    are labelled).
  - A disabled checkout button labelled "Checkout opens in a later phase" —
    a deliberate placeholder until the ticketing/payment phase.
  - Visiting an event address that does not exist shows a proper 404 page.
- **Design:** warm off-white background, near-black text, deep orange accent,
  rounded cards, strong bold headings. No extra UI libraries — just Tailwind
  utility classes.

## Folder structure, in plain language

```
dar-life/
├── src/
│   ├── app/                  ← the pages of the website
│   │   ├── page.tsx          ← home page ( / )
│   │   ├── layout.tsx        ← the frame every page shares (title, fonts)
│   │   ├── globals.css       ← global styles (background/text colours)
│   │   └── events/[id]/      ← one folder = one URL pattern
│   │       └── page.tsx      ← event detail page ( /events/<id> )
│   ├── components/           ← reusable building blocks
│   │   ├── Navbar.tsx        ← top navigation bar
│   │   ├── Footer.tsx        ← bottom footer
│   │   ├── EventCard.tsx     ← one event's card in the grids
│   │   └── Discovery.tsx     ← search box + category chips + results grid
│   └── lib/
│       └── events.ts         ← event types + the dummy event data
├── public/                   ← static files (icons, images)
├── package.json              ← project settings + the list of libraries
└── BUILD-NOTES.md            ← this file
```

How the pieces fit together: `page.tsx` (home) renders the `Navbar`,
`Discovery` and `Footer`. `Discovery` receives the events from
`lib/events.ts` and renders one `EventCard` per event. Each card links to
`/events/<id>`, where the detail page looks the event up by its `id` in the
same data file.

## How to run it

In a terminal, from this `dar-life` folder:

- `npm run dev` — start the development server, then open
  http://localhost:3000 in a browser. The page updates as files are edited.
- `npm run build` — check the whole project compiles and produce the
  production version (this is the "does it really work?" test).
- `npm run start` — run the production version after a build.
- `npm run lint` — run the code style/quality checker.

## What is dummy

- **All 10 events** in `src/lib/events.ts` are invented sample content
  (Dar-flavoured names, December 2026 dates, TSh prices) so the design can
  be built and judged. They are clearly marked in the file as dummy data to
  be replaced by the database in a later phase.
- **Card covers are colour gradients**, not real posters — real images come
  when organisers can upload them.
- "Sign in" and "Create event" are visual placeholders; there is no
  authentication yet.
- The checkout button does nothing yet, on purpose.

## Recommended next increment

**Increment 2 — finish the discovery experience before adding accounts:**
date and price filters alongside the existing search/category filters, a
sort control (soonest / lowest price), and an "Experiences" listing section
with its own dummy data and detail pages mirroring the events pattern.
After that, the natural step is the Phase 5 work from the blueprint:
Supabase database + authentication, moving events out of `lib/events.ts`
into real tables.
