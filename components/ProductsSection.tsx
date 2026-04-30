'use client';

import { useCart } from './CartContext';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';

export function ProductsSection() {
  const { addToCart } = useCart();

  return (
    <section id="shop" className="py-16 md:py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <span className="text-brand-accent font-medium tracking-widest uppercase text-sm mb-4 block">
            Full Inventory
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-4">Explore Collection</h2>
          <p className="text-brand-dark/70 text-base md:text-lg">Discover our complete range of authentic Ayurvedic hair oils, hand-poured in small batches to preserve herbal potency.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/product/${product.id}`} className="group flex flex-col h-full">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-brand-blue/5 rounded-2xl overflow-hidden mb-4 md:mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover md:group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Actions overlay - visible on mobile, hover on desktop */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:bg-black/10 transition-opacity duration-300 flex items-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="w-full bg-white/90 backdrop-blur-md md:bg-white text-brand-blue font-medium py-3 px-2 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent hover:text-white transition-colors shadow-lg md:translate-y-4 md:group-hover:translate-y-0 duration-300"
                    aria-label={`Add ${product.name} to basket`}
                  >
                    <ShoppingBag size={18} />
                    <span className="text-sm md:text-base">Add to Basket</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-1 px-1">
                <div className="flex items-center gap-1 text-brand-accent mb-1 md:mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" className="md:w-[14px] md:h-[14px]" />
                  ))}
                  <span className="text-xs text-brand-dark/50 ml-1">(120+)</span>
                </div>
                <h3 className="text-base md:text-lg font-medium text-brand-dark leading-tight mb-1">{product.name}</h3>
                <p className="text-brand-dark/60 text-xs md:text-sm mb-2 md:mb-3 flex-1">{product.description}</p>
                <p className="text-lg md:text-xl font-serif text-brand-blue">${product.price.toFixed(2)}</p>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
