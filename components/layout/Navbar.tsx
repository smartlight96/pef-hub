'use client';

import { useState } from 'react';
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
  const [isRippling, setIsRippling] = useState(false);
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLinkClick = (href: string) => {
    setClickedLink(href);
    setTimeout(() => setClickedLink(null), 300);
  };

  const handleCartClick = () => {
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);
    setCartOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/75 backdrop-blur-md transition-all duration-300">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          
          {/* ================= Premium Glass Effect Logo ================= */}
          <Link 
            href="/" 
            className="group flex items-center gap-3 focus:outline-none active:scale-95 transition-transform duration-200"
            onClick={() => handleLinkClick('/')}
          >
            {/* Logo Container with Glass Effect */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400/20 via-orange-500/10 to-transparent p-0.5 backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
              <div className="relative h-full w-full rounded-[14px] bg-black/90 flex items-center justify-center overflow-hidden border border-white/[0.05]">
                <Image 
                  src="/images/logo2.png" 
                  alt="PEF Hub Logo" 
                  fill
                  sizes="48px"
                  priority
                  className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                />
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/30 to-orange-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white transition-colors duration-300">
                PEF <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">HUB</span>
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-400 uppercase">
                Priceless & Elegant
              </span>
            </div>
          </Link>

          {/* Rest of your navbar code remains the same... */}
          <div className="hidden items-center gap-1.5 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const isClicked = clickedLink === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`
                    relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none
                    active:scale-95
                    ${active 
                      ? 'text-orange-500' 
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                    }
                    ${isClicked ? 'scale-95' : ''}
                  `}
                >
                  {isClicked && (
                    <span className="absolute inset-0 rounded-lg bg-orange-500/20 animate-ping" />
                  )}
                  
                  {link.name}
                  
                  {active && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-orange-500" />
                  )}
                  
                  {!active && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-orange-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ================= Actions / Right Side ================= */}
          <div className="flex items-center gap-3">
            
            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              aria-label="Open Cart"
              className={`
                relative flex h-11 items-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-900/50 px-4 
                transition-all duration-200 hover:border-orange-500/50 hover:bg-zinc-800 
                active:scale-95 focus:outline-none
                ${isRippling ? 'ring-2 ring-orange-500/50 ring-offset-2 ring-offset-black' : ''}
              `}
            >
              {isRippling && (
                <span className="absolute inset-0 rounded-xl bg-orange-500/20 animate-ping" />
              )}
              
              <ShoppingCart size={18} className="text-zinc-300 group-hover:text-white transition-colors" />
              <span className="hidden text-sm font-medium text-zinc-200 md:block">
                Cart
              </span>

              {totalItems > 0 && (
                <span className={`
                  absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center 
                  rounded-full bg-gradient-to-r from-orange-500 to-amber-500 
                  text-[10px] font-bold text-white shadow-md 
                  animate-in fade-in zoom-in duration-200
                  ${isRippling ? 'animate-bounce' : ''}
                `}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Quick Order Button */}
            <Link
              href="/menu"
              onClick={() => handleLinkClick('/menu')}
              className="
                hidden h-11 items-center justify-center rounded-xl 
                bg-gradient-to-r from-orange-500 to-orange-600 
                hover:from-orange-600 hover:to-orange-700 
                px-5 text-sm font-semibold text-white 
                transition-all duration-200 
                hover:shadow-lg hover:shadow-orange-500/30 
                active:scale-95 focus:outline-none 
                xl:flex relative overflow-hidden
              "
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
              <Sparkles className="w-4 h-4 mr-1.5" />
              Order Now
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
              className="
                flex h-11 w-11 items-center justify-center rounded-xl 
                border border-transparent transition-all 
                hover:bg-white/[0.05] active:scale-95 
                lg:hidden focus:outline-none
              "
            >
              {mobileOpen ? (
                <X size={24} className="text-white animate-in rotate-90 duration-200" />
              ) : (
                <Menu size={24} className="text-zinc-300 hover:text-white transition-colors" />
              )}
            </button>

          </div>
        </nav>

        {/* Mobile Menu Panel - Keep your existing code */}
        {mobileOpen && (
          <div className="border-t border-white/[0.08] bg-zinc-950 lg:hidden animate-in slide-in-from-top duration-200">
            {/* Your existing mobile menu code */}
          </div>
        )}
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}