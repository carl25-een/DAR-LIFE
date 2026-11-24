"use client";

// DAR LIFE — shared email + password form for /sign-in and /sign-up.
//
// Talks to Supabase Auth through the browser client. When Supabase is not
// configured yet (no env vars), the form explains that sign-in is not
// switched on yet instead of failing. After a successful sign-in or
// sign-up with an active session, the user is sent to /account.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const supabase = createClient();
    if (!supabase) {
      setError(
        "Accounts are not switched on yet — DAR LIFE is still being connected to its database. Please check back soon.",
      );
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        if (data.session) {
          router.push("/account");
          router.refresh();
        } else {
          setNotice(
            "Account created — please check your email to confirm it, then sign in.",
          );
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        router.push("/account");
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/20";

  return (
    <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-black tracking-tight">
        {isSignUp ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-stone-500">
        {isSignUp
          ? "Join DAR LIFE to book tickets and experiences across Dar es Salaam."
          : "Sign in to manage your DAR LIFE bookings and tickets."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-stone-900"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-semibold text-stone-900"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClasses}
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        {notice && (
          <p className="rounded-xl bg-stone-100 px-4 py-3 text-sm font-medium text-stone-700">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? isSignUp
              ? "Creating account…"
              : "Signing in…"
            : isSignUp
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-500">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-red-600 hover:underline"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to DAR LIFE?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-red-600 hover:underline"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
