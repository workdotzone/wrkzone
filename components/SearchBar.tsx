"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { POPULAR_METRO_CITIES } from "@/lib/locations";

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
      className={`flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-neutral-200 sm:flex-row ${
        large ? "sm:rounded-full" : ""
      }`}
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <span className="text-lg">🔍</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What service do you need? e.g. Plumber, AC repair"
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-neutral-600/60"
        />
      </div>
      <div className="flex items-center gap-2 border-t border-neutral-100 px-3 sm:border-l sm:border-t-0">
        <span className="text-lg">📍</span>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-neutral-600/60 sm:w-32"
        >
          <option value="">All Cities</option>
          {POPULAR_METRO_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded-xl primary-gradient px-7 py-3 text-sm font-bold text-white shadow-lg shadow-fb8500/40 hover:scale-105 transition-transform duration-300 sm:rounded-full"
      >
        Search
      </button>
    </form>
  );
}
