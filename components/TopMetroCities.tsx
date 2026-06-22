"use client";

import Link from "next/link";

export default function TopMetroCities() {
  const cities = [
    { emoji: "🏙️", name: "Mumbai", state: "Maharashtra", areas: 16 },
    { emoji: "🏛️", name: "Delhi", state: "Delhi", areas: 16 },
    { emoji: "🌴", name: "Bangalore", state: "Karnataka", areas: 16 },
    { emoji: "💎", name: "Hyderabad", state: "Telangana", areas: 14 },
    { emoji: "🎭", name: "Chennai", state: "Tamil Nadu", areas: 14 },
    { emoji: "🏰", name: "Kolkata", state: "West Bengal", areas: 10 },
    { emoji: "🎓", name: "Pune", state: "Maharashtra", areas: 12 },
    { emoji: "🌻", name: "Ahmedabad", state: "Gujarat", areas: 11 },
    { emoji: "🏰", name: "Jaipur", state: "Rajasthan", areas: 8 },
    { emoji: "🌊", name: "Surat", state: "Gujarat", areas: 8 },
    { emoji: "🎪", name: "Lucknow", state: "Uttar Pradesh", areas: 8 },
    { emoji: "🌴", name: "Kochi", state: "Kerala", areas: 8 },
    { emoji: "🏖️", name: "Goa", state: "Goa", areas: 6 },
    { emoji: "🧡", name: "Indore", state: "Madhya Pradesh", areas: 7 },
    { emoji: "🌸", name: "Bhopal", state: "Madhya Pradesh", areas: 7 },
    { emoji: "📍", name: "Patna", state: "Bihar", areas: 6 },
    { emoji: "🎪", name: "Vadodara", state: "Gujarat", areas: 6 },
    { emoji: "🌟", name: "Coimbatore", state: "Tamil Nadu", areas: 6 },
    { emoji: "🏛️", name: "Nagpur", state: "Maharashtra", areas: 6 },
    { emoji: "🌾", name: "Thiruvananthapuram", state: "Kerala", areas: 5 },
    { emoji: "🎯", name: "Chandigarh", state: "Chandigarh", areas: 5 },
    { emoji: "🚀", name: "Mohali", state: "Punjab", areas: 5 },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-2">
            Top Metro Cities
          </h2>
          <p className="text-neutral-500 text-lg">Hyper-local listings near you</p>
        </div>
        <Link
          href="/ads"
          className="text-blue-600 hover:text-blue-700 font-semibold hidden sm:block"
        >
          All Cities →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {cities.map((city) => (
          <Link
            key={city.name}
            href={`/ads?city=${encodeURIComponent(city.name)}`}
            className="group bg-white rounded-2xl p-6 text-center ring-1 ring-neutral-200 hover:ring-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{city.emoji}</div>
            <h3 className="font-bold text-neutral-900 text-lg leading-tight">{city.name}</h3>
            <p className="text-xs text-neutral-500 mt-1">{city.state}</p>
            <p className="text-xs text-blue-500 mt-2 font-semibold">📍 {city.areas} areas</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8 sm:hidden">
        <Link
          href="/ads"
          className="text-blue-600 hover:text-blue-700 font-semibold inline-block"
        >
          All Cities →
        </Link>
      </div>
    </section>
  );
}
