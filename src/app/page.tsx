import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Discovery from "@/components/Discovery";
import EventCard from "@/components/EventCard";
import ExperienceCard from "@/components/ExperienceCard";
import Link from "next/link";
import { EVENTS } from "@/lib/events";
import { EXPERIENCES } from "@/lib/experiences";

export default function Home() {
  const featured = EVENTS.filter((event) => event.featured);
  const featuredExperiences = EXPERIENCES.filter(
    (experience) => experience.featured,
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero + discovery (search, category filters, featured, grid) */}
        <section id="events" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-8 pt-16 sm:px-6 sm:pt-24">
          <h1 className="mx-auto max-w-4xl text-center font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            What's happening in{" "}
            <span className="text-red-600 underline decoration-red-600 decoration-4 underline-offset-8">Dar es Salaam?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-stone-500 sm:text-xl">
            Concerts, brunches, beach parties, workshops and weekends away —
            discover it, book it, and walk in with your QR ticket.
          </p>

          <div className="mt-12">
            <Discovery events={EVENTS}>
              {/* Featured events */}
              {featured.length > 0 && (
                <section className="mt-20">
                  <div className="flex items-end justify-between">
                    <h2 className="font-display text-3xl font-bold tracking-tight">
                      Featured events
                    </h2>
                    <span className="hidden text-sm font-medium text-stone-400 sm:block">
                      Hand-picked for this season
                    </span>
                  </div>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {featured.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming events heading for the Discovery results grid */}
              <h2 className="mt-20 font-display text-3xl font-bold tracking-tight">
                Upcoming events
              </h2>
            </Discovery>
          </div>
        </section>

        {/* Experiences teaser */}
        <section
          id="experiences"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24"
        >
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Experiences to explore
            </h2>
            <Link
              href="/experiences"
              className="hidden text-sm font-semibold text-stone-900 underline-offset-4 transition-colors duration-200 hover:text-black hover:underline sm:block"
            >
              See all experiences →
            </Link>
          </div>
          <p className="mt-3 max-w-xl leading-relaxed text-stone-500">
            Beyond events — bookable activities across the city, from island
            boats to padel courts.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
          <Link
            href="/experiences"
            className="mt-8 inline-block text-sm font-semibold text-stone-900 underline-offset-4 hover:underline sm:hidden"
          >
            See all experiences →
          </Link>
        </section>

        {/* Vendors teaser */}
        <section id="vendors" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Planning something? Find your people.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-stone-500">
              Photographers, caterers, DJs, decorators and planners across Dar
              es Salaam will showcase their work in the DAR LIFE vendor
              marketplace.
            </p>
            <span className="mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-sm">
              Vendor marketplace — coming in a later phase
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
