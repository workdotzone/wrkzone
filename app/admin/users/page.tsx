import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/utils";
import UserActions from "@/components/admin/UserActions";

export const dynamic = "force-dynamic";

export default async function AdminUsers() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany({
    include: { _count: { select: { ads: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="text-xl font-bold">Users ({users.length})</h2>
      <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-peach-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-peach-50 text-left text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="hidden px-4 py-3 sm:table-cell">Role</th>
              <th className="hidden px-4 py-3 md:table-cell">Ads</th>
              <th className="hidden px-4 py-3 lg:table-cell">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-peach-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full sunrise-gradient text-xs font-bold text-white">
                      {u.name[0]?.toUpperCase()}
                    </span>
                    <div>
                      <p className="font-bold">{u.name}</p>
                      <p className="text-xs text-ink-soft">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      u.role === "ADMIN"
                        ? "bg-sky-500/15 text-sky-600"
                        : "bg-peach-100 text-ink-soft"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="hidden px-4 py-3 md:table-cell">{u._count.ads}</td>
                <td className="hidden px-4 py-3 lg:table-cell text-ink-soft">
                  {timeAgo(u.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <UserActions id={u.id} role={u.role} isSelf={u.id === session?.user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
