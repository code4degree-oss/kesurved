'use client';

import { use } from 'react';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import { useCart } from '@/components/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star, ArrowLeft } from 'lucide-react';

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const categoryId = unwrappedParams.id;
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const products = PRODUCTS.filter((p) => p.category === categoryId);
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-brand-light flex flex-col antialiased">
      <Header />

      <main className="flex-1 pt-20">
        {/* Category Header */}
        <div className="bg-white border-b border-brand-dark/5 px-4 md:px-16 lg:px-24 py-6 md:py-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-brand-dark/50 hover:text-brand-accent transition-colors mb-4">
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Home
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark">
            {category?.name || 'Category'}
          </h1>
          <p className="text-brand-dark/50 text-sm mt-1">{products.length} products</p>
        </div>

        {/* Products Grid — 2 per row on mobile, 3 on tablet, 4 on desktop */}
        <div className="px-4 md:px-16 lg:px-24 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-brand-accent text-brand-dark text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
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
                <div className="px-0.5">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" className="text-brand-accent" />
                    ))}
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-xs sm:text-sm font-semibold text-brand-dark leading-snug mb-1.5 line-clamp-2 hover:text-brand-accent transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-brand-dark">₹{product.salePrice || product.price}</span>
                    {product.salePrice && (
                      <span className="text-xs text-brand-dark/35 line-through">₹{product.price}</span>
                    )}
                    {product.salePrice && (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                        {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-3 bg-brand-accent text-brand-dark text-xs font-bold py-2.5 rounded-sm hover:bg-brand-accent-hover transition-colors tracking-wide"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20 text-brand-dark/40">
              <p className="text-lg">No products in this category yet</p>
              <Link href="/" className="text-brand-accent font-medium hover:underline mt-2 inline-block">
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
