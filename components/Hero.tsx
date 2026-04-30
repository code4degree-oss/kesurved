'use client';

import { motion } from 'motion/react';
import { useCart } from './CartContext';
import { ShoppingBag, PlayCircle } from 'lucide-react';

export function Hero() {
  const { addToCart } = useCart();

  const heroProduct = {
    id: 'hero-product-1',
    name: 'Advanced Hair Growth Serum',
    price: 65.00,
    image: 'https://picsum.photos/seed/serum/600/800',
    description: 'Our signature cooling scalp elixir formulated to activate roots and nourish deeply.',
  };

  // This is the placeholder for the Admin video link.
  // In the future, this will be fetched from the database/CMS.
  const adminVideoLink = "https://www.w3schools.com/html/mov_bbb.mp4"; 

  return (
    <section className="relative w-full bg-brand-light text-brand-dark min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Column: Text & Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl text-center lg:text-left mx-auto lg:mx-0 z-10"
        >
          <span className="text-brand-accent font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
            Discover Your Glow
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-extrabold leading-[1.1] mb-6 tracking-tight">
            Secrets of <br/>
            <span className="text-brand-accent italic font-serif font-light">Natural Beauty</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-dark/70 mb-10 leading-relaxed font-light">
            Unveil the power of traditional herbal formulations mixed with modern science. 100% Vegan. Cruelty-Free. FDA Approved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button 
              onClick={() => addToCart(heroProduct)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-dark text-brand-light font-medium rounded-none hover:bg-brand-accent transition-colors duration-300"
            >
              <ShoppingBag size={20} />
              Shop Best Sellers
            </button>
          </div>
        </motion.div>

        {/* Right Column: Embedded Admin Video UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full aspect-video lg:aspect-[4/5] max-h-[600px] bg-brand-blue rounded-2xl overflow-hidden shadow-2xl group border-4 border-white/50"
        >
          {/* Admin Video Player */}
          <video 
            src={adminVideoLink}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Video Overlay / UI Hint for Admin */}
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
             <PlayCircle className="text-white/80 w-16 h-16 mb-4" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">Admin Notice</p>
            <p className="text-sm text-brand-dark/80 leading-tight">This video link is editable from the Admin Dashboard.</p>
          </div>
        </motion.div>

      </div>

      {/* Decorative clean background elements (Pilgrim style) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/50 -skew-x-12 transform origin-top-right -z-10 hidden lg:block"></div>
    </section>
  );
}
