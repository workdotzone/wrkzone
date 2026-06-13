"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (city.trim()) params.set("city", city.trim());
    router.push(`/ads?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className={`flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-peach-200 sm:flex-row ${
        large ? "sm:rounded-full" : ""
      }`}
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <span className="text-lg">🔍</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What service do you need? e.g. Plumber, AC repair"
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ink-soft/60"
        />
      </div>
      <div className="flex items-center gap-2 border-t border-peach-100 px-3 sm:border-l sm:border-t-0">
        <span className="text-lg">📍</span>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ink-soft/60 sm:w-28"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl sunrise-gradient px-7 py-3 text-sm font-bold text-white shadow-lg shadow-sun-500/30 hover:scale-[1.02] transition sm:rounded-full"
      >
        Search
      </button>
    </form>
  );
}
