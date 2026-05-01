'use client';

import { useRef } from 'react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from './CartContext';
import Link from 'next/link';
import { ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react';

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const { addToCart } = useCart();

  return (
    <div className="flex-shrink-0 w-44 sm:w-52 md:w-60 lg:w-64 snap-start">
      <Link href={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 bg-brand-accent text-brand-dark text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {/* Quick Add */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="absolute bottom-3 right-3 w-9 h-9 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-brand-accent-hover"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </Link>
      <div className="px-1">
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill="currentColor" className="text-brand-accent" />
          ))}
          <span className="text-[10px] text-brand-dark/40 ml-1">120+</span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-semibold text-brand-dark leading-snug mb-1.5 line-clamp-1 hover:text-brand-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-brand-dark">₹{product.salePrice || product.price}</span>
          {product.salePrice && (
            <span className="text-xs text-brand-dark/35 line-through">₹{product.price}</span>
          )}
          {product.salePrice && (
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
              {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ScrollableRow({ title, subtitle, products }: { title: string; subtitle?: string; products: (typeof PRODUCTS) }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.7;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6 px-4 md:px-16 lg:px-24">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-black">{title}</h2>
          {subtitle && <p className="text-black text-xs sm:text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 border border-brand-dark/15 rounded-full flex items-center justify-center hover:bg-brand-dark hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 border border-brand-dark/15 rounded-full flex items-center justify-center hover:bg-brand-dark hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div className="section-gutter">
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {/* Right spacer — uses content so it never collapses */}
          <div className="flex-shrink-0 w-4 md:w-16 lg:w-24 min-h-[1px]" aria-hidden="true">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

interface BannerData {
  slot: string;
  isActive: boolean;
  imageUrl: string;
  title: string;
  buttonText: string;
  linkedProductId: string;
}

function MidPromoBanner({ banners = [] }: { banners?: BannerData[] }) {
  const mid = banners.find(b => b.slot === 'mid' && b.isActive);

  const imgSrc = mid?.imageUrl || 'https://picsum.photos/seed/midhero/1400/500';
  const title = mid?.title || 'Ayurvedic Rituals for Glowing Skin';
  const btnText = mid?.buttonText || 'Shop Rituals';
  const href = mid?.linkedProductId
    ? mid.linkedProductId.startsWith('cat-')
      ? `/category/${mid.linkedProductId.replace('cat-', '')}`
      : `/product/${mid.linkedProductId}`
    : '#shop';

  return (
    <div className="w-full">
      <div className="w-full relative overflow-hidden shadow-xl h-48 md:h-64 lg:h-72 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt="Mid Banner" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <span className="inline-block bg-brand-accent/20 text-brand-accent text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full mb-2 uppercase tracking-wider w-max">
            Exclusive
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-3 md:mb-4 max-w-[280px] md:max-w-sm drop-shadow-md">
            {title}
          </h2>
          <a href={href} className="w-max inline-flex items-center gap-2 bg-brand-accent text-brand-dark font-bold px-5 md:px-6 py-2.5 rounded-sm hover:bg-brand-accent-hover transition-colors shadow-lg tracking-wide text-xs md:text-sm">
            {btnText}
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProductsSection({ banners = [] }: { banners?: BannerData[] }) {
  const bestsellers = PRODUCTS.filter(p => p.badge === 'Bestseller' || true).slice(0, 8);
  const newArrivals = PRODUCTS.filter(p => p.badge === 'New' || p.category === 'hair-care');

  return (
    <section id="shop" className="py-10 md:py-16 bg-brand-light space-y-12 md:space-y-16">
      <ScrollableRow
        title="Bestsellers"
        subtitle="Our most loved products by customers across India"
        products={bestsellers}
      />
      
      <MidPromoBanner banners={banners} />

      <ScrollableRow
        title="New Arrivals"
        subtitle="Fresh formulations just dropped"
        products={newArrivals}
      />
    </section>
  );
}
