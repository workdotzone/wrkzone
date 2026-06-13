import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <div className="text-7xl">🌅</div>
      <h1 className="mt-4 text-4xl font-extrabold">Lost the sunrise?</h1>
      <p className="mt-2 text-ink-soft">
        We couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full sunrise-gradient px-7 py-3 text-sm font-bold text-white shadow-lg shadow-sun-500/30 hover:scale-[1.03] transition"
      >
        Back home →
      </Link>
    </div>
  );
}
