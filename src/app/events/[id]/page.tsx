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
    <div className="flex min-h-screen flex-col bg-[#f7f7f7] text-stone-900">
      <Navbar />

      <main className="flex-1">
        {/* Cover */}
        <div
          className={`flex h-64 items-end bg-gradient-to-br sm:h-80 ${event.imageGradient}`}
        >
          <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
            <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {event.category}
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link
            href="/#events"
            className="text-sm font-semibold text-stone-900 hover:underline"
          >
            ← Back to events
          </Link>

          <div className="mt-4 grid gap-10 lg:grid-cols-3">
            {/* Main column */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                {event.title}
              </h1>
              <p className="mt-3 text-base font-medium text-stone-500">
                Organised by {event.organiser}
              </p>

              <div className="mt-8">
                <h2 className="text-lg font-extrabold">About this event</h2>
                <p className="mt-3 leading-relaxed text-stone-600">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Booking column */}
            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/70">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-bold uppercase tracking-wide text-stone-400">
                    Date & time
                  </dt>
                  <dd className="mt-1 font-semibold text-stone-900">
                    {formatDate(event.date)}
                    <br />
                    {event.timeLabel}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-wide text-stone-400">
                    Venue
                  </dt>
                  <dd className="mt-1 font-semibold text-stone-900">
                    {event.venue}
                    <br />
                    <span className="font-medium text-stone-500">
                      {event.area}, Dar es Salaam
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-stone-100 pt-6">
                <h2 className="text-base font-extrabold">Tickets</h2>
                <ul className="mt-4 space-y-3">
                  {event.ticketTypes.map((ticket) => {
                    const soldOut = ticket.remaining === 0;
                    return (
                      <li
                        key={ticket.name}
                        className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 ring-1 ring-stone-200/60"
                      >
                        <div>
                          <p className="text-sm font-bold text-stone-900">
                            {ticket.name}
                          </p>
                          <p
                            className={`text-xs font-medium ${
                              soldOut ? "font-semibold text-stone-900" : "text-stone-500"
                            }`}
                          >
                            {soldOut
                              ? "Sold out"
                              : `${ticket.remaining} of ${ticket.total} left`}
                          </p>
                        </div>
                        <span className="text-sm font-extrabold text-stone-900">
                          {formatPrice(ticket.priceTsh)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  type="button"
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-full bg-stone-300 px-5 py-3.5 text-sm font-bold text-stone-500"
                >
                  Checkout opens in a later phase
                </button>
                <p className="mt-3 text-center text-xs text-stone-400">
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
