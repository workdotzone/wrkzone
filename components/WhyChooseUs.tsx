"use client";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "✓",
      title: "Verified Professionals",
      description: "All service providers are thoroughly vetted and certified",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive bidding ensures you get the best rates available",
    },
    {
      icon: "⭐",
      title: "Quality Guaranteed",
      description: "100% satisfaction or your money back guarantee",
    },
    {
      icon: "🚀",
      title: "Quick Booking",
      description: "Book services in minutes and get professionals to your door",
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "Your data and payments are protected with industry-leading security",
    },
    {
      icon: "📱",
      title: "24/7 Support",
      description: "Round-the-clock customer support whenever you need assistance",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Why Choose <span className="primary-text">WrkZone</span>?
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          We connect you with trusted professionals who deliver exceptional results
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 ring-1 ring-orange-100 hover:ring-fb8500 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-4xl mb-4 bg-gradient-to-br from-fb8500 to-ffb81c bg-clip-text text-transparent">
              {reason.icon}
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-2">{reason.title}</h3>
            <p className="text-sm text-neutral-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
