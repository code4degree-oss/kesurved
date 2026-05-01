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
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <span className="text-brand-accent font-medium tracking-widest uppercase text-sm mb-4 block">
            Full Inventory
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Explore Collection</h2>
          <p className="text-brand-dark/70 text-base md:text-lg">Discover our complete range of authentic Ayurvedic hair oils, hand-poured in small batches to preserve herbal potency.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-brand-light/50 overflow-hidden group flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
                <div className="relative aspect-[4/5] sm:aspect-[1/1] bg-brand-light overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                    Best Seller
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center gap-1 text-brand-accent mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="text-xs text-brand-dark/50 ml-1">(120+)</span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark leading-tight mb-2">{product.name}</h3>
                  <p className="text-brand-dark/70 text-sm mb-4 flex-1">{product.description}</p>
                  <p className="text-xl font-bold text-brand-dark mb-4">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              
              <div className="p-4 pt-0 mt-auto">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="w-full bg-brand-accent text-brand-dark font-bold py-3 px-4 rounded-sm flex items-center justify-center gap-2 hover:bg-brand-accent-hover transition-colors shadow-md uppercase tracking-wide"
                  aria-label={`Add ${product.name} to basket`}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
