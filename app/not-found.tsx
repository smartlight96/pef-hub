import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>

      <p className="mt-4 text-zinc-400">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
      >
        Go Home
      </Link>
    </main>
  );
}