"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Advertisement = {
  id: string;
  title: string;
  image: string;
  link: string | null;
  placement: string;
  active: boolean;
};

export default function AdvertisementManager({
  ads,
}: {
  ads: Advertisement[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", link: "", placement: "home" });
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) return setError(data.error || "Upload failed");
    setImage(data.url);
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!image) return setError("Please upload a banner image.");
    setBusy(true);
    const res = await fetch("/api/admin/advertisements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image }),
    });
    setBusy(false);
    if (!res.ok) return setError((await res.json()).error || "Failed");
    setForm({ title: "", link: "", placement: "home" });
    setImage(null);
    router.refresh();
  }

  async function toggle(id: string, active: boolean) {
    await fetch(`/api/admin/advertisements/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this banner ad?")) return;
    await fetch(`/api/admin/advertisements/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={create} className="rounded-2xl bg-white p-5 ring-1 ring-peach-200 shadow-sm">
        <h3 className="font-bold">Create banner advertisement</h3>
        {error && <p className="mt-2 text-sm text-coral-500">{error}</p>}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label>
            <span className="text-sm font-semibold">Title</span>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Promo headline"
              className="mt-1 w-full rounded-xl border border-peach-200 bg-peach-50/40 px-4 py-2.5 text-sm outline-none focus:border-sun-400"
            />
          </label>
          <label>
            <span className="text-sm font-semibold">Link (optional)</span>
            <input
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="/category/cleaning"
              className="mt-1 w-full rounded-xl border border-peach-200 bg-peach-50/40 px-4 py-2.5 text-sm outline-none focus:border-sun-400"
            />
          </label>
          <label>
            <span className="text-sm font-semibold">Placement</span>
            <select
              value={form.placement}
              onChange={(e) => setForm({ ...form, placement: e.target.value })}
              className="mt-1 w-full rounded-xl border border-peach-200 bg-peach-50/40 px-4 py-2.5 text-sm outline-none focus:border-sun-400"
            >
              <option value="home">Home banner</option>
              <option value="sidebar">Sidebar</option>
              <option value="listing">Listing page</option>
            </select>
          </label>
          <label>
            <span className="text-sm font-semibold">Banner image</span>
            <div className="mt-1 flex items-center gap-2">
              <label className="cursor-pointer rounded-xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-peach-200 hover:ring-sun-400">
                {uploading ? "Uploading…" : image ? "Change" : "Upload"}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="h-10 rounded-md" />
              )}
            </div>
          </label>
        </div>
        <button
          disabled={busy || !form.title || !image}
          className="mt-4 rounded-xl sunrise-gradient px-6 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-50"
        >
          {busy ? "Creating…" : "Create banner"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {ads.map((a) => (
          <div key={a.id} className="rounded-2xl bg-white p-4 ring-1 ring-peach-200 shadow-sm">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.image} alt={a.title} className="h-16 w-28 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{a.title}</p>
                <p className="text-xs text-ink-soft">
                  {a.placement} · {a.link || "no link"}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    a.active ? "bg-green-500/15 text-green-600" : "bg-peach-100 text-ink-soft"
                  }`}
                >
                  {a.active ? "Active" : "Hidden"}
                </span>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => toggle(a.id, a.active)}
                  className="rounded-full bg-sky-500/10 px-3 py-1.5 text-xs font-bold text-sky-600 hover:bg-sky-500/20"
                >
                  {a.active ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => remove(a.id)}
                  className="rounded-full bg-coral-500/10 px-3 py-1.5 text-xs font-bold text-coral-500 hover:bg-coral-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {ads.length === 0 && (
          <p className="rounded-2xl bg-white p-8 text-center text-ink-soft ring-1 ring-peach-200">
            No banner ads yet.
          </p>
        )}
      </div>
    </div>
  );
}
