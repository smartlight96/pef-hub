// components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-black/80 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo - Always visible */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 sm:gap-3 focus:outline-none active:scale-95 transition-transform duration-200 flex-shrink-0"
          >
            <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 p-0.5 shadow-lg shadow-orange-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-orange-500/40">
              <div className="relative h-full w-full rounded-[10px] bg-black flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/logo2.png" 
                  alt="PEF Hub Logo" 
                  fill
                  sizes="44px"
                  priority
                  className="object-cover p-1.5"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-orange-500 leading-tight">
                PEF <span className="text-orange-500 group-hover:text-white">HUB</span>
              </span>
              <span className="hidden sm:block text-[8px] sm:text-[10px] font-medium tracking-wider text-zinc-400 uppercase">
                PRICELESS AND ELEGANT FOOD HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none active:scale-95 whitespace-nowrap
                    ${active 
                      ? 'text-orange-500' 
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                    }
                  `}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-orange-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions - Always visible on right */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open Cart"
              className="relative flex h-9 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-xl border border-white/[0.08] bg-zinc-900/50 px-2.5 sm:px-4 transition-all duration-200 hover:border-orange-500/50 hover:bg-zinc-800 active:scale-95 focus:outline-none"
            >
              <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px] text-zinc-300" />
              <span className="hidden xs:block text-xs sm:text-sm font-medium text-zinc-200">
                Cart
              </span>

              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[8px] sm:text-[10px] font-bold text-white shadow-md animate-in fade-in zoom-in duration-200">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Quick Order Button - Hidden on very small screens */}
            <Link
              href="/menu"
              className="hidden sm:flex h-9 sm:h-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-3 sm:px-5 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 focus:outline-none relative overflow-hidden whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
              Order Now
            </Link>

            {/* Mobile Menu Toggle - Always visible on mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
              className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-transparent transition-all hover:bg-white/[0.05] active:scale-95 lg:hidden focus:outline-none"
            >
              {mobileOpen ? (
                <X size={20} className="sm:w-6 sm:h-6 text-white" />
              ) : (
                <Menu size={20} className="sm:w-6 sm:h-6 text-zinc-300 hover:text-white transition-colors" />
              )}
            </button>

          </div>
        </nav>

        {/* Mobile Menu - Slide down */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/[0.08] bg-zinc-950/95 backdrop-blur-sm">
            <div className="flex flex-col gap-1 p-4 pb-6">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 active:scale-95
                      ${active 
                        ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-400 border border-orange-500/20' 
                        : 'text-zinc-300 hover:bg-white/[0.05] hover:text-white'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <hr className="my-2 border-white/[0.08]" />

              <Link
                href="/menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 font-semibold text-white transition-all duration-200 hover:from-orange-600 hover:to-orange-700 active:scale-95 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                <Sparkles className="w-4 h-4 mr-2" />
                Order Now
              </Link>

              <button
                onClick={() => {
                  setCartOpen(true);
                  setMobileOpen(false);
                }}
                className="mt-1 flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-900 font-medium text-zinc-200 transition-all duration-200 hover:bg-zinc-800 hover:border-orange-500/30 active:scale-95"
              >
                <ShoppingCart size={18} />
                Cart 
                {totalItems > 0 && (
                  <span className="ml-1 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 sm:h-20" />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}