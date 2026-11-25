import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { EXPERIENCES } from "@/lib/experiences";

export default function ExperiencesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Experiences to{" "}
            <span className="underline decoration-4 underline-offset-8">explore</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-500 sm:text-xl">
            Beyond events — bookable activities across the city, from island
            boats to padel courts. These run on repeatable slots, so pick a
            day that suits you.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {EXPERIENCES.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>

          <p className="mt-12 text-sm text-stone-400">
            Sample experiences for now — real providers and bookable slots
            arrive with the database phase.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
