import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create an account — DAR LIFE",
  description: "Create a DAR LIFE account to book events and experiences in Dar es Salaam.",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 sm:py-20">
        <AuthForm mode="sign-up" />
      </main>
      <Footer />
    </div>
  );
}
