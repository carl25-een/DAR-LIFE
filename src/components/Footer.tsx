import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-xl font-black tracking-tight text-white">
            DAR <span className="underline decoration-2 underline-offset-4">LIFE</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-400">
            What's happening in Dar es Salaam — events, experiences and the
            people who make them happen.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/#events" className="transition hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link href="/#experiences" className="transition hover:text-white">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/#vendors" className="transition hover:text-white">
                Vendors
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">
            Dar es Salaam, Tanzania
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone-400">
            <li>About DAR LIFE</li>
            <li>For organisers</li>
            <li>Help & contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-5 text-center text-xs text-stone-500">
        © 2026 DAR LIFE · Dar es Salaam, Tanzania
      </div>
    </footer>
  );
}
