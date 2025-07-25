import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center py-4 mb-8 border-b">
      <div className="text-xl font-bold">Daniel Buckner</div>
      <ul className="flex space-x-6 text-blue-600">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
