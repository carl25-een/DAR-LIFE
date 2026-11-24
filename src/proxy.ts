// DAR LIFE — session refresh proxy.
//
// Next 16 renamed "middleware" to "proxy": this file runs before a
// request completes. Its one job is to keep the Supabase auth session
// fresh — it reads the session cookie, asks Supabase to validate/refresh
// it, and writes any refreshed cookies onto the response, following the
// @supabase/ssr guidance for Next.js.
//
// When Supabase is not configured yet (no env vars), it simply passes the
// request through untouched, so the site works exactly as before.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT (per @supabase/ssr guidance): do not run code between
  // creating the client and this call — it can cause hard-to-debug
  // random logouts. getUser() revalidates the token with Supabase.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Run on all paths except static files and images:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico and common image files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
