import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice, timeAgo } from "@/lib/utils";
import AdCard from "@/components/AdCard";

export const dynamic = "force-dynamic";

export default async function AdDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ad = await prisma.ad.findUnique({
    where: { id },
    include: {
      category: true,
      user: { select: { name: true, city: true, createdAt: true } },
      reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!ad || ad.status !== "APPROVED") notFound();

  // increment views (fire and forget)
  await prisma.ad.update({ where: { id }, data: { views: { increment: 1 } } });

  const related = await prisma.ad.findMany({
    where: { categoryId: ad.categoryId, status: "APPROVED", id: { not: ad.id } },
    include: { category: true },
    take: 4,
  });

  const avgRating =
    ad.reviews.length > 0
      ? (ad.reviews.reduce((s, r) => s + r.rating, 0) / ad.reviews.length).toFixed(1)
      : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-soft">
        <Link href="/ads" className="hover:text-sun-600">Ads</Link>
        <span>/</span>
        <Link href={`/category/${ad.category.slug}`} className="hover:text-sun-600">
          {ad.category.name}
        </Link>
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-peach-200 shadow-sm">
            <div className="relative h-72 sm:h-96">
              {ad.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ad.image} alt={ad.title} className="h-full w-full object-cover" />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-8xl"
                  style={{ background: `linear-gradient(135deg, ${ad.category.color}22, ${ad.category.color}44)` }}
                >
                  {ad.category.icon}
                </div>
              )}
              {ad.featured && (
                <span className="absolute left-4 top-4 rounded-full bg-coral-500 px-3 py-1.5 text-xs font-bold text-white shadow">
                  ⭐ Featured
                </span>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{ background: ad.category.color }}
              >
                {ad.category.icon} {ad.category.name}
              </span>
              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">{ad.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
                <span>📍 {ad.area ? `${ad.area}, ` : ""}{ad.city}</span>
                <span>👁️ {ad.views} views</span>
                <span>🕒 {timeAgo(ad.createdAt)}</span>
              </div>

              <div className="mt-6 border-t border-peach-100 pt-6">
                <h2 className="text-lg font-bold">Description</h2>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-ink-soft">
                  {ad.description}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-peach-200 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Reviews {avgRating && <span className="text-sun-600">⭐ {avgRating}</span>}
              </h2>
              <span className="text-sm text-ink-soft">{ad.reviews.length} review(s)</span>
            </div>
            {ad.reviews.length === 0 ? (
              <p className="mt-3 text-sm text-ink-soft">No reviews yet. Be the first to hire and review!</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {ad.reviews.map((r) => (
                  <li key={r.id} className="rounded-2xl bg-peach-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{r.user.name}</span>
                      <span className="text-sun-600">{"⭐".repeat(r.rating)}</span>
                    </div>
                    {r.comment && <p className="mt-1 text-sm text-ink-soft">{r.comment}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sidebar — contact */}
        <aside className="space-y-5">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-peach-200 shadow-sm">
            <p className="text-sm text-ink-soft">Price</p>
            <p className="text-3xl font-extrabold sunrise-text">
              {formatPrice(ad.price, ad.priceType)}
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={`tel:${ad.phone}`}
                className="flex items-center justify-center gap-2 rounded-xl sunrise-gradient py-3.5 text-sm font-bold text-white shadow-lg shadow-sun-500/30 hover:scale-[1.02] transition"
              >
                📞 Call {ad.phone}
              </a>
              <a
                href={`https://wa.me/91${ad.phone}?text=Hi, I saw your ad "${encodeURIComponent(ad.title)}" on WrkZone`}
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white hover:scale-[1.02] transition"
              >
                💬 WhatsApp
              </a>
              {ad.email && (
                <a
                  href={`mailto:${ad.email}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold ring-1 ring-peach-200 hover:ring-sun-400 transition"
                >
                  ✉️ Email
                </a>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 ring-1 ring-peach-200 shadow-sm">
            <h3 className="font-bold">About the provider</h3>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full sunrise-gradient text-lg font-bold text-white">
                {ad.user.name[0]}
              </span>
              <div>
                <p className="font-bold">{ad.user.name}</p>
                <p className="text-sm text-ink-soft">
                  {ad.user.city || ad.city} · Member since {new Date(ad.user.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-sky-500/10 p-5 text-sm text-ink-soft ring-1 ring-sky-500/20">
            <p className="font-bold text-sky-600">🛡️ Stay safe</p>
            <p className="mt-1">Meet in person, verify the work, and never pay in full upfront.</p>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold">Similar services</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <AdCard key={r.id} ad={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
