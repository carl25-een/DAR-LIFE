import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-3">
        <div>
          <p className="font-display text-[1.35rem] font-bold tracking-tight text-red-500">
            DAR <span className="underline decoration-2 underline-offset-4">LIFE</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
            What's happening in Dar es Salaam — events, experiences and the
            people who make them happen.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white">
            Explore
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/#events" className="transition-colors duration-200 hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link href="/#experiences" className="transition-colors duration-200 hover:text-white">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/#vendors" className="transition-colors duration-200 hover:text-white">
                Vendors
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white">
            Dar es Salaam, Tanzania
          </p>
          <ul className="mt-5 space-y-3 text-sm text-stone-400">
            <li>About DAR LIFE</li>
            <li>For organisers</li>
            <li>Help & contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500">
        © 2026 DAR LIFE · Dar es Salaam, Tanzania
      </div>
    </footer>
  );
}
