import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-black tracking-tight text-red-600">
          DAR <span className="underline decoration-2 underline-offset-4">LIFE</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
          <Link href="/#events" className="transition hover:text-stone-900">
            Events
          </Link>
          <Link href="/experiences" className="transition hover:text-stone-900">
            Experiences
          </Link>
          <Link href="/#vendors" className="transition hover:text-stone-900">
            Vendors
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="hidden text-sm font-medium text-stone-600 transition hover:text-stone-900 sm:block"
          >
            Sign in
          </Link>
          <Link
            href="#"
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Create event
          </Link>
        </div>
      </div>
    </header>
  );
}
