"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAdButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function remove() {
    if (!confirm("Delete this ad? This cannot be undone.")) return;
    setLoading(true);
    const res = await fetch(`/api/ads/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) router.refresh();
    else alert("Could not delete ad.");
  }

  return (
    <button
      onClick={remove}
      disabled={loading}
      className="rounded-full bg-coral-500/10 px-4 py-2 text-xs font-bold text-coral-500 hover:bg-coral-500/20 transition disabled:opacity-50"
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
