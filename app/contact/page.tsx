'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-zinc-950 text-white">

        {/* Hero */}

        <section className="py-20 border-b border-zinc-800">

          <div className="max-w-5xl mx-auto px-6 text-center">

            <h1 className="text-5xl font-black">
              Contact <span className="text-orange-500">PEFF</span>
            </h1>

            <p className="mt-6 text-zinc-400 text-lg">
              We'd love to hear from you. Reach out for orders,
              enquiries, complaints or catering services.
            </p>

          </div>

        </section>

        {/* Contact Cards */}

        <section className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <Phone className="text-orange-500 mb-4" />

              <h3 className="font-bold text-lg">
                Phone
              </h3>

              <p className="text-zinc-400 mt-2">
                +234 9026437646
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <MessageCircle className="text-green-500 mb-4" />

              <h3 className="font-bold text-lg">
                WhatsApp
              </h3>

              <a
                href="https://wa.me/2347033381862"
                className="text-zinc-400 hover:text-white"
              >
                Chat With Us
              </a>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <Mail className="text-orange-500 mb-4" />

              <h3 className="font-bold text-lg">
                Email
              </h3>

              <p className="text-zinc-400">
                support@peff.ng
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <MapPin className="text-orange-500 mb-4" />

              <h3 className="font-bold text-lg">
                Address
              </h3>

              <p className="text-zinc-400">
                Omoku, Rivers State, Nigeria
              </p>

            </div>

          </div>

        </section>

        {/* Form + Hours */}

        <section className="max-w-7xl mx-auto px-6 pb-20">

          <div className="grid lg:grid-cols-2 gap-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-3xl font-black">
                Send a Message
              </h2>

              <form className="space-y-5 mt-8">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none focus:border-orange-500"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none focus:border-orange-500"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none focus:border-orange-500"
                />

                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none resize-none focus:border-orange-500"
                />

                <button className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-xl font-semibold transition">
                  Send Message
                </button>

              </form>

            </div>

            <div className="space-y-6">

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <Clock3 className="text-orange-500 mb-4" />

                <h2 className="text-2xl font-black">
                  Opening Hours
                </h2>

                <div className="mt-6 space-y-3 text-zinc-300">

                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8 AM - 9 PM</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9 AM - 10 PM</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>12 PM - 9 PM</span>
                  </div>

                </div>

              </div>

              <div className="rounded-3xl bg-orange-500 p-8">

                <h2 className="text-3xl font-black">
                  Hungry?
                </h2>

                <p className="mt-4 text-orange-100">
                  Browse our delicious meals and place your order today.
                </p>

                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 bg-white text-orange-500 font-semibold px-6 py-3 rounded-xl mt-6"
                >
                  Order Now
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* Google Map */}

        <section className="max-w-7xl mx-auto px-6 pb-20">

          <iframe
            src="https://www.google.com/maps?q=Omoku,Rivers+State,Nigeria&output=embed"
            className="w-full h-[400px] rounded-3xl border border-zinc-800"
            loading="lazy"
          />

        </section>

      </main>

      <Footer />

    </>
  );
}