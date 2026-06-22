"use client";

export default function Partners() {
  const partners = [
    { name: "TechCorp", emoji: "💻" },
    { name: "BuildCo", emoji: "🏗️" },
    { name: "GreenLiving", emoji: "🌱" },
    { name: "SafeGuard", emoji: "🔒" },
    { name: "QuickServe", emoji: "⚡" },
    { name: "ProCare", emoji: "👨‍⚕️" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Trusted By <span className="primary-text">Leading Brands</span>
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Partnering with companies across India to deliver exceptional services
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white ring-1 ring-orange-100 hover:ring-fb8500 hover:shadow-md transition-all duration-300 group"
          >
            <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">
              {partner.emoji}
            </div>
            <p className="text-sm font-semibold text-neutral-700 text-center">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
