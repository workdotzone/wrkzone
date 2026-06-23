import Link from "next/link";
import type { Metadata } from "next";
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

// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: "WrkZone — Find Trusted Local Services & Post Free Ads | #1 Marketplace in India",
  description:
    "Discover verified plumbers, electricians, cleaners & 100+ local services near you. Post your services free on India's most trusted local services marketplace. No registration required!",
  keywords: [
    "local services",
    "handymen",
    "plumber near me",
    "electrician",
    "pest control",
    "cleaning services",
    "classified ads",
    "service provider",
    "India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://wrkzone.com",
    title: "WrkZone — Find Trusted Local Services & Post Free Ads",
    description: "India's #1 local services marketplace. Find verified professionals or post your services free!",
    siteName: "WrkZone",
    images: [
      {
        url: "https://wrkzone.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "WrkZone - Local Services Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WrkZone — Find Trusted Local Services",
    description: "India's leading local services marketplace",
    creator: "@WrkZone",
    images: ["https://wrkzone.com/twitter-image.png"],
  },
};

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
      <section className="mx-auto max-w-7xl px-6 py-20 relative">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-fb8500 opacity-95 rounded-3xl" />

          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5 rounded-3xl" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} 
          />

          {/* Content */}
          <div className="relative z-10 px-8 sm:px-12 py-16 sm:py-24 text-center">
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-bold mb-6 ring-1 ring-white/30">
              <span className="text-white">🚀 Ready to Start?</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ready to Grow Your <span className="text-yellow-300">Business</span>?
            </h2>

            <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals getting hired every day on WrkZone. Posting your first service takes less than 2 minutes—completely free and no hidden fees.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-14 max-w-md mx-auto">
              {[
                { number: "5K+", label: "Verified Pros" },
                { number: "100K+", label: "Services" },
                { number: "4.8★", label: "Rating" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 ring-1 ring-white/20">
                  <div className="text-2xl font-bold text-yellow-300">{stat.number}</div>
                  <div className="text-xs text-white/80 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/post"
              className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-200 text-blue-900 font-extrabold text-lg shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:from-white hover:to-yellow-100"
            >
              Post Your Free Ad Today →
            </Link>

            {/* Secondary CTA */}
            <p className="text-white/80 mt-8">
              Need help?{" "}
              <Link href="/post" className="text-yellow-300 font-bold hover:text-white transition-colors">
                See how it works
              </Link>
            </p>
          </div>
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
