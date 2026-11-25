import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-[1.35rem] font-bold tracking-tight text-red-600">
          DAR <span className="underline decoration-2 underline-offset-4">LIFE</span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-medium text-stone-600 md:flex">
          <Link href="/#events" className="transition-colors duration-200 hover:text-stone-900">
            Events
          </Link>
          <Link href="/experiences" className="transition-colors duration-200 hover:text-stone-900">
            Experiences
          </Link>
          <Link href="/#vendors" className="transition-colors duration-200 hover:text-stone-900">
            Vendors
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/sign-in"
            className="hidden px-2 py-2 text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-stone-900 sm:block"
          >
            Sign in
          </Link>
          <Link
            href="#"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-stone-800 hover:shadow active:scale-[0.98]"
          >
            Create event
          </Link>
        </div>
      </div>
    </header>
  );
}
