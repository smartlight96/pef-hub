'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  CreditCard,
  Truck,
  ShieldCheck,
  Sparkles,
  Heart,
  ChevronRight,
} from 'lucide-react';

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const services = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: 'Fast Delivery',
      desc: '30-45 min average',
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Secure Payment',
      desc: 'Bank transfer',
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Quality Guarantee',
      desc: 'Fresh & hygienic',
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={18} />, href: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { icon: <FaInstagram size={18} />, href: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { icon: <FaWhatsapp size={18} />, href: 'https://wa.me/2348000000000', color: 'hover:bg-green-500' },
    { icon: <FaTwitter size={18} />, href: 'https://twitter.com', color: 'hover:bg-blue-400' },
    { icon: <FaYoutube size={18} />, href: 'https://youtube.com', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="relative mt-24 bg-zinc-950 border-t border-zinc-800">
      
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">

          {/* ================= Enhanced Brand Section ================= */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-4 group">
              {/* Logo Container with Glass Effect */}
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                
                {/* Main logo container */}
                <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-400/20 via-orange-500/10 to-transparent p-0.5 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/30">
                  <div className="relative h-full w-full rounded-[14px] bg-black/90 flex items-center justify-center overflow-hidden border border-white/[0.05]">
                    <Image
                      src="/images/logo2.png"
                      alt="PEFF Logo"
                      fill
                      className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute -left-0.5 -top-0.5 h-3 w-3 border-l-2 border-t-2 border-orange-500/30 rounded-tl-lg" />
                <div className="absolute -right-0.5 -top-0.5 h-3 w-3 border-r-2 border-t-2 border-orange-500/30 rounded-tr-lg" />
                <div className="absolute -bottom-0.5 -left-0.5 h-3 w-3 border-l-2 border-b-2 border-orange-500/30 rounded-bl-lg" />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 border-r-2 border-b-2 border-orange-500/30 rounded-br-lg" />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  <span className="text-white">PEF</span>
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">HUB</span>
                </h2>
                <p className="text-[11px] text-zinc-400 tracking-[0.2em] uppercase font-medium">
                  Priceless & Elegant Food
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  <span className="text-[9px] text-zinc-500 tracking-wider uppercase">
                    Premium Quality
                  </span>
                </div>
              </div>
            </Link>

            <p className="leading-7 text-zinc-400 text-sm">
              Freshly prepared meals made with premium ingredients and delivered
              quickly to your doorstep. Every order is cooked with care,
              quality and exceptional taste.
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 transition-all duration-300 hover:border-transparent ${social.color} hover:text-white hover:scale-110 hover:shadow-lg`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-medium text-orange-400 tracking-wider uppercase">
                ⭐ 4.9/5 Rating
              </span>
              <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-medium text-green-400 tracking-wider uppercase">
                ✓ 100% Fresh
              </span>
            </div>
          </div>

          {/* ================= Quick Links ================= */}
          <div>
            <h3 className="mb-6 text-lg font-bold flex items-center gap-2">
              Quick Links
              <span className="h-0.5 flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </h3>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-all duration-300"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ================= Contact ================= */}
          <div>
            <h3 className="mb-6 text-lg font-bold flex items-center gap-2">
              Contact Info
              <span className="h-0.5 flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </h3>
            <div className="space-y-5">
              {[
                {
                  icon: <MapPin className="text-orange-500" size={18} />,
                  text: 'Omoku, Ogba/Egbema/Ndoni L.G.A, Rivers State, Nigeria',
                },
                {
                  icon: <Phone className="text-orange-500" size={18} />,
                  text: '+234 703 338 1862',
                  href: 'tel:+2347033381862',
                },
                {
                  icon: <Phone className="text-orange-500" size={18} />,
                  text: '+234 902 643 7646',
                  href: 'tel:+2349026437646',
                },
                {
                  icon: <Mail className="text-orange-500" size={18} />,
                  text: 'orders@peff.com',
                  href: 'mailto:orders@peff.com',
                },
                {
                  icon: <Clock className="text-orange-500" size={18} />,
                  text: (
                    <>
                      Open Daily
                      <br />
                      <span className="font-semibold text-white">8:00 AM – 10:00 PM</span>
                    </>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-3 text-zinc-400 text-sm group">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a href={item.href} className="hover:text-orange-500 transition-colors duration-300">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ================= Services ================= */}
          <div>
            <h3 className="mb-6 text-lg font-bold flex items-center gap-2">
              Why Choose Us
              <span className="h-0.5 flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-orange-500/30 transition-all duration-300 group hover:bg-zinc-900/80"
                >
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500/20 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{service.title}</p>
                    <p className="text-xs text-zinc-500">{service.desc}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                <p className="text-xs text-zinc-400">
                  Average delivery time:
                  <br />
                  <span className="font-bold text-white text-sm">30 – 45 Minutes</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-zinc-800/60 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-zinc-500 text-center md:text-left flex items-center gap-1.5">
              © {new Date().getFullYear()} PEF HUB.
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in Nigeria.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms & Conditions', href: '/terms' },
                { name: 'FAQ', href: '/faq' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-zinc-500 hover:text-orange-500 transition-colors duration-300 hover:underline underline-offset-4"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className={`rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-3 text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/40 active:scale-95 ${
                showScrollTop ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transition: 'opacity 0.3s ease' }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to top button (fixed position) */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50 active:scale-95 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        style={{ transition: 'all 0.3s ease' }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}