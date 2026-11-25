import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EVENTS, getEventById, formatDate, formatPrice } from "@/lib/events";

export function generateStaticParams() {
  return EVENTS.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Navbar />

      <main className="flex-1">
        {/* Cover */}
        <div
          className={`relative flex h-72 items-end bg-gradient-to-br sm:h-96 ${event.imageGradient}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
            <span className="rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {event.category}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/#events"
            className="text-sm font-semibold text-stone-900 underline-offset-4 transition-colors duration-200 hover:text-black hover:underline"
          >
            ← Back to events
          </Link>

          <div className="mt-6 grid gap-12 lg:grid-cols-3">
            {/* Main column */}
            <div className="lg:col-span-2">
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                {event.title}
              </h1>
              <p className="mt-4 text-lg font-medium text-stone-500">
                Organised by {event.organiser}
              </p>

              <div className="mt-10">
                <h2 className="font-display text-xl font-bold">About this event</h2>
                <p className="mt-4 text-base leading-8 text-stone-600">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Booking column */}
            <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-7 shadow-card">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400">
                    Date & time
                  </dt>
                  <dd className="mt-1.5 font-semibold text-stone-900">
                    {formatDate(event.date)}
                    <br />
                    {event.timeLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400">
                    Venue
                  </dt>
                  <dd className="mt-1.5 font-semibold text-stone-900">
                    {event.venue}
                    <br />
                    <span className="font-medium text-stone-500">
                      {event.area}, Dar es Salaam
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-7 border-t border-stone-100 pt-7">
                <h2 className="font-display text-lg font-bold">Tickets</h2>
                <ul className="mt-4 space-y-3">
                  {event.ticketTypes.map((ticket) => {
                    const soldOut = ticket.remaining === 0;
                    return (
                      <li
                        key={ticket.name}
                        className="flex items-center justify-between rounded-2xl bg-neutral-50 px-5 py-4 ring-1 ring-stone-200/70 transition duration-200 hover:ring-stone-300"
                      >
                        <div>
                          <p className="text-sm font-bold text-stone-900">
                            {ticket.name}
                          </p>
                          <p
                            className={`mt-0.5 text-xs font-medium ${
                              soldOut ? "font-semibold text-stone-900" : "text-stone-500"
                            }`}
                          >
                            {soldOut
                              ? "Sold out"
                              : `${ticket.remaining} of ${ticket.total} left`}
                          </p>
                        </div>
                        <span className="font-display text-base font-bold text-stone-900">
                          {formatPrice(ticket.priceTsh)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  type="button"
                  disabled
                  className="mt-7 w-full cursor-not-allowed rounded-full bg-stone-200 px-5 py-4 text-sm font-bold text-stone-500"
                >
                  Checkout opens in a later phase
                </button>
                <p className="mt-4 text-center text-xs leading-relaxed text-stone-400">
                  Secure checkout with mobile money and QR tickets arrives
                  with the ticketing phase.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
