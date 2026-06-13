import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [users, totalAds, pending, approved, categories, banners, recent] =
    await Promise.all([
      prisma.user.count(),
      prisma.ad.count(),
      prisma.ad.count({ where: { status: "PENDING" } }),
      prisma.ad.count({ where: { status: "APPROVED" } }),
      prisma.category.count(),
      prisma.advertisement.count(),
      prisma.ad.findMany({
        include: { category: true, user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);

  const stats = [
    { label: "Total users", value: users, icon: "👥", href: "/admin/users" },
    { label: "Total ads", value: totalAds, icon: "📋", href: "/admin/ads" },
    { label: "Pending review", value: pending, icon: "⏳", href: "/admin/ads?status=PENDING" },
    { label: "Live ads", value: approved, icon: "✅", href: "/admin/ads" },
    { label: "Categories", value: categories, icon: "🏷️", href: "/admin/categories" },
    { label: "Banner ads", value: banners, icon: "📣", href: "/admin/advertisements" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="card-lift rounded-2xl bg-white p-5 ring-1 ring-peach-200 shadow-sm"
          >
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-2 text-3xl font-extrabold sunrise-text">{s.value}</div>
            <div className="text-sm text-ink-soft">{s.label}</div>
          </Link>
        ))}
      </div>

      {pending > 0 && (
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-sun-400/15 p-5 ring-1 ring-sun-400/30">
          <p className="font-semibold text-sun-600">
            ⏳ {pending} ad(s) waiting for your review
          </p>
          <Link
            href="/admin/ads?status=PENDING"
            className="rounded-full sunrise-gradient px-5 py-2 text-sm font-bold text-white"
          >
            Review now →
          </Link>
        </div>
      )}

      <h2 className="mt-8 text-xl font-bold">Recent ads</h2>
      <div className="mt-4 space-y-3">
        {recent.map((ad) => (
          <div
            key={ad.id}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-peach-200 shadow-sm"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
              style={{ background: `${ad.category.color}1f` }}
            >
              {ad.category.icon}
            </span>
            <div className="min-w-0 flex-1">
              <Link href={`/ads/${ad.id}`} className="truncate font-bold hover:text-sun-600">
                {ad.title}
              </Link>
              <p className="text-sm text-ink-soft">
                by {ad.user.name} · {timeAgo(ad.createdAt)}
              </p>
            </div>
            <StatusBadge status={ad.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
