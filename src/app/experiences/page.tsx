import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceCard from "@/components/ExperienceCard";
import { EXPERIENCES } from "@/lib/experiences";

export default function ExperiencesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Experiences to{" "}
            <span className="underline decoration-4 underline-offset-8">explore</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-500">
            Beyond events — bookable activities across the city, from island
            boats to padel courts. These run on repeatable slots, so pick a
            day that suits you.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>

          <p className="mt-10 text-sm text-stone-400">
            Sample experiences for now — real providers and bookable slots
            arrive with the database phase.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
