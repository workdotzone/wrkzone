import { prisma } from "@/lib/prisma";
import AdCard from "@/components/AdCard";
import AdFilters from "@/components/AdFilters";
import SearchBar from "@/components/SearchBar";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

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
      { title: { contains: sp.q } },
      { description: { contains: sp.q } },
    ];
  }
  if (sp.city) where.city = { contains: sp.city };
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
