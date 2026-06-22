import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SearchBar from "@/components/SearchBar";
import AdCard from "@/components/AdCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import AppPromotion from "@/components/AppPromotion";
import BrowseByCategory from "@/components/BrowseByCategory";
import TopMetroCities from "@/components/TopMetroCities";

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
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900">
        <div className="absolute inset-0 -z-10">
          {/* Orange accent blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-fb8500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-fb8500/15 rounded-full blur-3xl" />
          {/* Blue accent blobs */}
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-slate-900/50" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-28 text-center relative z-10">
          {/* Badge with both colors */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700/40 to-fb8500/40 px-4 py-2 mb-6 ring-2 ring-fb8500/60 backdrop-blur-sm">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-fb8500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-white">🚀 WRKZONE'S #1 LOCAL SERVICE MARKETPLACE</span>
          </div>

          {/* Heading - Main in White */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-2 leading-tight">
            Find & Post
          </h1>
          
          {/* Heading - Accent with Blue & Orange */}
          <div className="mb-8">
            <span className="text-5xl sm:text-6xl font-bold">
              <span className="text-blue-400">Professional</span>
              <span className="text-fb8500"> Services</span>
            </span>
          </div>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto font-medium">
            Browse verified plumbers, electricians, cleaners & more across all major Indian cities. 
            <span className="block mt-2">
              <span className="text-fb8500 font-bold">100% Free</span> 
              <span className="text-white"> • </span>
              <span className="text-blue-300 font-bold">No Registration</span> 
              <span className="text-white"> • </span>
              <span className="text-fb8500 font-bold">Live in 60 Seconds</span>
            </span>
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="drop-shadow-2xl">
              <SearchBar large />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BROWSE BY CATEGORY ---------- */}
      <BrowseByCategory />

      {/* ---------- TOP METRO CITIES ---------- */}
      <TopMetroCities />

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
