import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in — DAR LIFE",
  description: "Sign in to your DAR LIFE account.",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-14 sm:px-6">
        <AuthForm mode="sign-in" />
      </main>
      <Footer />
    </div>
  );
}
