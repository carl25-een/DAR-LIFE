import Link from "next/link";
import { type EventItem, formatDate, formatPrice } from "@/lib/events";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      {/* Cover — a gradient placeholder until real event posters are uploaded */}
      <div className="relative flex h-48 items-end overflow-hidden p-4">
        <div
          className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-[1.05] ${event.imageGradient}`}
        />
        {/* Depth: soft light from the top, grounding shade at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
        <span className="relative rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {event.category}
        </span>
        {event.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-900 shadow-md">
            ★ Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-xl font-bold leading-snug text-stone-900 transition-colors duration-200 group-hover:text-black">
          {event.title}
        </h3>
        <p className="text-sm font-medium text-stone-500">
          {formatDate(event.date)} · {event.timeLabel}
        </p>
        <p className="text-sm text-stone-500">
          {event.venue} · {event.area}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
          <span className="font-display text-lg font-bold text-stone-900">
            {event.priceTsh === 0 ? "Free" : `From ${formatPrice(event.priceTsh)}`}
          </span>
          <span className="text-xs font-medium text-stone-400">
            by {event.organiser}
          </span>
        </div>
      </div>
    </Link>
  );
}
