'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useCart } from './CartContext';
import { ShoppingBag } from 'lucide-react';

export function Hero() {
  const { addToCart } = useCart();

  const heroProduct = {
    id: 'hero-product-1',
    name: 'Blue Lotus & Indigo Growth Serum',
    price: 65.00,
    image: 'https://picsum.photos/seed/bluelotus/600/800',
    description: 'Our signature cooling scalp elixir formulated to activate roots and nourish deeply.',
  };

  return (
    <section className="relative overflow-hidden w-full bg-brand-light text-brand-dark min-h-[85vh] flex items-center pt-20 md:pt-0">
      {/* Background Image using Next/Image with soft opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/herbsoil/1920/1080"
          alt="Natural herbs background"
          fill
          className="object-cover opacity-10 select-none pointer-events-none"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-light via-brand-light/90 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-12 items-center py-12 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-center md:text-left mx-auto md:mx-0"
        >
          <span className="text-brand-blue font-bold tracking-widest uppercase text-xs md:text-sm mb-3 md:mb-4 block">
            Award-Winning Formula
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-serif font-bold leading-tight mb-4 md:mb-6 text-brand-dark">
            The <span className="italic text-brand-blue">Blue Lotus</span> Elixir
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-brand-dark/80 mb-8 md:mb-10 leading-relaxed font-medium px-4 md:px-0">
            Meet our best-selling scalp clarifying serum. 
            Infused with Indigo, Peppermint, and rare Blue Lotus extracts to instantly soothe irritation and promote dense, lustrous growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button 
              onClick={() => addToCart(heroProduct)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent text-brand-dark font-bold rounded-sm hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/30 tracking-wide"
            >
              <ShoppingBag size={20} />
              Add to Basket — $65
            </button>
            <a href="#shop" className="w-full sm:w-auto text-center px-8 py-4 border-2 border-brand-dark text-brand-dark font-bold rounded-sm hover:bg-brand-dark hover:text-brand-light transition-colors tracking-wide">
              Explore Collection
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:flex items-center justify-center"
        >
          {/* Featured Product Card */}
          <div className="relative aspect-[4/5] w-full max-w-md bg-white rounded-lg overflow-hidden shadow-2xl p-6 group flex flex-col justify-end">
            <div className="absolute inset-0">
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/80" />
            </div>
            
            <div className="relative z-10 text-white pb-2 px-2">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-brand-accent uppercase tracking-widest text-xs font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                    Best Seller
                  </div>
                  <h3 className="text-3xl font-serif font-bold leading-tight drop-shadow-md">{heroProduct.name}</h3>
                </div>
              </div>
              <p className="text-white/90 text-sm mt-2 mb-4 drop-shadow font-medium">
                {heroProduct.description}
              </p>
            </div>
          </div>
          
          {/* Decorative floating elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-blue/30 rounded-full blur-3xl z-0"
          />
        </motion.div>
      </div>
    </section>
  );
}
