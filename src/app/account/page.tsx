import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignOutButton from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Your account — DAR LIFE",
  description: "Your DAR LIFE account details.",
};

export default function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 sm:py-20">
        <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-card sm:p-10">
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight">Your account</h1>

          {/* The signed-in state is read from cookies at request time.
              With Cache Components enabled, request-time reads like this
              must sit inside a <Suspense> boundary so the rest of the
              page can still be prerendered. */}
          <Suspense
            fallback={
              <p className="mt-3 text-sm text-stone-500">
                Checking your sign-in…
              </p>
            }
          >
            <AccountDetails />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

async function AccountDetails() {
  const configured = isSupabaseConfigured();

  let userEmail: string | null = null;
  if (configured) {
    const supabase = await createClient();
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userEmail = user?.email ?? null;
    }
  }

  return (
    <>
          {userEmail ? (
            <>
              <p className="mt-3 text-sm text-stone-500">
                You are signed in as
              </p>
              <p className="mt-1 break-all text-base font-semibold text-stone-900">
                {userEmail}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-stone-500">
                Your tickets, bookings and saved events will live here as the
                next phases of DAR LIFE land.
              </p>
              <div className="mt-6">
                <SignOutButton />
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                {configured
                  ? "You are not signed in."
                  : "You are not signed in — and accounts are not switched on yet, because DAR LIFE is still being connected to its database."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/sign-in"
                  className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-stone-800 hover:shadow active:scale-[0.98]"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition-all duration-200 hover:border-stone-900 hover:bg-stone-50 active:scale-[0.98]"
                >
                  Create an account
                </Link>
              </div>
            </>
          )}
    </>
  );
}
