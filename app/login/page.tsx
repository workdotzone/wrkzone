"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-peach-200">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl sunrise-gradient text-2xl shadow-lg shadow-sun-500/30">
            🌅
          </span>
          <h1 className="mt-4 text-2xl font-extrabold">Welcome back!</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Log in to manage your ads and bookings.
          </p>
        </div>

        {error && (
          <p className="mt-5 rounded-xl bg-coral-500/10 px-4 py-3 text-sm font-medium text-coral-500">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          <button
            disabled={loading}
            className="w-full rounded-xl sunrise-gradient py-3 text-sm font-bold text-white shadow-lg shadow-sun-500/30 hover:scale-[1.01] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          New to WrkZone?{" "}
          <Link href="/register" className="font-bold text-sun-600">
            Create an account
          </Link>
        </p>

        <div className="mt-6 rounded-xl bg-peach-50 p-4 text-xs text-ink-soft">
          <p className="font-bold text-ink">Demo accounts</p>
          <p className="mt-1">👤 User: rahul@wrkzone.com / user123</p>
          <p>🛡️ Admin: admin@wrkzone.com / admin123</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-ink-soft">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}

export function Field({
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
      <span className="text-sm font-semibold text-ink">{label}</span>
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
