import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const nav = [
    { href: "/admin", label: "Overview", icon: "📊" },
    { href: "/admin/ads", label: "Ads", icon: "📋" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/categories", label: "Categories", icon: "🏷️" },
    { href: "/admin/advertisements", label: "Banner Ads", icon: "📣" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl sunrise-gradient text-xl shadow-lg shadow-sun-500/30">
          🛡️
        </span>
        <div>
          <h1 className="text-2xl font-extrabold">Admin Console</h1>
          <p className="text-sm text-ink-soft">Manage WrkZone</p>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold ring-1 ring-peach-200 hover:ring-sun-400 hover:bg-peach-50 transition"
              >
                <span>{n.icon}</span> {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
