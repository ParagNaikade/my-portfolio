import Head from "next/head";
import NavBar from "./Navbar";
import GoogleAnalytics from "./GoogleAnalytics";

export default function Layout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen bg-gray-50 text-gray-800 p-6 pt-20">
        <NavBar />
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </main>
    </>
  );
}
