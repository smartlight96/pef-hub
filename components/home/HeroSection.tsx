'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Truck, Utensils, Star, Clock, Sparkles, Award } from 'lucide-react';

export default function HeroSection() {
  const stats = [
    {
      icon: <Star className="w-5 h-5 text-orange-500 fill-orange-500" />,
      value: '500+',
      label: 'Happy Customers',
    },
    {
      icon: <Truck className="w-5 h-5 text-orange-500" />,
      value: '30min',
      label: 'Avg Delivery',
    },
    {
      icon: <Utensils className="w-5 h-5 text-orange-500" />,
      value: '20+',
      label: 'Menu Options',
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24 overflow-hidden bg-black text-white">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Primary Glow */}
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-[150px] animate-pulse" />
        
        {/* Secondary Glow */}
        <div className="absolute bottom-[-30%] left-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column */}
        <div className="flex flex-col justify-center text-center lg:text-left animate-fadeInUp">
          
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] px-5 py-2 rounded-full w-fit mx-auto lg:mx-0 backdrop-blur-sm hover:border-orange-500/30 transition-colors duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>
            <span className="text-zinc-300 text-xs font-semibold tracking-widest uppercase ml-1">
              Fresh Meals • Fast Delivery
            </span>
            <Sparkles className="w-3.5 h-3.5 text-orange-400 ml-1" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mt-8 tracking-tight leading-[1.1] text-white">
            Delicious Meals,{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent inline-block mt-1 relative">
              Delivered To You
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-expandWidth" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Enjoy freshly prepared meals, tasty grills, refreshing drinks, and
            customer-focused service. Order from{' '}
            <span className="font-semibold text-white hover:text-orange-500 transition-colors duration-300 cursor-pointer relative group">
              PEF HUB
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </span>{' '}
            and experience quality food delivered with speed and care.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
            <Link
              href="/menu"
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition-all duration-300 active:scale-[0.97] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Explore Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>

            <Link
              href="/menu"
              className="group flex items-center justify-center gap-2 border border-white/[0.08] bg-zinc-900/40 backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-zinc-200 hover:border-orange-500/50 hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-orange-400 transition-colors duration-300" />
              Order Now
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-14 pt-8 border-t border-white/[0.06]">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center lg:items-start group cursor-default hover:scale-105 transition-transform duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-1.5 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                    {stat.icon}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {stat.value}
                  </h3>
                </div>
                <p className="text-zinc-500 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="relative w-full aspect-square max-h-[500px] lg:max-h-[600px] group animate-fadeInRight">
          {/* Decorative Border Frame */}
          <div className="absolute inset-4 rounded-[2.5rem] border-2 border-orange-500/20 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500 ease-out" />
          
          {/* Second Decorative Frame */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-orange-500/10 translate-x-2 translate-y-2 -z-10" />

          {/* Main Image Container */}
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 border border-white/[0.06] bg-zinc-900">
            <Image
              src="/banners/hero-banner.jpg"
              alt="PEF HUB - Delicious Food Banner"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            
            {/* Corner Accent */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-orange-500/30 rounded-tr-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-orange-500/30 rounded-bl-2xl" />
          </div>

          {/* Floating Card */}
          <div className="absolute bottom-8 left-8 p-4 rounded-2xl hidden sm:flex items-center gap-3 bg-zinc-900/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl hover:border-orange-500/30 transition-all duration-300 animate-float">
            <div className="flex p-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/20">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Priority Fast Track
              </p>
              <p className="text-xs font-bold text-white mt-0.5 flex items-center gap-1.5">
                Direct delivery to you
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Top Right Floating Badge */}
          <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-xl shadow-orange-500/20 hidden lg:flex items-center gap-2 animate-scaleIn">
            <Award className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white">Premium</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-30 animate-bounce-slow">
        <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-transparent rounded-full" />
      </div>
    </section>
  );
}