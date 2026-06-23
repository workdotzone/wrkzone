import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AdCard from "@/components/AdCard";
import AdFilters from "@/components/AdFilters";
import SearchBar from "@/components/SearchBar";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

// Generate dynamic metadata for SEO
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    city?: string;
    category?: string;
    sort?: string;
  }>;
}): Promise<Metadata> {
  const sp = await searchParams;

  let title = "Browse Local Services | WrkZone";
  let description =
    "Find verified professionals in your area. Plumbers, electricians, cleaners, and more services available.";
  let keywords = "local services, professionals near me, service providers";
  let url = "https://wrkzone.com/ads";

  // Optimize for City + Category combination (e.g., "Pest Control In Mumbai")
  if (sp.city && sp.category) {
    const categoryName = sp.category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const city = sp.city;

    title = `${categoryName} in ${city} | Verified ${categoryName} Services | WrkZone`;
    description = `Find trusted ${categoryName} professionals in ${city}. Same-day service available. ${categoryName} experts ready to help you.`;
    keywords = `${categoryName} in ${city}, ${categoryName} ${city}, best ${categoryName} ${city}, ${categoryName} services ${city}, hire ${categoryName}`;
    url = `https://wrkzone.com/ads?city=${encodeURIComponent(city)}&category=${sp.category}`;
  } else if (sp.city) {
    title = `Services in ${sp.city} | Verified Local Professionals | WrkZone`;
    description = `Browse verified local services and professionals in ${sp.city}. Quality work guaranteed.`;
    keywords = `services in ${sp.city}, professionals ${sp.city}, local services ${sp.city}`;
    url = `https://wrkzone.com/ads?city=${encodeURIComponent(sp.city)}`;
  } else if (sp.category) {
    const categoryName = sp.category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    title = `${categoryName} Services Near Me | Find Verified ${categoryName} Professionals | WrkZone`;
    description = `Hire verified ${categoryName} professionals near you. Quick response times and quality service.`;
    keywords = `${categoryName}, ${categoryName} near me, ${categoryName} services, best ${categoryName}`;
    url = `https://wrkzone.com/ads?category=${sp.category}`;
  } else if (sp.q) {
    title = `${sp.q} Services Near You | Find Verified ${sp.q} Professionals | WrkZone`;
    description = `Find verified ${sp.q} services near you on WrkZone marketplace. Trusted professionals ready to help.`;
    keywords = `${sp.q}, ${sp.q} near me, ${sp.q} services, hire ${sp.q}`;
    url = `https://wrkzone.com/ads?q=${encodeURIComponent(sp.q)}`;
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title,
      description,
      siteName: "WrkZone",
      images: [
        {
          url: "https://wrkzone.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "WrkZone - Local Services Marketplace",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

type SearchParams = Promise<{
  q?: string;
  city?: string;
  category?: string;
  sort?: string;
}>;

export default async function AdsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const where: Prisma.AdWhereInput = { status: "APPROVED" };
  if (sp.q) {
    where.OR = [
      { title: { contains: sp.q, mode: "insensitive" } },
      { description: { contains: sp.q, mode: "insensitive" } },
    ];
  }
  if (sp.city) where.city = { contains: sp.city, mode: "insensitive" };
  if (sp.category) where.category = { slug: sp.category };

  let orderBy: Prisma.AdOrderByWithRelationInput | Prisma.AdOrderByWithRelationInput[] =
    [{ featured: "desc" }, { createdAt: "desc" }];
  if (sp.sort === "price-low") orderBy = { price: "asc" };
  else if (sp.sort === "price-high") orderBy = { price: "desc" };
  else if (sp.sort === "popular") orderBy = { views: "desc" };

  const [ads, categories] = await Promise.all([
    prisma.ad.findMany({ 
      where, 
      include: { category: true, user: true }, 
      orderBy 
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  // Generate JSON-LD structured data for SEO
  let pageTitle = "Browse Local Services";
  let pageUrl = "https://wrkzone.com/ads";

  if (sp.city && sp.category) {
    pageTitle = `${sp.category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} in ${sp.city}`;
    pageUrl = `https://wrkzone.com/ads?city=${encodeURIComponent(sp.city)}&category=${sp.category}`;
  } else if (sp.city) {
    pageTitle = `Services in ${sp.city}`;
    pageUrl = `https://wrkzone.com/ads?city=${encodeURIComponent(sp.city)}`;
  } else if (sp.category) {
    pageTitle = `${sp.category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Services`;
    pageUrl = `https://wrkzone.com/ads?category=${sp.category}`;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: `Find verified local service professionals on WrkZone. Browse and hire trusted professionals in your area.`,
    url: pageUrl,
    image: "https://wrkzone.com/og-image.jpg",
    provider: {
      "@type": "Organization",
      name: "WrkZone",
      url: "https://wrkzone.com",
      logo: "https://wrkzone.com/logo.png",
    },
    mainEntity: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      offerCount: ads.length,
      offers: ads.slice(0, 10).map((ad) => ({
        "@type": "Offer",
        name: ad.title,
        description: ad.description,
        price: ad.price?.toString() || "Contact for price",
        priceCurrency: "INR",
        seller: {
          "@type": "LocalBusiness",
          name: ad.user?.name || "Service Provider",
          image: ad.image?.[0] || undefined,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-extrabold">Browse services</h1>
      <p className="mt-1 text-ink-soft">
        {ads.length} {ads.length === 1 ? "result" : "results"}
        {sp.q ? ` for “${sp.q}”` : ""}
        {sp.city ? ` in ${sp.city}` : ""}
      </p>

      <div className="mt-6 max-w-2xl">
        <SearchBar />
      </div>

      <div className="mt-8">
        <AdFilters categories={categories} active={sp.category} />
      </div>

      {ads.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-3xl bg-white p-12 text-center ring-1 ring-peach-200">
          <div className="text-5xl">🔎</div>
          <h3 className="mt-4 text-xl font-bold">No ads found</h3>
          <p className="mt-1 text-ink-soft">
            Try a different search or browse another category.
          </p>
        </div>
      )}
      </div>
    </>
  );
}
