import "@/styles/globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/Navbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Chatbot from "@/components/Chatbot";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parag Naikade | Lead Full Stack Developer",
  description: "Senior Full-Stack Engineer specialising in .NET, React, AWS and Azure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 pt-20 transition-colors duration-300">
            <NavBar />
            <div className="max-w-[1440px] mx-auto w-full">{children}</div>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
            <Chatbot />
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
