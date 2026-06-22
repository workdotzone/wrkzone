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
    },
    {
      name: "Rajesh Kumar",
      city: "Bangalore",
      rating: 5,
      text: "AC repair was done perfectly. Great communication throughout and very professional approach. Will book again!",
      service: "AC Repair",
    },
    {
      name: "Anita Desai",
      city: "Delhi",
      rating: 5,
      text: "The cleaning service was thorough and the team was very polite. My house looks brand new now!",
      service: "Home Cleaning",
    },
    {
      name: "Vikram Patel",
      city: "Pune",
      rating: 5,
      text: "Electrician did excellent work. Very knowledgeable and completed the job on time with quality results.",
      service: "Electrician",
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          What Our <span className="primary-text">Customers Say</span>
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have found trusted professionals on WrkZone
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-8 ring-1 ring-orange-100 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-800">{testimonial.name}</h3>
              <p className="text-sm text-neutral-600">
                📍 {testimonial.city} • {testimonial.service}
              </p>
            </div>
            <div className="text-3xl">
              {"⭐".repeat(testimonial.rating)}
            </div>
          </div>

          <p className="text-lg text-neutral-700 mb-8 leading-relaxed italic">
            "{testimonial.text}"
          </p>

          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-orange-100 transition"
            >
              ←
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === current ? "bg-fb8500 w-8" : "bg-orange-200"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-orange-100 transition"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-8">
          {testimonials.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`p-3 rounded-lg text-center text-sm font-semibold transition ${
                idx === current
                  ? "bg-fb8500 text-white ring-2 ring-fb8500"
                  : "bg-white text-neutral-600 ring-1 ring-orange-100 hover:ring-fb8500"
              }`}
            >
              {t.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
