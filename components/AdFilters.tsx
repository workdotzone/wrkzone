"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Category = { id: string; name: string; slug: string; icon: string };

export default function AdFilters({
  categories,
  active,
}: {
  categories: Category[];
  active?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  function setCat(slug: string) {
    const p = new URLSearchParams(params.toString());
    if (slug) p.set("category", slug);
    else p.delete("category");
    router.push(`/ads?${p.toString()}`);
  }

  function setSort(value: string) {
    const p = new URLSearchParams(params.toString());
    p.set("sort", value);
    router.push(`/ads?${p.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Chip label="All" activeState={!active} onClick={() => setCat("")} />
        {categories.map((c) => (
          <Chip
            key={c.id}
            label={`${c.icon} ${c.name}`}
            activeState={active === c.slug}
            onClick={() => setCat(c.slug)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-neutral-600">Sort:</span>
        <select
          defaultValue={params.get("sort") || "newest"}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-fb8500"
        >
          <option value="newest">Newest first</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="popular">Most viewed</option>
        </select>
      </div>
    </div>
  );
}

function Chip({
  label,
  activeState,
  onClick,
}: {
  label: string;
  activeState: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        activeState
          ? "primary-gradient text-white shadow-md shadow-fb8500/30"
          : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:ring-fb8500"
      }`}
    >
      {label}
    </button>
  );
}
