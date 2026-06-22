"use client";

import Link from "next/link";

export default function BecomeVerifiedPro() {
  const benefits = [
    { icon: "⭐", title: "Verified Badge", description: "Build trust with customers" },
    { icon: "📈", title: "Boost Visibility", description: "Get more bookings & leads" },
    { icon: "💰", title: "Earn More", description: "Increase your income potential" },
    { icon: "🔔", title: "Instant Notifications", description: "Real-time booking alerts" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-fb8500 opacity-90"></div>
        
        {/* Decorative Blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4 ring-1 ring-white/30">
                ✨ Limited Time Offer
              </span>

              <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                Become a <span className="text-yellow-300">Verified Pro</span>
              </h2>

              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Join thousands of professionals earning more on WrkZone. Get verified, build credibility, and watch your bookings soar!
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm ring-1 ring-white/20">
                    <div className="text-2xl mb-2">{benefit.icon}</div>
                    <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                    <p className="text-xs text-white/80">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="px-8 py-4 rounded-full bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-center"
                >
                  Register Now
                </Link>
                <Link
                  href="/ads"
                  className="px-8 py-4 rounded-full bg-white/20 text-white font-bold hover:bg-white/30 ring-2 ring-white/50 transition-all backdrop-blur-sm text-center"
                >
                  Browse Services
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-extrabold text-yellow-300">5K+</div>
                  <p className="text-white/80 text-sm mt-1">Verified Professionals</p>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-yellow-300">100K+</div>
                  <p className="text-white/80 text-sm mt-1">Services Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-yellow-300">4.8★</div>
                  <p className="text-white/80 text-sm mt-1">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden md:block relative">
              <div className="bg-gradient-to-br from-white/20 to-white/5 rounded-2xl p-8 backdrop-blur-sm ring-1 ring-white/30">
                <div className="space-y-6">
                  {/* Feature Cards */}
                  {[
                    { emoji: "🎯", title: "Targeted Leads", desc: "Get clients who need your skills" },
                    { emoji: "💼", title: "Professional Profile", desc: "Showcase your best work" },
                    { emoji: "🏆", title: "Top Ratings", desc: "Display your 5-star reviews" },
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 rounded-xl p-4 backdrop-blur-sm ring-1 ring-white/20 transform hover:scale-105 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{feature.emoji}</span>
                        <div>
                          <h4 className="font-bold text-white">{feature.title}</h4>
                          <p className="text-sm text-white/70">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative element */}
                <div className="mt-8 text-6xl text-center opacity-20">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
