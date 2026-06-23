import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdCard from "@/components/AdCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      return {
        title: "Category Not Found | WrkZone",
        description: "The category you're looking for doesn't exist.",
      };
    }

    // Get ad count separately to avoid query complexity
    const adCount = await prisma.ad.count({
      where: { categoryId: category.id, status: "APPROVED" },
    });

    const categoryName = category.name;
    const url = `https://wrkzone.com/category/${slug}`;

    // Generate SEO-optimized title and description for "Service Near Me" ranking
    const title = `${categoryName} Near Me | Top ${categoryName} Services | WrkZone`;
    const description = `Find trusted ${categoryName} professionals near you on WrkZone. ${adCount}+ verified ${categoryName} service providers ready to help. Get instant quotes.`;
    const keywords = `${categoryName} near me, ${categoryName} services, best ${categoryName}, ${categoryName} professionals, hire ${categoryName}`;

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
        title: `${categoryName} Near Me | ${adCount}+ Services on WrkZone`,
        description: `Hire verified ${categoryName} professionals. Same-day service available.`,
        siteName: "WrkZone",
        images: [
          {
            url: `https://wrkzone.com/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: categoryName,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${categoryName} Near Me - WrkZone`,
        description: `Find ${categoryName} services near you on WrkZone.`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "WrkZone",
      description: "Find local services near you",
    };
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const ads = await prisma.ad.findMany({
    where: { categoryId: category.id, status: "APPROVED" },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Services Near Me`,
    description: `Find trusted ${category.name} professionals near you on WrkZone.`,
    url: `https://wrkzone.com/category/${slug}`,
    image: "https://wrkzone.com/og-image.jpg",
    provider: {
      "@type": "Organization",
      name: "WrkZone",
      url: "https://wrkzone.com",
    },
    mainEntity: {
      "@type": "Service",
      name: category.name,
      description: `${category.name} services available on WrkZone marketplace.`,
      areaServed: "IN",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `https://wrkzone.com/category/${slug}`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: ads.length,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
          style={{ background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)` }}
        >
          <div className="absolute -right-6 -top-6 text-9xl opacity-20">{category.icon}</div>
          <span className="text-5xl">{category.icon}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{category.name}</h1>
          <p className="mt-1 text-ink-soft">
            {ads.length} {ads.length === 1 ? "pro" : "pros"} available near you
          </p>
          <div className="mt-6 max-w-xl">
            <SearchBar />
          </div>
        </div>

        {ads.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl bg-white p-12 text-center ring-1 ring-peach-200">
            <div className="text-5xl">{category.icon}</div>
            <h3 className="mt-4 text-xl font-bold">No {category.name} ads yet</h3>
            <p className="mt-1 text-ink-soft">Be the first to offer this service!</p>
            <Link
              href="/post"
              className="mt-5 inline-block rounded-full sunrise-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sun-500/30"
            >
              Post an ad →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
