"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 glass border-b border-neutral-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo.png" 
              alt="WrkZone Logo" 
              width={110} 
              height={110}
              className="group-hover:scale-110 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/ads">Browse Ads</NavLink>
            <NavLink href="/#categories">Categories</NavLink>
            <NavLink href="/about">How it works</NavLink>
            {isAdmin && <NavLink href="/admin">Admin</NavLink>}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/post"
              className="rounded-full primary-gradient px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-fb8500/40 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              + Post Ad
            </Link>
            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold shadow-sm hover:shadow-md ring-1 ring-neutral-200 transition-all"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full primary-gradient text-white text-xs font-bold">
                    {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                  {session.user?.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium text-neutral-600 hover:text-fb8500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full primary-gradient px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-fb8500/40 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg primary-gradient text-white font-bold text-lg"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span>{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1 animate-fade-up">
            <NavLink href="/ads" onClick={() => setOpen(false)}>Browse Ads</NavLink>
            <NavLink href="/#categories" onClick={() => setOpen(false)}>Categories</NavLink>
            <NavLink href="/about" onClick={() => setOpen(false)}>How it works</NavLink>
            {isAdmin && <NavLink href="/admin" onClick={() => setOpen(false)}>Admin</NavLink>}
            <Link
              href="/post"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full primary-gradient px-5 py-3 text-center text-sm font-bold text-white"
            >
              + Post Ad
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-xl bg-neutral-100 px-4 py-3 text-sm font-semibold ring-1 ring-neutral-200">
                  My Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-coral-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl bg-white px-4 py-3 text-sm font-bold ring-1 ring-peach-200 text-center">
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-fb8500 hover:bg-orange-50 transition-all duration-300"
    >
      {children}
    </Link>
  );
}
