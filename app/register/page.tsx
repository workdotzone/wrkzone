"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field } from "../login/page";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(key: keyof typeof form) {
    return (v: string) => setForm((f) => ({ ...f, [key]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Registration failed.");
      setLoading(false);
      return;
    }
    // auto login
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-peach-200">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl sunrise-gradient text-2xl shadow-lg shadow-sun-500/30">
            ✨
          </span>
          <h1 className="mt-4 text-2xl font-extrabold">Create your account</h1>
          <p className="mt-1 text-sm text-ink-soft">
            It&apos;s free — start posting ads in minutes.
          </p>
        </div>

        {error && (
          <p className="mt-5 rounded-xl bg-coral-500/10 px-4 py-3 text-sm font-medium text-coral-500">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Full name *" value={form.name} onChange={set("name")} placeholder="Rahul Sharma" />
          <Field label="Email *" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
          <Field label="Password *" type="password" value={form.password} onChange={set("password")} placeholder="Min 6 characters" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="9876543210" />
            <Field label="City" value={form.city} onChange={set("city")} placeholder="Mumbai" />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-xl sunrise-gradient py-3 text-sm font-bold text-white shadow-lg shadow-sun-500/30 hover:scale-[1.01] transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-sun-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
