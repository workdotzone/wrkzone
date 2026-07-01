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
      <div className="mt-4 space-y-4">
        {/* Main Profile Card */}
        <div className="rounded-3xl bg-gradient-to-br from-white to-blue-50/50 p-8 ring-1 ring-blue-100 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Profile Info */}
            <div className="flex items-center gap-6 flex-1">
              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full primary-gradient text-3xl font-bold text-white shadow-lg shadow-fb8500/40 flex-shrink-0">
                {session.user.name?.[0]?.toUpperCase()}
              </div>
              
              {/* User Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl font-extrabold text-neutral-900">{session.user.name}</h3>
                  {session.user.role === "ADMIN" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                      🛡️ Admin
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-neutral-600">{session.user.email}</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                  Active member
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="w-full sm:w-auto text-center p-4 rounded-2xl bg-white/60 ring-1 ring-neutral-200">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-fb8500 to-orange-400 bg-clip-text text-transparent">
                60%
              </div>
              <p className="mt-1 text-xs font-semibold text-neutral-600">Profile Complete</p>
              <div className="mt-2 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                <div className="h-full w-3/5 bg-gradient-to-r from-fb8500 to-orange-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-neutral-200 text-center">
            <div className="text-2xl font-extrabold text-fb8500">{ads.length}</div>
            <p className="mt-1 text-xs text-neutral-600 font-medium">Total Ads</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-neutral-200 text-center">
            <div className="text-2xl font-extrabold text-green-600">{liveCount}</div>
            <p className="mt-1 text-xs text-neutral-600 font-medium">Live Ads</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-neutral-200 text-center">
            <div className="text-2xl font-extrabold text-blue-600">{totalViews}</div>
            <p className="mt-1 text-xs text-neutral-600 font-medium">Total Views</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-neutral-200 text-center">
            <div className="text-2xl font-extrabold text-purple-600">5</div>
            <p className="mt-1 text-xs text-neutral-600 font-medium">Rating</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="rounded-full bg-white ring-1 ring-blue-200 px-6 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-sm">
            ✏️ Edit Profile
          </button>
          <button className="rounded-full bg-white ring-1 ring-purple-200 px-6 py-3 text-sm font-bold text-purple-600 hover:bg-purple-50 transition-all duration-300 shadow-sm">
            🔐 Change Password
          </button>
          <button className="rounded-full bg-white ring-1 ring-red-200 px-6 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-all duration-300 shadow-sm">
            🚪 Logout
          </button>
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
