import Link from "next/link";
import { type ExperienceItem } from "@/lib/experiences";
import { formatPrice } from "@/lib/events";

export default function ExperienceCard({
  experience,
}: {
  experience: ExperienceItem;
}) {
  return (
    <Link
      href={`/experiences/${experience.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      {/* Cover — a gradient placeholder until real provider photos are uploaded */}
      <div className="relative flex h-48 items-end overflow-hidden p-4">
        <div
          className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-[1.05] ${experience.imageGradient}`}
        />
        {/* Depth: soft light from the top, grounding shade at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
        <span className="relative rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {experience.category}
        </span>
        {experience.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-900 shadow-md">
            ★ Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-xl font-bold leading-snug text-stone-900 transition-colors duration-200 group-hover:text-black">
          {experience.title}
        </h3>
        <p className="text-sm font-medium text-stone-500">
          {experience.durationLabel}
        </p>
        <p className="text-sm text-stone-500">{experience.area}</p>
        <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
          <span className="font-display text-lg font-bold text-stone-900">
            {experience.priceTsh === 0
              ? "Free"
              : `From ${formatPrice(experience.priceTsh)}`}
          </span>
          <span className="text-xs font-medium text-stone-400">
            by {experience.provider}
          </span>
        </div>
      </div>
    </Link>
  );
}
