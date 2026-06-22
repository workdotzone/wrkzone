"use client";

import Link from "next/link";

interface ServiceCategory {
  name: string;
  icon: string;
  slug: string;
  services: Array<{
    name: string;
    slug: string;
  }>;
}

const serviceCategories: ServiceCategory[] = [
  {
    name: "Home Cleaning",
    icon: "🧹",
    slug: "home-cleaning",
    services: [
      { name: "Regular Cleaning", slug: "regular-cleaning" },
      { name: "Deep Cleaning", slug: "deep-cleaning" },
      { name: "Post-Construction", slug: "post-construction" },
      { name: "Carpet Cleaning", slug: "carpet-cleaning" },
    ],
  },
  {
    name: "Repairs",
    icon: "🔧",
    slug: "repairs",
    services: [
      { name: "Plumbing", slug: "plumbing" },
      { name: "Electrician", slug: "electrician" },
      { name: "Carpentry", slug: "carpentry" },
      { name: "Appliance Repair", slug: "appliance-repair" },
    ],
  },
  {
    name: "Beauty & Wellness",
    icon: "💆",
    slug: "beauty-wellness",
    services: [
      { name: "Hair Services", slug: "hair-services" },
      { name: "Massage Therapy", slug: "massage" },
      { name: "Spa Services", slug: "spa" },
      { name: "Salon", slug: "salon" },
    ],
  },
  {
    name: "Moving & Storage",
    icon: "📦",
    slug: "moving-storage",
    services: [
      { name: "House Moving", slug: "house-moving" },
      { name: "Office Moving", slug: "office-moving" },
      { name: "Packing & Unpacking", slug: "packing" },
      { name: "Storage", slug: "storage" },
    ],
  },
];

export default function ServiceCatalog() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Complete Service <span className="primary-text">Catalog</span>
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Explore all available services and their sub-categories
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {serviceCategories.map((category) => (
          <div
            key={category.slug}
            className="rounded-2xl bg-gradient-to-br from-white to-orange-50 p-6 ring-1 ring-orange-100 hover:ring-fb8500 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{category.icon}</span>
              <h3 className="text-2xl font-extrabold text-neutral-800">
                {category.name}
              </h3>
            </div>

            <div className="space-y-2">
              {category.services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/category/${service.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-white hover:bg-orange-50 transition group"
                >
                  <span className="text-neutral-700 group-hover:text-fb8500 font-medium">
                    {service.name}
                  </span>
                  <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href={`/category/${category.slug}`}
              className="mt-4 w-full block text-center py-2 rounded-lg text-fb8500 font-semibold border-2 border-fb8500 hover:bg-fb8500 hover:text-white transition"
            >
              View all in {category.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-neutral-600 mb-4">Can't find what you're looking for?</p>
        <Link
          href="/post"
          className="inline-block px-8 py-3 rounded-full primary-gradient text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Post your service request
        </Link>
      </div>
    </section>
  );
}
