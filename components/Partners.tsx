"use client";

export default function Partners() {
  const partners = [
    { name: "TechCorp", emoji: "💻", color: "from-blue-600 to-blue-400" },
    { name: "BuildCo", emoji: "🏗️", color: "from-fb8500 to-ffb81c" },
    { name: "GreenLiving", emoji: "🌱", color: "from-blue-600 to-blue-400" },
    { name: "SafeGuard", emoji: "🔒", color: "from-fb8500 to-ffb81c" },
    { name: "QuickServe", emoji: "⚡", color: "from-blue-600 to-blue-400" },
    { name: "ProCare", emoji: "👨‍⚕️", color: "from-fb8500 to-ffb81c" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50 opacity-60 blur-3xl pointer-events-none" />
      
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-fb8500/20 rounded-full border border-fb8500/30 mb-4">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">
            🤝 Industry Partners
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Trusted By <span className="bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">Leading Brands</span>
        </h2>
        <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Partnering with companies across India to deliver exceptional services
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {partners.map((partner, idx) => (
          <div
            key={partner.name}
            className="group relative"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-300`} />
            
            {/* Card */}
            <div className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm ring-2 ring-white/50 group-hover:ring-fb8500/50 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full">
              {/* Accent top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${partner.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              {/* Emoji */}
              <div className="text-6xl mb-4 transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2">
                {partner.emoji}
              </div>
              
              {/* Name */}
              <p className="text-base font-bold text-neutral-900 text-center group-hover:text-fb8500 transition-colors">
                {partner.name}
              </p>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-fb8500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
