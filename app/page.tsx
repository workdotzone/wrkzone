import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SearchBar from "@/components/SearchBar";
import AdCard from "@/components/AdCard";
import PopularServices from "@/components/PopularServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ServiceCatalog from "@/components/ServiceCatalog";
import FAQ from "@/components/FAQ";
import AppPromotion from "@/components/AppPromotion";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, featured, banners, stats] = await Promise.all([
    prisma.category.findMany({
      include: { _count: { select: { ads: { where: { status: "APPROVED" } } } } },
      orderBy: { name: "asc" },
    }),
    prisma.ad.findMany({
      where: { status: "APPROVED" },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 8,
    }),
    prisma.advertisement.findMany({
      where: { active: true, placement: "home" },
      take: 1,
    }),
    Promise.all([
      prisma.ad.count({ where: { status: "APPROVED" } }),
      prisma.user.count(),
      prisma.category.count(),
    ]),
  ]);

  const [adCount, userCount, catCount] = stats;
  const banner = banners[0];

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-fb8500/20 to-slate-900">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fb8500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-fb8500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-fb8500/20 px-4 py-2 mb-6 ring-1 ring-fb8500/40">
            <span className="w-2 h-2 bg-fb8500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-white">WRKZONE'S #1 LOCAL SERVICE MARKETPLACE</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-4">
            Find & Post
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold text-fb8500 mb-6">
            Professional Services
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse verified plumbers, electricians, cleaners & more across all major Indian cities. 100% Free • No Registration • Live in 60 Seconds
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { icon: "🔧", label: "Plumbing" },
              { icon: "⚡", label: "Electrician" },
              { icon: "❄️", label: "AC Repair" },
              { icon: "🧹", label: "Cleaning" },
              { icon: "🐜", label: "Pest Control" },
            ].map((filter) => (
              <button
                key={filter.label}
                className="px-4 py-2 rounded-full bg-fb8500/30 ring-1 ring-fb8500 text-white font-medium hover:bg-fb8500/50 transition-all"
              >
                {filter.icon} {filter.label}
              </button>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-fb8500">{adCount}+</div>
              <p className="text-gray-300 text-sm sm:text-base mt-1">Active Listings</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-fb8500">{catCount}</div>
              <p className="text-gray-300 text-sm sm:text-base mt-1">Service Categories</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-fb8500">100%</div>
              <p className="text-gray-300 text-sm sm:text-base mt-1">Free to Post</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-fb8500">24/7</div>
              <p className="text-gray-300 text-sm sm:text-base mt-1">Always Live</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section id="categories" className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          title="Browse by category"
          subtitle="Pick a service and find the right pro near you"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="card-lift flex flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center ring-1 ring-neutral-200/80 hover:ring-fb8500 transition-all"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                style={{ background: `${c.color}1f` }}
              >
                {c.icon}
              </span>
              <span className="text-sm font-bold leading-tight">{c.name}</span>
              <span className="text-xs text-neutral-500">{c._count.ads} ads</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- BANNER AD ---------- */}
      {banner && (
        <section className="mx-auto max-w-7xl px-6 py-4">
          <Link href={banner.link || "#"} className="block overflow-hidden rounded-3xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner.image} alt={banner.title} className="w-full" />
          </Link>
        </section>
      )}

      {/* ---------- FEATURED ADS ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between">
          <SectionHeading
            title="Fresh listings"
            subtitle="Recently posted services from verified members"
          />
          <Link
            href="/ads"
            className="hidden shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-bold ring-2 ring-neutral-200 hover:ring-fb8500 sm:block transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
        {featured.length === 0 && (
          <p className="mt-8 text-center text-neutral-600">
            No ads yet — be the first to{" "}
            <Link href="/post" className="font-bold text-primary-blue">post one</Link>!
          </p>
        )}
      </section>

      {/* ---------- POPULAR SERVICES ---------- */}
      <PopularServices />

      {/* ---------- STATISTICS ---------- */}
      <Statistics />

      {/* ---------- WHY CHOOSE US ---------- */}
      <WhyChooseUs />

      {/* ---------- TESTIMONIALS ---------- */}
      <Testimonials />

      {/* ---------- PARTNERS ---------- */}
      <Partners />

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading title="How WrkZone works" subtitle="Three simple steps" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { n: "1", e: "📝", t: "Post or search", d: "Create an account and post your service, or search for the help you need." },
            { n: "2", e: "💬", t: "Connect directly", d: "Customers call or message you straight from your ad — no middleman fees." },
            { n: "3", e: "⭐", t: "Get hired & reviewed", d: "Do great work, collect ratings, and grow your local reputation." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-3xl bg-white p-7 ring-1 ring-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full primary-gradient text-sm font-bold text-white shadow">
                {s.n}
              </span>
              <div className="text-4xl">{s.e}</div>
              <h3 className="mt-3 text-lg font-bold text-neutral-800">{s.t}</h3>
              <p className="mt-1 text-sm text-neutral-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- SERVICE CATALOG ---------- */}
      <ServiceCatalog />

      {/* ---------- FAQ ---------- */}
      <FAQ />

      {/* ---------- APP PROMOTION ---------- */}
      <AppPromotion />

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl brand-gradient px-8 py-14 text-center text-white shadow-2xl shadow-fb8500/30">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20" />
          <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/10" />
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/90">
            Join thousands of professionals getting hired every day. Posting your first service takes less than 2 minutes.
          </p>
          <Link
            href="/post"
            className="relative mt-7 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-extrabold text-fb8500 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Post your free ad →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold sunrise-text">{value}</div>
      <div className="text-sm text-ink-soft">{label}</div>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
      <p className="mt-1 text-ink-soft">{subtitle}</p>
    </div>
  );
}
