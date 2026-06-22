"use client";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "✓",
      title: "Verified Professionals",
      description: "All service providers are thoroughly vetted and certified",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive bidding ensures you get the best rates available",
      gradient: "from-fb8500 to-ffb81c",
    },
    {
      icon: "⭐",
      title: "Quality Guaranteed",
      description: "100% satisfaction or your money back guarantee",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: "🚀",
      title: "Quick Booking",
      description: "Book services in minutes and get professionals to your door",
      gradient: "from-fb8500 to-ffb81c",
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "Your data and payments are protected with industry-leading security",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: "📱",
      title: "24/7 Support",
      description: "Round-the-clock customer support whenever you need assistance",
      gradient: "from-fb8500 to-ffb81c",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-60 blur-3xl pointer-events-none" />
      
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-fb8500/20 rounded-full border border-fb8500/30 mb-4">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">
            ⭐ Why WrkZone is Your Best Choice
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Why Choose <span className="bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">WrkZone</span>?
        </h2>
        <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          We connect you with trusted professionals who deliver exceptional results. Experience the difference with India's most trusted service marketplace.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Gradient background for each card */}
            <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-10 transition-opacity group-hover:opacity-15`} />
            
            {/* Card body */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 ring-2 ring-white/50 group-hover:ring-2 group-hover:ring-fb8500/50 shadow-sm group-hover:shadow-xl transition-all">
              {/* Icon container with gradient background */}
              <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${reason.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="text-3xl">{reason.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-fb8500 transition-colors">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-700 leading-relaxed text-base">
                {reason.description}
              </p>

              {/* Accent line on hover */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-fb8500 w-0 group-hover:w-full transition-all duration-300 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-fb8500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
