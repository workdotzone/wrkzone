import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, timeAgo } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import DeleteAdButton from "@/components/DeleteAdButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/dashboard");

  const ads = await prisma.ad.findMany({
    where: { userId: session.user.id },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const totalViews = ads.reduce((s, a) => s + a.views, 0);
  const liveCount = ads.filter((a) => a.status === "APPROVED").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">
            Hi {session.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-ink-soft">Here&apos;s how your ads are doing.</p>
        </div>
        <Link
          href="/post"
          className="rounded-full sunrise-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sun-500/30 hover:scale-[1.02] transition"
        >
          + Post new ad
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <StatCard label="Total ads" value={ads.length} icon="📋" />
        <StatCard label="Live ads" value={liveCount} icon="✅" />
        <StatCard label="Total views" value={totalViews} icon="👁️" />
      </div>

      {/* Ads list */}
      <h2 className="mt-10 text-xl font-bold">My ads</h2>
      {ads.length === 0 ? (
        <div className="mt-4 rounded-3xl bg-white p-12 text-center ring-1 ring-peach-200">
          <div className="text-5xl">📭</div>
          <h3 className="mt-4 text-lg font-bold">No ads yet</h3>
          <p className="mt-1 text-ink-soft">Post your first ad and start getting hired!</p>
          <Link
            href="/post"
            className="mt-5 inline-block rounded-full sunrise-gradient px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sun-500/30"
          >
            Post an ad →
          </Link>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-peach-200 shadow-sm"
            >
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl text-2xl"
                style={{ background: `${ad.category.color}1f` }}
              >
                {ad.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ad.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  ad.category.icon
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link href={`/ads/${ad.id}`} className="truncate font-bold hover:text-sun-600">
                    {ad.title}
                  </Link>
                  <StatusBadge status={ad.status} />
                </div>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {ad.category.name} · {formatPrice(ad.price, ad.priceType)} · 👁️ {ad.views} · {timeAgo(ad.createdAt)}
                </p>
              </div>
              <DeleteAdButton id={ad.id} />
            </div>
          ))}
        </div>
      )}

      {/* Profile card */}
      <h2 className="mt-10 text-xl font-bold">My profile</h2>
      <div className="mt-4 rounded-3xl bg-white p-6 ring-1 ring-peach-200 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full sunrise-gradient text-2xl font-bold text-white">
            {session.user.name?.[0]?.toUpperCase()}
          </span>
          <div>
            <p className="text-lg font-bold">{session.user.name}</p>
            <p className="text-sm text-ink-soft">{session.user.email}</p>
            {session.user.role === "ADMIN" && (
              <span className="mt-1 inline-block rounded-full bg-sky-500/15 px-2.5 py-0.5 text-xs font-bold text-sky-600">
                🛡️ Admin
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-peach-200 shadow-sm">
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 text-2xl font-extrabold sunrise-text">{value}</div>
      <div className="text-sm text-ink-soft">{label}</div>
    </div>
  );
}
