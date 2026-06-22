"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  icon: string;
}

const faqs: FAQItem[] = [
  {
    icon: "🔍",
    question: "How does WrkZone help me find the right professional?",
    answer: "WrkZone connects you with verified professionals in your area. You can search by service type, location, and ratings to find the perfect match for your needs.",
  },
  {
    icon: "🛡️",
    question: "Is it safe to hire professionals on WrkZone?",
    answer: "Yes! All our professionals are verified and reviewed by customers. We also provide secure payment options and a guarantee for peace of mind.",
  },
  {
    icon: "📝",
    question: "How do I post my first service?",
    answer: "Posting is free and takes less than 2 minutes. Go to 'Post a Service', fill in details, add photos, and publish. You'll immediately start receiving inquiries.",
  },
  {
    icon: "⭐",
    question: "What if I'm not satisfied with the service?",
    answer: "We offer a 100% satisfaction guarantee. If you're unhappy with the service, contact our support team and we'll help resolve the issue.",
  },
  {
    icon: "👤",
    question: "How are professionals rated and reviewed?",
    answer: "After service completion, customers can rate professionals on quality, punctuality, and professionalism. These reviews help others make informed decisions.",
  },
  {
    icon: "💳",
    question: "Are there any hidden fees?",
    answer: "No hidden fees! We're transparent about all costs. Our commission is clearly stated, and there are no surprise charges.",
  },
  {
    icon: "⏱️",
    question: "How long does it take to complete a job?",
    answer: "It depends on the service type. Small tasks can be completed in hours, while larger projects may take days. You can discuss timelines with the professional.",
  },
  {
    icon: "🗓️",
    question: "Can I schedule services in advance?",
    answer: "Yes! You can book services for a date that works best for you. Professionals will confirm the appointment based on their availability.",
  },
  {
    icon: "💬",
    question: "Can I communicate directly with professionals?",
    answer: "Absolutely! Once you connect with a professional on WrkZone, you can message them directly to discuss details, clarify requirements, and finalize schedules.",
  },
  {
    icon: "🏆",
    question: "What makes a professional 'verified'?",
    answer: "Verified professionals have passed our screening process, including identity verification, background checks, and skill validation. This ensures quality and safety.",
  },
  {
    icon: "📍",
    question: "Does WrkZone work in my city?",
    answer: "WrkZone operates in 22+ major Indian cities. Check our 'Top Metro Cities' section or search your location to see available services.",
  },
  {
    icon: "🔄",
    question: "What's your refund policy?",
    answer: "If you're not satisfied with the service, we offer a full refund within 7 days. Our support team will help process it quickly and fairly.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const leftFaqs = faqs.slice(0, 6);
  const rightFaqs = faqs.slice(6, 12);

  const FAQItem = ({ faq, idx, isOpen, onClick }: { faq: FAQItem; idx: number; isOpen: boolean; onClick: () => void }) => (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-300">
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${isOpen ? 'from-blue-600/20 to-fb8500/20' : 'from-blue-600/0 to-fb8500/0'} group-hover:from-blue-600/10 group-hover:to-fb8500/10 rounded-2xl transition-all`} />

      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-sm ring-2 ring-white/50 group-hover:ring-fb8500/50 shadow-md group-hover:shadow-lg transition-all">
        <button
          onClick={onClick}
          className="w-full px-6 py-5 flex items-start gap-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-orange-50/50 transition-all text-left"
        >
          {/* Icon */}
          <span className="text-2xl flex-shrink-0 mt-0.5">{faq.icon}</span>

          {/* Question and chevron */}
          <div className="flex-1 flex items-center justify-between gap-3">
            <span className="font-bold text-neutral-900 text-sm sm:text-base leading-tight group-hover:text-fb8500 transition-colors">
              {faq.question}
            </span>
            <span
              className={`text-fb8500 transition-transform duration-300 flex-shrink-0 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </div>
        </button>

        {/* Answer */}
        {isOpen && (
          <div className="px-6 py-4 border-t-2 border-gradient-to-r from-blue-600/20 to-fb8500/20 bg-gradient-to-r from-blue-50/30 to-orange-50/30 text-neutral-700 text-sm leading-relaxed animate-in fade-in slide-in-from-up-2 duration-300">
            {faq.answer}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-50/50 via-white to-orange-50/50 opacity-60 blur-3xl pointer-events-none" />

      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-fb8500/20 rounded-full border border-fb8500/30 mb-4">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">
            ❓ Got Questions?
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-fb8500 bg-clip-text text-transparent">Questions</span>
        </h2>
        <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
          Find answers to common questions about WrkZone
        </p>
      </div>

      {/* Two column layout */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Left column */}
        <div className="space-y-4">
          {leftFaqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              faq={faq}
              idx={idx}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {rightFaqs.map((faq, idx) => (
            <FAQItem
              key={idx + 6}
              faq={faq}
              idx={idx + 6}
              isOpen={openIndex === idx + 6}
              onClick={() => setOpenIndex(openIndex === idx + 6 ? null : idx + 6)}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-fb8500 opacity-10 rounded-3xl" />
        <div className="relative bg-gradient-to-r from-blue-50 to-orange-50 ring-2 ring-blue-200/50 rounded-3xl p-10 sm:p-12 text-center">
          <p className="text-lg text-neutral-700 mb-6 font-medium">
            Still have questions? Our support team is here to help!
          </p>
          <a
            href="mailto:support@wrkzone.com"
            className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-fb8500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Contact Support Team
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-fb8500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
