import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

// Body font — clean, neutral, highly legible at every size.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display font — geometric and editorial; used for headings, the
// wordmark and prices to give DAR LIFE its premium voice.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAR LIFE — What's happening in Dar es Salaam?",
  description:
    "Discover events, book experiences and buy tickets in Dar es Salaam, Tanzania — concerts, nightlife, brunch, fashion, festivals and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-stone-900">
        {children}
      </body>
    </html>
  );
}
