'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  UtensilsCrossed,
  ShoppingCart,
  CreditCard,
  MessageCircle,
  Bike,
  ArrowRight,
  CheckCircle,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: <UtensilsCrossed size={32} className="text-orange-500" />,
    title: "Browse the Menu",
    description:
      "Explore our delicious meals and choose your favourite food and drinks from our extensive menu.",
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30",
  },
  {
    icon: <ShoppingCart size={32} className="text-orange-500" />,
    title: "Place Your Order",
    description:
      "Add your selected meals to the cart and provide your delivery details for a smooth experience.",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
  },
  {
    icon: <CreditCard size={32} className="text-orange-500" />,
    title: "Make Payment",
    description:
      "Complete payment using the bank account details displayed after checkout. Payment confirmation is required.",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
  {
    icon: <MessageCircle size={32} className="text-orange-500" />,
    title: "Send Your Receipt",
    description:
      "Attach your payment receipt and send it to PEFF via WhatsApp for quick order confirmation.",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30",
  },
  {
    icon: <Bike size={32} className="text-orange-500" />,
    title: "Receive Your Order",
    description:
      "Once payment is confirmed, we'll prepare your food fresh and deliver it to your location promptly.",
    color: "from-pink-500/20 to-pink-600/10",
    border: "border-pink-500/30",
  },
];

const quickStats = [
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Average Delivery",
    value: "30-45 min",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "Payment Security",
    value: "100% Secure",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    label: "Order Confirmation",
    value: "Instant",
  },
];

export default function HowItWorksPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-zinc-950 text-white">

        {/* ====================================== */}
        {/* HERO */}
        {/* ====================================== */}

        <section className="relative overflow-hidden py-20 border-b border-zinc-800">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,.08),transparent_40%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-sm font-semibold text-orange-400">
              <Sparkles className="w-4 h-4" />
              Simple & Easy Process
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-black leading-tight">
              How <span className="text-orange-500">PEFF</span> Works
            </h1>

            <p className="mt-6 text-zinc-400 text-lg leading-8 max-w-2xl mx-auto">
              Ordering from Pearl & Earl Fast Food is quick, easy, and secure.
              Follow these simple steps to enjoy your favourite meals delivered
              to your doorstep.
            </p>

            {/* Quick Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                >
                  <span className="text-orange-500">{stat.icon}</span>
                  <div className="text-left">
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                    <p className="font-semibold text-sm">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ====================================== */}
        {/* STEPS */}
        {/* ====================================== */}

        <section className="max-w-5xl mx-auto px-6 py-20">

          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
              Step-by-Step Guide
            </span>
            <h2 className="mt-3 text-4xl font-black">
              Ordering in <span className="text-orange-500">5 Simple Steps</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              From browsing to delivery, we've made the process seamless so you
              can enjoy your meals without any hassle.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line Connector */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-orange-500/50 via-orange-500/30 to-transparent hidden md:block" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`relative flex gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5 group ${
                    isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    transition: 'all 0.5s ease-out',
                  }}
                >
                  {/* Step Number Circle */}
                  <div className="relative flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 group-hover:border-orange-500/50 transition-colors duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg shadow-orange-500/30">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-orange-500 transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-zinc-400 leading-7">
                      {step.description}
                    </p>

                    {/* Progress Indicator */}
                    {index < steps.length - 1 && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-0.5 flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
                        <span className="text-xs text-zinc-600">Next</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ====================================== */}
        {/* IMPORTANT NOTICE */}
        {/* ====================================== */}

        <section className="max-w-5xl mx-auto px-6 pb-20">

          <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 md:p-10 relative overflow-hidden">

            {/* Decorative Glow */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-shrink-0 p-3 rounded-2xl bg-orange-500/20">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-400 flex items-center gap-2">
                  Important Notice
                </h3>

                <p className="mt-3 text-zinc-300 leading-7">
                  After making payment, please send your payment receipt via
                  WhatsApp. Your order will only be processed after payment has
                  been verified by our team. This ensures a smooth and secure
                  ordering experience for all our customers.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/2348000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl font-semibold transition-colors duration-300 text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send on WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ====================================== */}
        {/* FAQ SECTION */}
        {/* ====================================== */}

        <section className="max-w-5xl mx-auto px-6 pb-20">

          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
              Quick Answers
            </span>
            <h2 className="mt-3 text-3xl font-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How long does delivery take?",
                a: "Most deliveries are completed within 30-45 minutes depending on your location.",
              },
              {
                q: "Can I cancel my order?",
                a: "Orders can be cancelled within 5 minutes of placement. Contact us immediately.",
              },
              {
                q: "Do you deliver outside ONELGA?",
                a: "Currently, we deliver within Ogbogu and surrounding areas in ONELGA.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept bank transfers only. Details are provided at checkout.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <h4 className="font-bold text-white">{faq.q}</h4>
                <p className="mt-2 text-sm text-zinc-400 leading-6">{faq.a}</p>
              </div>
            ))}
          </div>

        </section>

        {/* ====================================== */}
        {/* CTA */}
        {/* ====================================== */}

        <section className="max-w-6xl mx-auto px-6 pb-20">

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 p-10 md:p-14 text-center">

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                <Sparkles className="w-4 h-4" />
                Ready To Order?
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-black text-white">
                Delicious Meals Await You
              </h2>

              <p className="mt-4 text-orange-100 max-w-2xl mx-auto text-lg leading-8">
                Browse our menu and enjoy freshly prepared meals delivered to
                your doorstep with speed and care.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">

                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                >
                  Order Now
                  <ArrowRight size={20} />
                </Link>

                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>

              </div>

              <p className="mt-6 text-xs text-orange-200/70">
                Average delivery time: 30-45 minutes • Freshly prepared daily
              </p>
            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}