"use client";

import Link from "next/link";

export default function BrowseByCategory() {
  const categories = [
    { icon: "🔧", name: "Plumbing", slug: "plumbing" },
    { icon: "⚡", name: "Electrician", slug: "electrician" },
    { icon: "❄️", name: "AC Repair", slug: "ac-repair" },
    { icon: "🧹", name: "Cleaning", slug: "cleaning" },
    { icon: "🐜", name: "Pest Control", slug: "pest-control" },
    { icon: "🎨", name: "Painting", slug: "painting" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-2">
          Browse by Category
        </h2>
        <p className="text-neutral-500 text-lg">Choose from our curated services</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group bg-white rounded-2xl p-8 text-center ring-1 ring-neutral-200 hover:ring-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
            <h3 className="font-bold text-neutral-900 text-lg">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
