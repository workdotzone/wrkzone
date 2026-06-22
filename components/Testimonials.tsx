"use client";

import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      city: "Mumbai",
      rating: 5,
      text: "Excellent plumbing service! The professional was courteous, efficient, and fixed the issue promptly. Highly recommended!",
      service: "Plumbing",
      avatar: "👩‍💼",
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "Rajesh Kumar",
      city: "Bangalore",
      rating: 5,
      text: "AC repair was done perfectly. Great communication throughout and very professional approach. Will book again!",
      service: "AC Repair",
      avatar: "👨‍💼",
      color: "from-fb8500 to-ffb81c",
    },
    {
      name: "Anita Desai",
      city: "Delhi",
      rating: 5,
      text: "The cleaning service was thorough and the team was very polite. My house looks brand new now!",
      service: "Home Cleaning",
      avatar: "👩‍💼",
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "Vikram Patel",
      city: "Pune",
      rating: 5,
      text: "Electrician did excellent work. Very knowledgeable and completed the job on time with quality results.",
      service: "Electrician",
      avatar: "👨‍💼",
      color: "from-fb8500 to-ffb81c",
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-50/50 via-white to-orange-50/50 opacity-60 blur-3xl pointer-events-none" />
      
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-fb8500/20 rounded-full border border-fb8500/30 mb-4">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">
            ⭐ Customer Testimonials
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          What Our <span className="bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">Customers Say</span>
        </h2>
        <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Join thousands of satisfied customers who have found trusted professionals on WrkZone
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main testimonial card */}
        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-5 rounded-3xl blur-2xl group-hover:opacity-10 transition-opacity`} />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 sm:p-12 ring-2 ring-white/50 group-hover:ring-fb8500/50 shadow-lg group-hover:shadow-2xl transition-all duration-300">
            {/* Quote icon */}
            <div className="absolute -top-4 -left-4 text-6xl opacity-20">"</div>
            
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-2xl animate-pulse">⭐</span>
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-lg sm:text-xl text-neutral-800 mb-10 leading-relaxed font-serif italic">
              "{testimonial.text}"
            </p>

            {/* Customer info */}
            <div className="flex items-center gap-4 pb-8 border-b border-neutral-200 group-hover:border-fb8500/30 transition-colors">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl shadow-lg`}>
                {testimonial.avatar}
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900">{testimonial.name}</h3>
                <p className="text-sm text-neutral-600">
                  📍 {testimonial.city} • <span className="font-semibold text-fb8500">{testimonial.service}</span>
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-gradient-to-br from-blue-600/10 to-fb8500/10 hover:from-blue-600/20 hover:to-fb8500/20 transition-all group/btn"
              >
                <span className="text-2xl group-hover/btn:scale-125 transition-transform">←</span>
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-3 rounded-full transition-all ${
                      idx === current 
                        ? "bg-gradient-to-r from-blue-600 to-fb8500 w-8" 
                        : "bg-neutral-300 w-3 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={next}
                className="p-3 rounded-full bg-gradient-to-br from-blue-600/10 to-fb8500/10 hover:from-blue-600/20 hover:to-fb8500/20 transition-all group/btn"
              >
                <span className="text-2xl group-hover/btn:scale-125 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer name tabs */}
        <div className="grid grid-cols-4 gap-3 mt-10">
          {testimonials.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`p-4 rounded-xl font-semibold text-center transition-all duration-300 ${
                idx === current
                  ? `bg-gradient-to-br ${t.color} text-white shadow-lg ring-2 ring-white/50`
                  : "bg-white text-neutral-700 ring-2 ring-neutral-200 hover:ring-fb8500/50 hover:shadow-md"
              }`}
            >
              <div className="text-xl mb-1">{t.avatar}</div>
              <div className="text-xs sm:text-sm">{t.name.split(" ")[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-fb8500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
