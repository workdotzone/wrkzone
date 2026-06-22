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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-fb8500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-ffd60a/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-fb8500/3 rounded-full blur-2xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-semibold text-fb8500 ring-1 ring-orange-200">
                ⚙️ 5,000+ professionals ready to help
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Find trusted <span className="primary-text">professionals</span> 
                <br /> in minutes.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-neutral-600">
                Plumbers, AC technicians, electricians, cleaners, pest control & more — post a job or get hired on WrkZone, your friendly local marketplace.
              </p>

              <div className="mt-8 max-w-xl">
                <SearchBar large />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/post"
                  className="rounded-full primary-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fb8500/40 hover:scale-105 transition-transform duration-300"
                >
                  Post your service free →
                </Link>
                <Link
                  href="/ads"
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold ring-2 ring-neutral-200 hover:ring-fb8500 transition-colors duration-300"
                >
                  Browse all ads
                </Link>
              </div>

              <div className="mt-10 flex gap-8">
                <Stat value={`${adCount}+`} label="Active ads" />
                <Stat value={`${userCount}+`} label="Members" />
                <Stat value={`${catCount}`} label="Categories" />
              </div>
            </div>

            {/* Hero art */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 animate-float">
                <div className="absolute right-10 top-0 flex h-28 w-28 items-center justify-center rounded-3xl primary-gradient text-5xl shadow-2xl shadow-fb8500/30">
                  🔧
                </div>
              </div>
              <div className="mx-auto grid max-w-md grid-cols-2 gap-4 pt-6">
                {[
                  { e: "❄️", t: "AC Repair", c: "#fb8500" },
                  { e: "🧹", t: "Cleaning", c: "#ffd60a" },
                  { e: "💡", t: "Electrician", c: "#ffb81c" },
                  { e: "🐜", t: "Pest Control", c: "#fb8500" },
                ].map((x, i) => (
                  <div
                    key={x.t}
                    className="card-lift rounded-3xl bg-white p-6 text-center shadow-lg ring-1 ring-neutral-200"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                      style={{ background: `${x.c}22` }}
                    >
                      {x.e}
                    </div>
                    <p className="mt-3 font-bold">{x.t}</p>
                    <p className="text-xs text-neutral-500">Top rated pros</p>
                  </div>
                ))}
              </div>
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
