import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { timeAgo, formatPrice } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import AdActions from "@/components/admin/AdActions";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminAds({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const where: Prisma.AdWhereInput = {};
  if (sp.status && ["PENDING", "APPROVED", "REJECTED"].includes(sp.status)) {
    where.status = sp.status as "PENDING" | "APPROVED" | "REJECTED";
  }

  const ads = await prisma.ad.findMany({
    where,
    include: { category: true, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const filters = [
    { label: "All", value: "" },
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">Manage ads ({ads.length})</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={`/admin/ads${f.value ? `?status=${f.value}` : ""}`}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              (sp.status || "") === f.value
                ? "sunrise-gradient text-white"
                : "bg-white text-ink-soft ring-1 ring-peach-200 hover:ring-sun-400"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="rounded-2xl bg-white p-4 ring-1 ring-peach-200 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-xl"
                style={{ background: `${ad.category.color}1f` }}
              >
                {ad.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ad.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  ad.category.icon
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/ads/${ad.id}`} className="font-bold hover:text-sun-600">
                    {ad.title}
                  </Link>
                  <StatusBadge status={ad.status} />
                </div>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {ad.category.name} · {formatPrice(ad.price, ad.priceType)} · {ad.city} · 👁️ {ad.views}
                </p>
                <p className="text-xs text-ink-soft">
                  by {ad.user.name} ({ad.user.email}) · {timeAgo(ad.createdAt)}
                </p>
              </div>
            </div>
            <div className="mt-3 border-t border-peach-100 pt-3">
              <AdActions id={ad.id} status={ad.status} featured={ad.featured} />
            </div>
          </div>
        ))}
        {ads.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-center text-ink-soft ring-1 ring-peach-200">
            No ads in this view.
          </p>
        )}
      </div>
    </div>
  );
}
