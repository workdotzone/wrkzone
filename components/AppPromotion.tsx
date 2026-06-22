"use client";

import Link from "next/link";

export default function AppPromotion() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="bg-gradient-to-r from-fb8500 to-ffb81c rounded-3xl p-10 sm:p-16 text-white">
        <div className="grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Get the app on your phone
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Book services on the go, get notifications, and manage your profile anywhere with our mobile app
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#"
                className="inline-block bg-black rounded-lg px-6 py-3 font-semibold hover:bg-neutral-900 transition"
              >
                📱 App Store
              </Link>
              <Link
                href="#"
                className="inline-block bg-black rounded-lg px-6 py-3 font-semibold hover:bg-neutral-900 transition"
              >
                🤖 Google Play
              </Link>
            </div>
          </div>
          <div className="text-6xl text-center opacity-80">
            📲✨
          </div>
        </div>
      </div>
    </section>
  );
}
