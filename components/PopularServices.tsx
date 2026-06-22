import Link from "next/link";

const services = [
  { icon: "🔧", name: "Plumbing", slug: "plumbing" },
  { icon: "⚡", name: "Electrician", slug: "electrician" },
  { icon: "❄️", name: "AC Repair", slug: "ac-repair" },
  { icon: "🧹", name: "Cleaning", slug: "cleaning" },
  { icon: "🐜", name: "Pest Control", slug: "pest-control" },
  { icon: "🎨", name: "Painting", slug: "painting" },
  { icon: "🪵", name: "Carpentry", slug: "carpentry" },
  { icon: "📦", name: "Movers", slug: "movers" },
];

export default function PopularServices() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Popular <span className="primary-text">Services</span>
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Browse our most requested services and find the perfect professional for your needs
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/category/${service.slug}`}
            className="group card-lift rounded-2xl bg-gradient-to-br from-white to-orange-50 p-6 text-center ring-1 ring-orange-100 hover:ring-fb8500 transition-all duration-300"
          >
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{service.icon}</div>
            <h3 className="font-bold text-neutral-800 group-hover:text-fb8500 transition">{service.name}</h3>
            <p className="text-xs text-neutral-500 mt-1">Book now →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
