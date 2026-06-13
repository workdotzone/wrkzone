"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  _count: { ads: number };
};

const EMOJIS = ["🔧", "❄️", "🐜", "🧹", "💡", "🔨", "🎨", "🔌", "🌿", "📦", "💇", "📹", "🚗", "🛠️", "🪛", "🧰"];
const COLORS = ["#f59e0b", "#3b82f6", "#06b6d4", "#84cc16", "#ec4899", "#8b5cf6", "#22c55e", "#f43f5e"];

export default function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🛠️");
  const [color, setColor] = useState("#f59e0b");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, icon, color }),
    });
    setBusy(false);
    if (!res.ok) {
      setError((await res.json()).error || "Failed");
      return;
    }
    setName("");
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this category and all its ads?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={add} className="rounded-2xl bg-white p-5 ring-1 ring-peach-200 shadow-sm">
        <h3 className="font-bold">Add a category</h3>
        {error && <p className="mt-2 text-sm text-coral-500">{error}</p>}
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="flex-1">
            <span className="text-sm font-semibold">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Roof Repair"
              className="mt-1 w-full rounded-xl border border-peach-200 bg-peach-50/40 px-4 py-2.5 text-sm outline-none focus:border-sun-400"
            />
          </label>
          <button
            disabled={busy || !name}
            className="rounded-xl sunrise-gradient px-6 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-50"
          >
            Add
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {EMOJIS.map((e) => (
            <button
              type="button"
              key={e}
              onClick={() => setIcon(e)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition ${
                icon === e ? "bg-peach-100 ring-2 ring-sun-400" : "ring-1 ring-peach-200"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              style={{ background: c }}
              className={`h-8 w-8 rounded-lg transition ${
                color === c ? "ring-2 ring-offset-2 ring-ink" : ""
              }`}
            />
          ))}
        </div>
      </form>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-2 rounded-2xl bg-white p-4 ring-1 ring-peach-200 shadow-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                style={{ background: `${c.color}1f` }}
              >
                {c.icon}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold">{c.name}</p>
                <p className="text-xs text-ink-soft">{c._count.ads} ads</p>
              </div>
            </div>
            <button
              onClick={() => remove(c.id)}
              className="shrink-0 rounded-full bg-coral-500/10 px-2.5 py-1 text-xs font-bold text-coral-500 hover:bg-coral-500/20"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
