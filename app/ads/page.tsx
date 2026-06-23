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

  if (sp.q) {
    title = `${sp.q} Services | WrkZone`;
    description = `Find verified ${sp.q} services near you on WrkZone marketplace.`;
  }
  if (sp.city) {
    title = `Services in ${sp.city} | WrkZone`;
    description = `Browse local services and verified professionals in ${sp.city}.`;
  }

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `https://wrkzone.com/ads`,
      title,
      description,
      siteName: "WrkZone",
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
    prisma.ad.findMany({ where, include: { category: true }, orderBy }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
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
  );
}
