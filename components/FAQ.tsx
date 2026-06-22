"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does WrkZone help me find the right professional?",
    answer: "WrkZone connects you with verified professionals in your area. You can search by service type, location, and ratings to find the perfect match for your needs.",
  },
  {
    question: "Is it safe to hire professionals on WrkZone?",
    answer: "Yes! All our professionals are verified and reviewed by customers. We also provide secure payment options and a guarantee for peace of mind.",
  },
  {
    question: "How do I post my first service?",
    answer: "Posting is free and takes less than 2 minutes. Go to 'Post a Service', fill in details, add photos, and publish. You'll immediately start receiving inquiries.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a 100% satisfaction guarantee. If you're unhappy with the service, contact our support team and we'll help resolve the issue.",
  },
  {
    question: "How are professionals rated and reviewed?",
    answer: "After service completion, customers can rate professionals on quality, punctuality, and professionalism. These reviews help others make informed decisions.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees! We're transparent about all costs. Our commission is clearly stated, and there are no surprise charges.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Frequently Asked <span className="primary-text">Questions</span>
        </h2>
        <p className="text-neutral-600">
          Find answers to common questions about WrkZone
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-xl border-2 border-orange-100 overflow-hidden hover:border-fb8500 transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-orange-50 transition font-semibold text-neutral-800"
            >
              <span>{faq.question}</span>
              <span
                className={`text-xl transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {openIndex === idx && (
              <div className="px-6 py-4 bg-orange-50 border-t-2 border-orange-100 text-neutral-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-neutral-600 mb-4">Still have questions?</p>
        <a
          href="mailto:support@wrkzone.com"
          className="inline-block px-8 py-3 rounded-full primary-gradient text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Contact our support team
        </a>
      </div>
    </section>
  );
}
