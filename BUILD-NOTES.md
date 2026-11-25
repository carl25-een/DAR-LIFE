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

---

## Phase 5 — Database & Authentication scaffolding (24 Nov 2026)

The wiring for Supabase (PostgreSQL database + user accounts) is now in
the code, ready for the moment the Supabase project exists. Nothing on
the visible site has changed except that "Sign in" now leads to a real
sign-in page — events and experiences still run on the dummy data in
`src/lib/`, and the switch to real database data is the next increment,
once the connection has been tested.

### What was added

- **Packages:** `@supabase/supabase-js` and `@supabase/ssr` installed.
- **`.env.example`** — documents the two settings the app needs
  (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
  Real values go in `.env.local`, which is gitignored and must never be
  committed. (`.gitignore` gained a `!.env.example` exception so the
  example file itself can be committed.)
- **`supabase/schema.sql`** — the whole Phase 5 database in one file:
  `profiles` (one row per user, with a role: user / organiser /
  provider / vendor / admin), `events`, `ticket_types`, `experiences`
  and `experience_slots`, mirroring the fields the dummy data uses.
  Row Level Security is switched on for every table: anyone can read
  *published* events, experiences, ticket types and slots; a user can
  read and update only their own profile; and a database trigger
  automatically creates a profile row the moment someone signs up.
- **`src/lib/supabase/`** — the connection helpers, following the
  current `@supabase/ssr` guidance for Next 16: `config.ts` (checks
  whether the settings exist), `client.ts` (browser client, for forms),
  `server.ts` (server client, awaits `cookies()` as Next 16 requires).
  All of them return "not configured" gracefully instead of crashing.
- **`src/proxy.ts`** — Next 16 renamed *middleware* to *proxy*. This
  file refreshes the sign-in session cookie on each request (that is
  what keeps people signed in). With no Supabase settings present it
  passes requests through untouched.
- **Pages:** `/sign-in` and `/sign-up` (email + password forms in the
  site's black-and-white design, with the red accent on the links),
  and `/account`, which shows the signed-in user's email plus a
  sign-out button, or a friendly "you are not signed in" state.
  The navbar's "Sign in" link now points to `/sign-in`.
- Until Supabase is connected, the forms explain that accounts are
  "not switched on yet" rather than failing — try them and see.

### Verified

- `npm run build` passes clean with **no** environment variables set.
- Production server smoke test: `/`, `/sign-in`, `/sign-up` and
  `/account` all return 200; `/account` shows the not-signed-in state.
- One Next 16 lesson worth remembering: this project has Cache
  Components enabled, so `export const dynamic = "force-dynamic"` is
  banned — request-time reads (like the session cookie on `/account`)
  must live inside a `<Suspense>` boundary instead.

### What Carleen must do in Supabase (one-time setup)

1. Create the free project at supabase.com (name it DAR LIFE, choose a
   strong database password and save it somewhere safe, region:
   whichever is closest — e.g. EU / Frankfurt).
2. In the project: **SQL Editor → New query** → paste in the whole of
   `supabase/schema.sql` → **Run**. You should see the five tables
   appear under **Table Editor**.
3. Go to **Settings → API** and copy the **Project URL** and the
   **anon public** key.
4. Put them in a file called `.env.local` in the project root (copy
   `.env.example` and fill in the two values) for local development.
5. Add the same two values in **Vercel → your DAR LIFE project →
   Settings → Environment Variables**, so the live site can connect.
6. Tell Muse the connection is ready — the next increment switches
   events and experiences from dummy data to the database and tests a
   real sign-up end to end.

**Local only — not pushed to GitHub yet.**

---

## UI polish pass — 2026-11-25

A styling-only pass to give the whole site a more premium feel, after
Carleen's feedback that the UI looked plain. No layout, content, data
or route changes — same sections, same words, same dummy data. The
settled brand identity is untouched: pure-white background, black &
white palette, red DAR LIFE wordmark and red "Dar es Salaam?" hero
accent. Supabase wiring and the auth flow work exactly as before.

### Typography

- New font pairing via `next/font/google` in `src/app/layout.tsx`:
  **Space Grotesk** for display (headings, wordmark, prices — exposed
  as the Tailwind `font-display` utility through `--font-display` in
  `globals.css`) and **Inter** for body text (`font-sans`).
  Geist Mono is kept for the mono token.
- Type scale refined: hero is now `text-5xl → sm:text-6xl` with
  tighter leading, section titles moved to confident `text-3xl`
  display headings, detail-page titles to `text-4xl → sm:text-5xl`,
  and body copy given relaxed leading (`leading-relaxed` /
  `leading-8` for long-form text).

### Depth language (cards, panels, auth)

- Two shared shadow utilities in `globals.css` (`@utility`):
  `shadow-card` for resting cards/panels and `shadow-card-hover`
  for the lifted hover state — one soft, layered elevation style
  used everywhere instead of flat `shadow-sm` + ring.
- Event/experience cards: `rounded-3xl`, stone-200 border, taller
  covers (h-48) whose gradient layer gently scales on hover, a
  top-light/bottom-shade overlay on covers for depth, small-caps
  category chips and Featured badges, roomier padding (p-6), and
  the price row anchored to the card bottom above a hairline
  divider so prices align across a row.
- Detail pages: taller covers (h-72 → sm:h-96) with the same
  vignette overlay, booking panel upgraded to the card treatment,
  small-caps detail labels, and ticket/slot rows as roomier
  rounded-2xl list cards with display-font prices. The disabled
  checkout/booking buttons keep their wording and meaning, with a
  softer disabled treatment.
- Auth and account cards use the same border + `shadow-card` +
  generous padding (sm:p-10); inputs are rounded-2xl with a soft
  stone focus ring, matching the search input's language.

### Spacing & controls

- More generous rhythm throughout: hero and section padding up
  (py-20 → sm:py-24 in places), wider grid gaps on desktop
  (md:gap-8), more air between Featured/Upcoming and around
  section headings.
- Search input: softer border, card shadow, clear stone-900 focus
  ring. Category/date/price chips: more padding, smoother
  `transition-all` states with a subtle press effect, refined
  inactive hover. Filter labels ("When:", "Price:", "Sort:") are
  now small-caps; the sort select matches the chips.
- Navbar is slightly taller (4.5rem) with a solid hairline border
  and stronger blur; the wordmark is set in Space Grotesk; the
  "Create event" button gained hover shadow and a press state.
  Footer spacing and hierarchy refined (small-caps column headings,
  roomier lists).
- Micro-finishes: black text selection (`::selection`), smooth
  scrolling, antialiased text everywhere, consistent
  `duration-200/300` transitions and focus-visible rings.

### Verified

- `npm run build` passes clean (with `.env.local` present).
- Production smoke test: `/`, `/events/coco-beach-sunset-sessions`,
  `/experiences`, `/sign-in` and `/account` all return 200.
- Screenshots in `~/workspace/dar-life-preview/`:
  `polish-homepage-desktop.png`, `polish-homepage-mobile.png`,
  `polish-event-detail.png`, `polish-sign-in.png`.

**Local only — not pushed to GitHub yet.**
