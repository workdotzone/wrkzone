"use client";

export default function Statistics() {
  const stats = [
    { number: "500K+", label: "Happy Customers", icon: "😊" },
    { number: "100%", label: "Quality Guarantee", icon: "✓" },
    { number: "5K+", label: "Service Partners", icon: "👥" },
    { number: "100K+", label: "Services Completed", icon: "✅" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-5xl md:text-6xl mb-4">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-extrabold primary-text mb-2">
              {stat.number}
            </div>
            <p className="text-neutral-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
