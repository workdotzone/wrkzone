"use client";

import Link from "next/link";

export default function AppPromotion() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-50/50 via-white to-orange-50/50 opacity-60 blur-3xl pointer-events-none" />

      <div className="relative overflow-hidden rounded-3xl">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-fb8500 opacity-95" />

        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-bold mb-6 ring-1 ring-white/30 text-white">
                📱 Download Now
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Take WrkZone <span className="text-yellow-300">In Your Pocket</span>
              </h2>

              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Book services on the go, get instant notifications, manage your profile, and track jobs—all from our powerful mobile app. Available for iOS and Android.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-10">
                {[
                  { icon: "⚡", text: "Book services instantly" },
                  { icon: "🔔", text: "Get real-time notifications" },
                  { icon: "📍", text: "Track service professionals near you" },
                  { icon: "💬", text: "Direct messaging with professionals" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://apps.apple.com"
                  target="_blank"
                  className="px-8 py-4 rounded-full bg-white text-blue-900 font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🍎</span>
                  App Store
                </Link>
                <Link
                  href="https://play.google.com"
                  target="_blank"
                  className="px-8 py-4 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 ring-2 ring-white/50 transition-all backdrop-blur-sm flex items-center justify-center gap-2 hover:scale-105"
                >
                  <span className="text-xl">🔵</span>
                  Google Play
                </Link>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                {/* Phone mockup glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-fb8500/30 rounded-3xl blur-3xl" />

                {/* Phone */}
                <div className="relative bg-gradient-to-br from-white/20 to-white/10 rounded-3xl p-6 backdrop-blur-sm ring-1 ring-white/20 w-80 h-96 flex flex-col items-center justify-center">
                  <div className="text-8xl mb-6">📲</div>
                  <div className="text-center">
                    <p className="text-white font-bold text-xl mb-2">WrkZone App</p>
                    <p className="text-white/80 text-sm">Service at your fingertips</p>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 h-1 bg-gradient-to-r from-yellow-300 to-fb8500 rounded-full opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
