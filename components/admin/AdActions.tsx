"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdActions({
  id,
  status,
  featured,
}: {
  id: string;
  status: string;
  featured: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function patch(body: object) {
    setBusy(true);
    await fetch(`/api/ads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusy(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this ad permanently?")) return;
    setBusy(true);
    await fetch(`/api/ads/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status !== "APPROVED" && (
        <button
          onClick={() => patch({ status: "APPROVED" })}
          disabled={busy}
          className="rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-bold text-green-600 hover:bg-green-500/25 transition disabled:opacity-50"
        >
          ✓ Approve
        </button>
      )}
      {status !== "REJECTED" && (
        <button
          onClick={() => patch({ status: "REJECTED" })}
          disabled={busy}
          className="rounded-full bg-coral-500/10 px-3 py-1.5 text-xs font-bold text-coral-500 hover:bg-coral-500/20 transition disabled:opacity-50"
        >
          ✕ Reject
        </button>
      )}
      <button
        onClick={() => patch({ featured: !featured })}
        disabled={busy}
        className={`rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-50 ${
          featured
            ? "bg-sun-400/25 text-sun-600"
            : "bg-white text-ink-soft ring-1 ring-peach-200 hover:ring-sun-400"
        }`}
      >
        {featured ? "★ Featured" : "☆ Feature"}
      </button>
      <button
        onClick={remove}
        disabled={busy}
        className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink-soft ring-1 ring-peach-200 hover:text-coral-500 transition disabled:opacity-50"
      >
        🗑 Delete
      </button>
    </div>
  );
}
