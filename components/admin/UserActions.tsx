"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserActions({
  id,
  role,
  isSelf,
}: {
  id: string;
  role: string;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleRole() {
    setBusy(true);
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: role === "ADMIN" ? "USER" : "ADMIN" }),
    });
    setBusy(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this user and all their ads?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert((await res.json()).error || "Failed");
  }

  if (isSelf) {
    return <span className="text-xs font-semibold text-ink-soft">That&apos;s you</span>;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleRole}
        disabled={busy}
        className="rounded-full bg-sky-500/10 px-3 py-1.5 text-xs font-bold text-sky-600 hover:bg-sky-500/20 transition disabled:opacity-50"
      >
        {role === "ADMIN" ? "↓ Make user" : "↑ Make admin"}
      </button>
      <button
        onClick={remove}
        disabled={busy}
        className="rounded-full bg-coral-500/10 px-3 py-1.5 text-xs font-bold text-coral-500 hover:bg-coral-500/20 transition disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
