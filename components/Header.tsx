'use client';

import { useCart } from './CartContext';
import { ShoppingBag, Leaf, Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function Header() {
  const { openCart, cartCount } = useCart();
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 1)']
  );
  
  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.08)']
  );

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        style={{ backgroundColor, borderColor }}
        className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md transition-colors duration-300"
      >
        <div className="w-full px-4 md:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Mobile Menu & Logo (Left) */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-brand-dark hover:text-brand-blue"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={24} />
            </button>
            <a href="/" className="flex items-center gap-2 group">
              <Leaf className="text-black group-hover:scale-110 transition-transform" />
              <span className="font-serif text-2xl font-semibold tracking-tight text-black">
                Kesurved
              </span>
            </a>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-[15px] text-black">
            <a href="#shop" className="hover:text-brand-accent transition-colors px-2 py-1">Hair Care</a>
            <a href="#shop" className="hover:text-brand-accent transition-colors px-2 py-1">Skin Care</a>
            <a href="#shop" className="hover:text-brand-accent transition-colors px-2 py-1">Body Care</a>
            <a href="#about" className="hover:text-brand-accent transition-colors px-2 py-1">Our Story</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors px-2 py-1">Contact</a>
          </nav>

          {/* Icons (Right) */}
          <div className="flex items-center justify-end">
            <button
              onClick={openCart}
              className="relative p-2 text-black hover:text-brand-accent transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-brand-accent text-brand-dark text-xs font-bold rounded-full flex items-center justify-center border-2 border-brand-light"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-light z-50 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-4 h-20 border-b border-brand-blue/10">
                <a href="#" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Leaf className="text-brand-blue" />
                  <span className="font-serif text-2xl font-semibold tracking-tight text-brand-blue">
                    Kesurved
                  </span>
                </a>
                <button 
                  className="p-2 -mr-2 text-brand-dark hover:text-brand-blue bg-brand-blue/5 rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Mobile Menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6 p-8 text-2xl font-serif text-brand-blue">
                <a 
                  href="#shop" 
                  className="pb-4 border-b border-brand-blue/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hair Care
                </a>
                <a 
                  href="#shop" 
                  className="pb-4 border-b border-brand-blue/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Skin Care
                </a>
                <a 
                  href="#about" 
                  className="pb-4 border-b border-brand-blue/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Story
                </a>
                <a 
                  href="#contact" 
                  className="pb-4 border-b border-brand-blue/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
              
              <div className="mt-auto p-8 bg-brand-blue/5">
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openCart();
                    }}
                    className="w-full py-4 px-6 bg-brand-blue text-white rounded-full font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    View Basket ({cartCount})
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
