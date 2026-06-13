"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = { id: string; name: string; icon: string };

export default function PostAdForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    categoryId: categories[0]?.id ?? "",
    description: "",
    price: "",
    priceType: "Fixed",
    city: "",
    area: "",
    phone: "",
    email: "",
  });
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(key: K) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setError(data.error || "Upload failed.");
      return;
    }
    setImage(data.url);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Could not post ad.");
      return;
    }
    router.push("/dashboard?posted=1");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <p className="rounded-xl bg-coral-500/10 px-4 py-3 text-sm font-medium text-coral-500">
          {error}
        </p>
      )}

      <Group title="What service are you offering?">
        <Input label="Ad title *" value={form.title} onChange={set("title")} placeholder="e.g. Expert Plumber — 24/7 Emergency Service" />
        <div>
          <Label>Category *</Label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => set("categoryId")(c.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                  form.categoryId === c.id
                    ? "border-sun-400 bg-peach-100 text-sun-600 ring-2 ring-sun-400/30"
                    : "border-peach-200 bg-white text-ink-soft hover:border-sun-400"
                }`}
              >
                <span>{c.icon}</span> {c.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>Description *</Label>
          <textarea
            value={form.description}
            onChange={(e) => set("description")(e.target.value)}
            rows={5}
            placeholder="Describe your service, experience, what's included, and why customers should pick you..."
            className="mt-1.5 w-full rounded-xl border border-peach-200 bg-peach-50/40 px-4 py-3 text-sm outline-none transition focus:border-sun-400 focus:ring-2 focus:ring-sun-400/30"
          />
        </div>
      </Group>

      <Group title="Pricing">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Price (₹)" type="number" value={form.price} onChange={set("price")} placeholder="499" />
          <div>
            <Label>Price type</Label>
            <select
              value={form.priceType}
              onChange={(e) => set("priceType")(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-peach-200 bg-peach-50/40 px-4 py-3 text-sm outline-none focus:border-sun-400 focus:ring-2 focus:ring-sun-400/30"
            >
              <option>Fixed</option>
              <option>Hourly</option>
              <option>Negotiable</option>
            </select>
          </div>
        </div>
      </Group>

      <Group title="Location & contact">
        <div className="grid grid-cols-2 gap-3">
          <Input label="City *" value={form.city} onChange={set("city")} placeholder="Mumbai" />
          <Input label="Area / Locality" value={form.area} onChange={set("area")} placeholder="Andheri West" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Phone *" value={form.phone} onChange={set("phone")} placeholder="9876543210" />
          <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
        </div>
      </Group>

      <Group title="Photo (optional)">
        <div className="flex items-center gap-4">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-peach-200 bg-peach-50">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl">📷</span>
            )}
          </div>
          <div>
            <label className="inline-block cursor-pointer rounded-xl bg-white px-5 py-2.5 text-sm font-bold ring-1 ring-peach-200 hover:ring-sun-400 transition">
              {uploading ? "Uploading..." : image ? "Change photo" : "Upload photo"}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
            </label>
            <p className="mt-2 text-xs text-ink-soft">JPG, PNG or WEBP · up to 4MB</p>
          </div>
        </div>
      </Group>

      <div className="flex items-center gap-3">
        <button
          disabled={loading || uploading}
          className="rounded-full sunrise-gradient px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-sun-500/30 hover:scale-[1.02] transition disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post my ad →"}
        </button>
        <p className="text-xs text-ink-soft">
          Your ad will be reviewed and published shortly.
        </p>
      </div>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-peach-200 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold text-ink">{children}</span>;
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-peach-200 bg-peach-50/40 px-4 py-3 text-sm outline-none transition focus:border-sun-400 focus:ring-2 focus:ring-sun-400/30"
      />
    </label>
  );
}
