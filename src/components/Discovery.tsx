"use client";

import { useMemo, useState, type ReactNode } from "react";
import { type EventItem } from "@/lib/events";
import EventCard from "@/components/EventCard";

export default function Discovery({
  events,
  children,
}: {
  events: EventItem[];
  // Optional content rendered between the filters and the results grid
  // (the home page uses it for the Featured events row).
  children?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Only offer chips for categories that actually have events right now.
  const categories = useMemo(() => {
    const present = Array.from(new Set(events.map((event) => event.category)));
    return ["All", ...present];
  }, [events]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;
      const matchesSearch =
        q === "" ||
        [event.title, event.venue, event.organiser, event.area]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [events, query, activeCategory]);

  return (
    <div>
      {/* Search */}
      <div className="mx-auto max-w-2xl">
        <label htmlFor="event-search" className="sr-only">
          Search events
        </label>
        <input
          id="event-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events, venues, organisers…"
          className="w-full rounded-full border border-stone-300 bg-white px-6 py-4 text-base text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-orange-600 focus:ring-4 focus:ring-orange-600/15"
        />
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-orange-700 text-white shadow"
                  : "bg-white text-stone-600 ring-1 ring-stone-300 hover:bg-stone-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {children}

      {/* Results grid */}
      {visible.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl bg-white px-6 py-14 text-center ring-1 ring-stone-200/70">
          <p className="text-lg font-bold text-stone-900">
            Nothing matches that search — yet.
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Try a different word, or clear the category filter to see
            everything happening in Dar.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="mt-5 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
          >
            Show all events
          </button>
        </div>
      )}
    </div>
  );
}
