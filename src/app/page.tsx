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
        <section id="events" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-4 pt-14 sm:px-6 sm:pt-20">
          <h1 className="mx-auto max-w-3xl text-center text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            What's happening in{" "}
            <span className="text-red-600 underline decoration-red-600 decoration-4 underline-offset-8">Dar es Salaam?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-stone-500">
            Concerts, brunches, beach parties, workshops and weekends away —
            discover it, book it, and walk in with your QR ticket.
          </p>

          <div className="mt-10">
            <Discovery events={EVENTS}>
              {/* Featured events */}
              {featured.length > 0 && (
                <section className="mt-16">
                  <div className="flex items-end justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      Featured events
                    </h2>
                    <span className="hidden text-sm font-medium text-stone-400 sm:block">
                      Hand-picked for this season
                    </span>
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming events heading for the Discovery results grid */}
              <h2 className="mt-16 text-2xl font-extrabold tracking-tight">
                Upcoming events
              </h2>
            </Discovery>
          </div>
        </section>

        {/* Experiences teaser */}
        <section
          id="experiences"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
        >
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Experiences to explore
            </h2>
            <Link
              href="/experiences"
              className="hidden text-sm font-semibold text-stone-900 hover:underline sm:block"
            >
              See all experiences →
            </Link>
          </div>
          <p className="mt-2 max-w-xl text-stone-500">
            Beyond events — bookable activities across the city, from island
            boats to padel courts.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
          <Link
            href="/experiences"
            className="mt-6 inline-block text-sm font-semibold text-stone-900 hover:underline sm:hidden"
          >
            See all experiences →
          </Link>
        </section>

        {/* Vendors teaser */}
        <section id="vendors" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Planning something? Find your people.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-stone-500">
              Photographers, caterers, DJs, decorators and planners across Dar
              es Salaam will showcase their work in the DAR LIFE vendor
              marketplace.
            </p>
            <span className="mt-6 inline-block rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white">
              Vendor marketplace — coming in a later phase
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
