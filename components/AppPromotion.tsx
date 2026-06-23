"use client";

import Link from "next/link";

export default function AppPromotion() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative overflow-hidden rounded-3xl">
        {/* Background gradient with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-fb8500 opacity-95" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Decorative animated blobs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-20 w-64 h-64 bg-yellow-300/5 rounded-full blur-3xl animate-bounce" style={{animationDelay: "0.5s"}} />

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/30 to-white/10 rounded-full text-sm font-bold mb-8 ring-1 ring-white/40 text-white backdrop-blur-sm hover:from-white/40 hover:to-white/20 transition-all">
                <span className="text-lg animate-bounce">📱</span>
                <span>Download Our Mobile App</span>
              </div>

              <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
                Take <span className="bg-gradient-to-r from-yellow-300 to-fb8500 bg-clip-text text-transparent">WrkZone</span> 
                <br />
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text">In Your Pocket</span>
              </h2>

              <p className="text-lg text-white/90 mb-10 leading-relaxed font-medium">
                Never miss a job opportunity. Book services instantly, get real-time updates, and manage everything from our powerful mobile app—available on iOS and Android.
              </p>

              {/* Premium Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                {[
                  { icon: "⚡", text: "Instant Booking", subtext: "In seconds" },
                  { icon: "🔔", text: "Live Alerts", subtext: "Real-time updates" },
                  { icon: "📍", text: "Find Nearby", subtext: "Professionals near you" },
                  { icon: "💬", text: "Direct Chat", subtext: "Instant messaging" },
                ].map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20 hover:bg-white/20 hover:ring-white/40 transition-all hover:scale-105 transform hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <div className="font-bold text-white text-sm">{feature.text}</div>
                    <div className="text-xs text-white/70">{feature.subtext}</div>
                  </div>
                ))}
              </div>

              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://apps.apple.com"
                  target="_blank"
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-white to-yellow-50 text-blue-900 font-bold hover:shadow-2xl hover:shadow-white/20 transition-all shadow-lg hover:scale-110 flex items-center justify-center gap-3 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  <span className="text-xl">🍎</span>
                  <span className="relative">App Store</span>
                </Link>
                <Link
                  href="https://play.google.com"
                  target="_blank"
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-400/20 text-white font-bold hover:from-blue-400/50 hover:to-cyan-400/40 ring-2 ring-white/50 transition-all backdrop-blur-sm flex items-center justify-center gap-3 hover:scale-110"
                >
                  <span className="text-xl">🔵</span>
                  <span>Google Play</span>
                </Link>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden md:flex justify-center items-center relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-fb8500/20 to-transparent rounded-3xl blur-2xl" />
              
              {/* Phone mockup container */}
              <div className="relative group">
                {/* Dynamic shadow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/30 to-fb8500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />
                
                {/* Phone frame */}
                <div className="relative bg-gradient-to-br from-blue-950 to-black rounded-3xl p-3 w-80 h-96 shadow-2xl border border-white/10">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20" />
                  
                  {/* Screen content */}
                  <div className="w-full h-full bg-gradient-to-b from-blue-900 via-blue-800 to-black rounded-2xl flex flex-col items-center justify-center overflow-hidden relative">
                    {/* Screen glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-fb8500/20 via-transparent to-transparent" />
                    
                    <div className="relative z-10 text-center">
                      <div className="text-7xl mb-6 animate-bounce">📲</div>
                      <div>
                        <p className="text-white font-extrabold text-2xl mb-2">WrkZone</p>
                        <p className="text-white/80 text-sm font-medium">Your work companion</p>
                      </div>
                      
                      {/* Animated bars */}
                      <div className="mt-8 flex gap-2 justify-center">
                        <div className="w-1 h-12 bg-gradient-to-t from-fb8500 to-yellow-300 rounded-full animate-pulse" />
                        <div className="w-1 h-16 bg-gradient-to-t from-fb8500 to-yellow-300 rounded-full animate-pulse delay-100" />
                        <div className="w-1 h-10 bg-gradient-to-t from-fb8500 to-yellow-300 rounded-full animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
