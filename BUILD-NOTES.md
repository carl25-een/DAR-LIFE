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

## Increment 2: Discovery filters + sort, and Experiences pages

**Status:** Built 24 Nov 2026 and verified — `npm run build` passes clean.
Still frontend only: no database, no login, no payments. Nothing here is
deployed or pushed yet — this lives in the local workspace copy only, so
Carleen reviews it first and the Vercel deployment (which still waits on
her pasting the live link from her laptop) picks it up when the code is
pushed to GitHub.

### What changed, in plain language

- **Discovery grew three new controls** (`src/components/Discovery.tsx`):
  date chips — Any day / Weekends (Sat–Sun) / Weekdays (Mon–Fri); price
  chips — Any price / Free / Under TSh 30,000 / Under TSh 50,000; and a
  sort dropdown — Soonest first (the default), Lowest price, Highest
  price. A "Clear all filters" link appears whenever any filter is on,
  and the page now says how many events match ("10 events found"). The
  empty state ("Nothing matches that search — yet") now clears every
  filter, not just the search box.
- **Experiences are now real pages, not a teaser strip**
  (`src/lib/experiences.ts`, `src/components/ExperienceCard.tsx`,
  `src/app/experiences/page.tsx`,
  `src/app/experiences/[id]/page.tsx`). Six sample experiences — Bongoyo
  Island boat trips, Swahili cooking classes, padel in Masaki, golden-hour
  photo walks, Mbudya Island snorkelling, and a sunset dhow cruise — each
  with bookable slots instead of a single date, because experiences repeat
  and events happen once. The detail page mirrors the event detail page:
  description, duration, provider, slot list with places left, and a
  disabled "Booking opens in a later phase" button.
- **The home page teaser now shows the real experience cards**
  (`src/app/page.tsx`) — the three featured experiences, each linking to
  its detail page — with a "See all experiences →" link to the listing.
  The navbar's "Experiences" link now goes to `/experiences` instead of
  jumping down the home page.

### What is dummy (same rules as Increment 1)

- All 6 experiences are invented sample content, clearly marked in
  `src/lib/experiences.ts`, to be replaced by the database in a later
  phase. Card covers are still colour gradients, not real photos.
- "Sign in" and "Create event" are still visual placeholders, and both
  booking buttons still do nothing on purpose.

### How to check it

- `npm run dev`, then open http://localhost:3000 — try "Weekends" +
  "Under TSh 50,000" + "Lowest price" on the event grid, then click
  "Experiences" in the navbar and open the dhow cruise.
- `npm run build` — the "does it really work?" test; it passed clean for
  this increment.

### Recommended next increment

**Phase 5 — Supabase database + authentication:** move events and
experiences out of `src/lib/events.ts` / `src/lib/experiences.ts` into
real tables, add sign-in, and let organisers create events. That is the
step that turns the dummy data real — it needs the free Supabase project
set up first, which is a couple of minutes in the Supabase dashboard.

---

## Black-and-white restyle (24 Nov 2026)

At Carleen's request the whole site is now monochrome — a colour-only
change; layout, content, data and behaviour are untouched.

- Page background is very light grey (`#f7f7f7`), text near-black
  (`#0a0a0a`); the warm cream background and deep-orange accent are gone.
- Every accent is now black: the wordmark (with an underlined "LIFE"
  instead of orange), the "Create event" button, active filter chips,
  focus rings, links, and the "★ Featured" badges (white pill, black text).
- The hero's emphasis word ("Dar es Salaam?") uses a black underline
  instead of orange; "Sold out" labels are black instead of red.
- All card covers (`imageGradient` in `src/lib/events.ts` and
  `src/lib/experiences.ts`) are now a rotation of black, charcoal, grey
  and silver gradients, with one near-white cover for variety — the dark
  category chips stay readable on all of them.
- Verified: production build passes clean; home, an event page and the
  experiences pages return 200; screenshots in
  `~/workspace/dar-life-preview/bw-*.png`.

This restyle is **local only — not pushed to GitHub yet**, so the live
Vercel site still shows the previous cream-and-orange design until the
next push.
