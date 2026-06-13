import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdCard from "@/components/AdCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

  return (
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
  );
}
