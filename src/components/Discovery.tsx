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
  // Date: "all" | "weekend" (Sat–Sun) | "weekday" (Mon–Fri).
  // Weekends/weekdays are judged from the event's own day of the week,
  // so the filter works the same on dummy data and on real listings.
  const [dateFilter, setDateFilter] = useState<string>("all");
  // Price: "any" | "free" | "under30" (< TSh 30,000, paid) |
  // "under50" (< TSh 50,000, paid).
  const [priceFilter, setPriceFilter] = useState<string>("any");
  // Sort: "soonest" (date, then price) | "lowest" | "highest".
  const [sort, setSort] = useState<string>("soonest");

  const filtersActive =
    query.trim() !== "" ||
    activeCategory !== "All" ||
    dateFilter !== "all" ||
    priceFilter !== "any" ||
    sort !== "soonest";

  const clearAll = () => {
    setQuery("");
    setActiveCategory("All");
    setDateFilter("all");
    setPriceFilter("any");
    setSort("soonest");
  };

  // Only offer chips for categories that actually have events right now.
  const categories = useMemo(() => {
    const present = Array.from(new Set(events.map((event) => event.category)));
    return ["All", ...present];
  }, [events]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;
      const matchesSearch =
        q === "" ||
        [event.title, event.venue, event.organiser, event.area]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const day = new Date(`${event.date}T00:00:00`).getDay();
      const isWeekend = day === 0 || day === 6;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "weekend" && isWeekend) ||
        (dateFilter === "weekday" && !isWeekend);
      const matchesPrice =
        priceFilter === "any" ||
        (priceFilter === "free" && event.priceTsh === 0) ||
        (priceFilter === "under30" &&
          event.priceTsh > 0 &&
          event.priceTsh < 30000) ||
        (priceFilter === "under50" &&
          event.priceTsh > 0 &&
          event.priceTsh < 50000);
      return matchesCategory && matchesSearch && matchesDate && matchesPrice;
    });
    const sorted = [...filtered];
    if (sort === "lowest") {
      sorted.sort((a, b) => a.priceTsh - b.priceTsh);
    } else if (sort === "highest") {
      sorted.sort((a, b) => b.priceTsh - a.priceTsh);
    } else {
      sorted.sort(
        (a, b) =>
          a.date.localeCompare(b.date) || a.priceTsh - b.priceTsh,
      );
    }
    return sorted;
  }, [events, query, activeCategory, dateFilter, priceFilter, sort]);

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
          className="w-full rounded-full border border-stone-300 bg-white px-6 py-4 text-base text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-stone-900 focus:ring-4 focus:ring-stone-900/10"
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
                  ? "bg-stone-900 text-white shadow"
                  : "bg-white text-stone-600 ring-1 ring-stone-300 hover:bg-stone-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {children}

      {/* Date + price filters and sort */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-500">When:</span>
          {[
            { value: "all", label: "Any day" },
            { value: "weekend", label: "Weekends" },
            { value: "weekday", label: "Weekdays" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDateFilter(option.value)}
              className={`rounded-full px-3 py-1.5 font-semibold transition ${
                dateFilter === option.value
                  ? "bg-stone-900 text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-300 hover:bg-stone-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-500">Price:</span>
          {[
            { value: "any", label: "Any price" },
            { value: "free", label: "Free" },
            { value: "under30", label: "Under TSh 30,000" },
            { value: "under50", label: "Under TSh 50,000" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPriceFilter(option.value)}
              className={`rounded-full px-3 py-1.5 font-semibold transition ${
                priceFilter === option.value
                  ? "bg-stone-900 text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-300 hover:bg-stone-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 font-bold text-stone-500">
          Sort:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-stone-300 bg-white px-3 py-1.5 font-semibold text-stone-700 outline-none focus:border-stone-900"
          >
            <option value="soonest">Soonest first</option>
            <option value="lowest">Lowest price</option>
            <option value="highest">Highest price</option>
          </select>
        </label>

        {filtersActive && (
          <button
            type="button"
            onClick={clearAll}
            className="font-semibold text-stone-900 underline hover:text-black"
          >
            Clear all filters
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-sm font-medium text-stone-500">
        {visible.length}{" "}
        {visible.length === 1 ? "event" : "events"} found
      </p>

      {/* Results grid */}
      {visible.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            Try a different word, or clear the filters to see everything
            happening in Dar.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-5 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Show all events
          </button>
        </div>
      )}
    </div>
  );
}
