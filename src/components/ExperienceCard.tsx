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
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/70 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Cover — a gradient placeholder until real provider photos are uploaded */}
      <div
        className={`relative flex h-44 items-end bg-gradient-to-br p-4 ${experience.imageGradient}`}
      >
        <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {experience.category}
        </span>
        {experience.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-900 shadow">
            ★ Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold leading-snug text-stone-900 group-hover:text-black">
          {experience.title}
        </h3>
        <p className="text-sm font-medium text-stone-500">
          {experience.durationLabel}
        </p>
        <p className="text-sm text-stone-500">{experience.area}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-extrabold text-stone-900">
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
