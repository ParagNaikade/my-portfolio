import Head from "next/head";
import NavBar from "./Navbar";
import GoogleAnalytics from "./GoogleAnalytics";

export default function Layout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 pt-20 transition-colors duration-300">
        <NavBar />
        <div className="max-w-[1440px] mx-auto w-full">{children}</div>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </main>
    </>
  );
}
