'use client';

import { use, useState, useEffect } from 'react';
import { PRODUCTS } from '@/lib/products';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShoppingBag, Star, ArrowLeft, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addToCart } = useCart();

  // Mocking multiple images based on the seed
  // The product doesn't change since the page component is recreated on route change, but just in case:
  const [mainImage, setMainImage] = useState(product?.image || '');
  const [images, setImages] = useState<string[]>(
    product ? [
      product.image,
      `${product.image}?variant=1`,
      `${product.image}?variant=2`,
      `${product.image}?variant=3`,
    ] : []
  );

  // We actually don't need useEffect to sync product image if we just use normal state initialization 
  // since this is a route page. If it was a problem we could use a key on the component.

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center pt-24 text-brand-dark">
          <h1 className="text-3xl font-serif font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-black hover:underline">Return to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light flex flex-col antialiased">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-6 md:mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-brand-dark/60 hover:text-black transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Back to Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* Left Column: Images */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-dark/5">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  unoptimized
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`relative w-20 sm:w-24 aspect-square rounded-xl overflow-hidden shrink-0 border-2 transition-colors ${mainImage === img ? 'border-brand-blue' : 'border-transparent hover:border-brand-blue/50'}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="flex flex-col">
              <div className="mb-6 border-b border-brand-dark/10 pb-6">
                <div className="text-brand-accent uppercase tracking-widest text-xs font-semibold mb-3">
                  Premium Quality
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark leading-tight mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-brand-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <a href="#reviews" className="text-sm font-medium text-black hover:underline">
                    120+ Customer Reviews
                  </a>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-brand-dark">₹{product.salePrice || product.price}</span>
                  {product.salePrice && (
                    <span className="text-lg text-brand-dark/40 line-through">₹{product.price}</span>
                  )}
                </div>

                <p className="text-brand-dark/80 text-lg leading-relaxed mb-8">
                  {product.description} This formulation blends ancient Ayurvedic methods with modern extraction techniques to ensure maximum potency. Designed to naturally revitalize and restore balance.
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full sm:w-auto bg-brand-accent text-brand-dark px-10 py-4 rounded-sm font-bold flex items-center justify-center gap-3 hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/30 text-lg tracking-wide"
                >
                  <ShoppingBag size={22} />
                  Add to Cart
                </button>
              </div>

              {/* Badges / Guarantees */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-between py-6">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded-full text-black shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark text-sm mb-1">Free Shipping</h4>
                    <p className="text-xs text-brand-dark/60">On orders over ₹999</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded-full text-black shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark text-sm mb-1">Purity Guaranteed</h4>
                    <p className="text-xs text-brand-dark/60">Certified organic herbs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded-full text-black shrink-0">
                    <RotateCcw size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-dark text-sm mb-1">Easy Returns</h4>
                    <p className="text-xs text-brand-dark/60">30-day money back</p>
                  </div>
                </div>
              </div>

              {/* Additional details */}
              <div className="mt-8">
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-4">How to Use</h3>
                <p className="text-brand-dark/70 text-sm leading-relaxed">
                  Warm the oil slightly before application. Use your fingertips to gently massage into the scalp using circular motions for 10-15 minutes. Leave on for at least an hour or overnight for deep conditioning before washing off with a mild cleanser.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
