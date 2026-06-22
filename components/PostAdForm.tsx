"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { INDIAN_STATES, getCitiesByState } from "@/lib/locations";

type Category = { id: string; name: string; icon: string };

export default function PostAdForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    categoryId: categories[0]?.id ?? "",
    description: "",
    price: "",
    priceType: "Fixed",
    state: "",
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
        <p className="rounded-xl bg-error/10 px-4 py-3 text-sm font-medium text-error">
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
                    ? "border-fb8500 bg-orange-50 text-fb8500 ring-2 ring-fb8500/30"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-fb8500"
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
            className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50/40 px-4 py-3 text-sm outline-none transition focus:border-fb8500 focus:ring-2 focus:ring-fb8500/30"
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
              className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50/40 px-4 py-3 text-sm outline-none focus:border-fb8500 focus:ring-2 focus:ring-fb8500/30"
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
          <div>
            <Label>State *</Label>
            <select
              value={form.state}
              onChange={(e) => {
                setForm((f) => ({ ...f, state: e.target.value, city: "" }));
              }}
              className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50/40 px-4 py-3 text-sm outline-none focus:border-fb8500 focus:ring-2 focus:ring-fb8500/30"
            >
              <option value="">Select a state</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>City *</Label>
            <select
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50/40 px-4 py-3 text-sm outline-none focus:border-fb8500 focus:ring-2 focus:ring-fb8500/30 disabled:opacity-50"
              disabled={!form.state}
            >
              <option value="">Select a city</option>
              {form.state &&
                getCitiesByState(form.state).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <Input label="Area / Locality" value={form.area} onChange={(v) => setForm((f) => ({ ...f, area: v }))} placeholder="e.g. Andheri West" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Phone *" type="tel" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="9876543210" />
          <Input label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="you@example.com" />
        </div>
      </Group>

      <Group title="Photo (optional)">
        <div className="flex items-center gap-4">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl">📷</span>
            )}
          </div>
          <div>
            <label className="inline-block cursor-pointer rounded-xl bg-white px-5 py-2.5 text-sm font-bold ring-1 ring-neutral-200 hover:ring-primary-blue transition">
              {uploading ? "Uploading..." : image ? "Change photo" : "Upload photo"}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
            </label>
            <p className="mt-2 text-xs text-neutral-600">JPG, PNG or WEBP · up to 4MB</p>
          </div>
        </div>
      </Group>

      <div className="flex items-center gap-3">
        <button
          disabled={loading || uploading}
          className="rounded-full primary-gradient px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-fb8500/40 hover:scale-105 transition-transform duration-300 disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post my ad →"}
        </button>
        <p className="text-xs text-neutral-600">
          Your ad will be reviewed and published shortly.
        </p>
      </div>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-neutral-200 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-neutral-800">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold text-neutral-800">{children}</span>;
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
        className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50/40 px-4 py-3 text-sm outline-none transition focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30"
      />
    </label>
  );
}
