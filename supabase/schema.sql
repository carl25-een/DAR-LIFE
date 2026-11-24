-- =====================================================================
-- DAR LIFE — Phase 5 database schema (Supabase / PostgreSQL)
-- =====================================================================
-- How to use: in the Supabase dashboard, open your project →
-- SQL Editor → New query → paste this whole file → Run.
-- It is safe to run once on a new, empty project.
--
-- What this creates:
--   profiles          — one row per signed-up user, with their role
--   events            — events listed on DAR LIFE
--   ticket_types      — the ticket options for an event (price, capacity)
--   experiences       — bookable experiences (they run on repeatable slots)
--   experience_slots  — the bookable time slots for an experience
--
-- Security: Row Level Security (RLS) is switched ON for every table.
-- That means the database itself — not just the website code — decides
-- who can see or change each row. The policies at the bottom say:
--   * Anyone (even signed out) can READ published events, experiences,
--     their ticket types and slots.
--   * A signed-in user can read and update ONLY their own profile row.
--   * Everything else (creating/editing events, etc.) is blocked for
--     now and will be opened up role-by-role in later phases.
-- =====================================================================

-- Needed for generating unique IDs (uuid_generate_v4 / gen_random_uuid).
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- profiles — one row per user, linked to Supabase Auth.
-- The `id` is the same id Supabase Auth gives the user when they sign up.
-- ---------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'user'
    check (role in ('user', 'organiser', 'provider', 'vendor', 'admin')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- events — mirrors the fields used by src/lib/events.ts.
-- starts_at / ends_at store the date AND time together; the human
-- readable labels the site shows today (date, timeLabel) are worked out
-- from these when the site switches to real data.
-- ---------------------------------------------------------------------
create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,               -- URL, e.g. "coco-beach-sunset-sessions"
  title text not null,
  category text not null,
  venue text not null,
  area text,                               -- neighbourhood, e.g. "Masaki"
  starts_at timestamptz not null,
  ends_at timestamptz,
  price_tsh integer not null default 0,    -- starting price; 0 means free
  image_gradient text,                     -- Tailwind gradient classes for the card cover
  featured boolean not null default false,
  description text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'cancelled')),
  organiser_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- ticket_types — the ticket options for one event.
-- In the dummy data the site shows "remaining" and "total"; in the
-- database we store `capacity` (total) and `sold`, and remaining is
-- simply capacity - sold.
-- ---------------------------------------------------------------------
create table public.ticket_types (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  name text not null,                      -- e.g. "Regular", "VIP"
  price_tsh integer not null default 0,
  capacity integer not null default 0,
  sold integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- experiences — mirrors the fields used by src/lib/experiences.ts.
-- ---------------------------------------------------------------------
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,               -- URL, e.g. "bongoyo-island-boat-trips"
  title text not null,
  category text not null,
  area text,
  price_tsh integer not null default 0,    -- starting price; 0 means free
  duration_label text,                     -- e.g. "Half-day · 4 hours"
  image_gradient text,                     -- Tailwind gradient classes for the card cover
  featured boolean not null default false,
  description text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'cancelled')),
  provider_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- experience_slots — one bookable slot for an experience.
-- `label` keeps the friendly text the site shows today
-- (e.g. "Every Saturday · 9:00 AM"); `starts_at` is the concrete next
-- occurrence used for ordering and booking cut-offs.
-- ---------------------------------------------------------------------
create table public.experience_slots (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences (id) on delete cascade,
  label text,
  starts_at timestamptz not null,
  price_tsh integer not null default 0,
  capacity integer not null default 0,
  booked integer not null default 0,
  created_at timestamptz not null default now()
);

-- Helpful indexes for the queries the site will run most.
create index events_status_starts_at_idx on public.events (status, starts_at);
create index ticket_types_event_id_idx on public.ticket_types (event_id);
create index experiences_status_idx on public.experiences (status);
create index experience_slots_experience_id_idx on public.experience_slots (experience_id);

-- =====================================================================
-- Row Level Security — switch it ON for every table.
-- With RLS on and no policy allowing an action, that action is denied.
-- =====================================================================
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.ticket_types enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_slots enable row level security;

-- ---------------------------------------------------------------------
-- profiles policies: a user can see and update ONLY their own row.
-- (auth.uid() is the signed-in user's id; it is null when signed out.)
-- ---------------------------------------------------------------------
create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------
-- events policies: anyone can read PUBLISHED events. Drafts and
-- cancelled events stay hidden from the public.
-- ---------------------------------------------------------------------
create policy "Anyone can read published events"
  on public.events for select
  using (status = 'published');

-- ---------------------------------------------------------------------
-- ticket_types policies: anyone can read ticket types that belong to a
-- published event.
-- ---------------------------------------------------------------------
create policy "Anyone can read ticket types of published events"
  on public.ticket_types for select
  using (
    exists (
      select 1 from public.events
      where events.id = ticket_types.event_id
        and events.status = 'published'
    )
  );

-- ---------------------------------------------------------------------
-- experiences policies: anyone can read PUBLISHED experiences.
-- ---------------------------------------------------------------------
create policy "Anyone can read published experiences"
  on public.experiences for select
  using (status = 'published');

-- ---------------------------------------------------------------------
-- experience_slots policies: anyone can read slots that belong to a
-- published experience.
-- ---------------------------------------------------------------------
create policy "Anyone can read slots of published experiences"
  on public.experience_slots for select
  using (
    exists (
      select 1 from public.experiences
      where experiences.id = experience_slots.experience_id
        and experiences.status = 'published'
    )
  );

-- =====================================================================
-- Auto-create a profile row when someone signs up.
--
-- When Supabase Auth creates a new user (a row in auth.users), this
-- trigger inserts the matching row in public.profiles with the default
-- role 'user'. The function runs as "security definer" so it is allowed
-- to write the profile even though the new user has no rights yet.
-- =====================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
-- Done. Later phases will add: orders/bookings tables, and policies
-- that let organisers and providers manage their own events and
-- experiences.
-- =====================================================================
