import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Discovery from "@/components/Discovery";
import EventCard from "@/components/EventCard";
import { EVENTS } from "@/lib/events";

const EXPERIENCES = [
  {
    title: "Bongoyo Island Boat Trips",
    detail: "Half-day · from Slipway",
    gradient: "from-cyan-500 via-sky-600 to-blue-800",
  },
  {
    title: "Padel Courts in Masaki",
    detail: "Hourly court bookings",
    gradient: "from-lime-500 via-green-600 to-emerald-800",
  },
  {
    title: "Swahili Cooking Classes",
    detail: "Market tour + lunch",
    gradient: "from-amber-500 via-orange-600 to-red-700",
  },
  {
    title: "Golden-Hour Photo Walks",
    detail: "Old Town & the harbour",
    gradient: "from-fuchsia-500 via-purple-600 to-indigo-800",
  },
];

export default function Home() {
  const featured = EVENTS.filter((event) => event.featured);

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ef] text-stone-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero + discovery (search, category filters, featured, grid) */}
        <section id="events" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-4 pt-14 sm:px-6 sm:pt-20">
          <h1 className="mx-auto max-w-3xl text-center text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            What's happening in{" "}
            <span className="text-orange-700">Dar es Salaam?</span>
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
          <h2 className="text-2xl font-extrabold tracking-tight">
            Experiences to explore
          </h2>
          <p className="mt-2 max-w-xl text-stone-500">
            Beyond events — bookable activities across the city, from island
            boats to padel courts.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCES.map((experience) => (
              <div
                key={experience.title}
                className={`flex h-40 flex-col justify-end rounded-2xl bg-gradient-to-br p-5 text-white shadow-sm ${experience.gradient}`}
              >
                <p className="text-base font-bold leading-snug">
                  {experience.title}
                </p>
                <p className="mt-1 text-sm text-white/80">{experience.detail}</p>
              </div>
            ))}
          </div>
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
