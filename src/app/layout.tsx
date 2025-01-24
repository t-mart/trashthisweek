import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Plausible from "@/components/Plausible";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Trash This Week",
  description: "Figure out if its recycling or just trash this week.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-prose mx-auto p-8`}
        className={`antialiased max-w-prose mx-auto p-8`}
      >
        <Plausible />
        <header>
          <h1 className="text-center mb-12 text-xl tracking-tight">
            Trash This Week
          </h1>
          <p>{process.env.FOO ?? "dunno"}</p>
        </header>
        <main>{children}</main>
        <footer className="mt-16">
          <p className="flex flex-row flex-wrap gap-2 text-muted-foreground justify-center text-center">
            <span>Tim Martin</span>
            <span className="select-none">•</span>
            <a
              className="hover:underline"
              href="https://github.com/t-mart/trashthisweek"
            >
              Source Code
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
