'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { ShoppingBag, Star, Truck, ShieldCheck, RotateCcw, Upload, Loader2, Scale } from 'lucide-react';
import type { Product, Review } from '@/lib/products';

export function ClientProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(product.image || '');
  
  // Review States
  const [isEligibleToReview, setIsEligibleToReview] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '', name: '', image: '' });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [customerPhone, setCustomerPhone] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const phone = localStorage.getItem('customer_phone');
    if (phone) {
      setCustomerPhone(phone);
      fetch(`/api/reviews/check-eligibility?phone=${phone}&productId=${product.id}`)
        .then(res => res.json())
        .then(data => {
          setIsEligibleToReview(data.eligible);
          setCustomerId(data.customerId);
        })
        .catch(console.error);
      
      fetch(`/api/customer/profile?phone=${phone}`)
        .then(res => res.json())
        .then(data => {
           if (data.customer?.name) setReviewForm(prev => ({...prev, name: data.customer.name}));
        }).catch(console.error);
    }
  }, [product.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setReviewForm({ ...reviewForm, image: data.url });
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || !reviewForm.text || !reviewForm.name) return;
    
    setReviewLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerId,
          name: reviewForm.name,
          phone: customerPhone,
          rating: reviewForm.rating,
          text: reviewForm.text,
          image: reviewForm.image
        }),
      });
      if (res.ok) {
        setReviewSuccess(true);
        setShowReviewForm(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewLoading(false);
    }
  };

  const images = [
    product.image,
    `${product.image}?variant=1`,
    `${product.image}?variant=2`,
    `${product.image}?variant=3`,
  ];

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left Column: Images */}
        <div className="flex flex-col gap-4">
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

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-brand-dark">₹{product.salePrice || product.price}</span>
              {product.salePrice && (
                <span className="text-lg text-brand-dark/40 line-through">₹{product.price}</span>
              )}
            </div>

            <p className="text-brand-dark/80 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-2 text-gray-600 mb-8 font-medium">
              <Scale size={20} className="text-brand-accent" />
              <span>Weight: {product.weightGrams}g</span>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full sm:w-auto bg-brand-accent text-brand-dark px-10 py-4 rounded-sm font-bold flex items-center justify-center gap-3 hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/30 text-lg tracking-wide"
            >
              <ShoppingBag size={22} />
              Add to Cart
            </button>
          </div>

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
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 pt-16 border-t border-brand-dark/10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">Customer Reviews</h2>
          
          {isEligibleToReview && !showReviewForm && !reviewSuccess && (
            <button 
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-2 border-2 border-brand-accent text-brand-dark font-bold rounded-sm hover:bg-brand-accent hover:text-black transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>

        {reviewSuccess && (
          <div className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200 mb-8 font-medium text-center">
            Thank you for your review! It will be visible after moderation.
          </div>
        )}

        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-12 space-y-4 max-w-2xl">
            <h3 className="font-bold text-lg mb-2">Write your review</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    <Star size={24} className={star <= reviewForm.rating ? "text-brand-accent fill-brand-accent" : "text-gray-300"} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input required type="text" value={reviewForm.name} onChange={e => setReviewForm(prev => ({ ...prev, name: e.target.value }))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea required value={reviewForm.text} onChange={e => setReviewForm(prev => ({ ...prev, text: e.target.value }))} className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none" placeholder="What did you like or dislike?"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
              <input type="file" ref={fileRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
              {uploadingImage ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </div>
              ) : reviewForm.image ? (
                <div className="relative w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                  <img src={reviewForm.image} alt="Review upload" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setReviewForm(prev => ({ ...prev, image: '' }))} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 text-xs">X</button>
                </div>
              ) : (
                <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center gap-2 border border-dashed border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-sm">
                  <Upload size={16} /> Add Photo
                </button>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowReviewForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
              <button type="submit" disabled={reviewLoading} className="px-6 py-2 bg-brand-accent text-black font-bold rounded-sm hover:bg-brand-accent-hover disabled:opacity-50">
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-6">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-brand-accent/20 rounded-full flex items-center justify-center font-bold text-brand-dark">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <div className="flex text-brand-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-current text-brand-accent" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                {review.image && (
                  <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100">
                    <img src={review.image} alt="Review" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No reviews yet for this product. Check back soon!</p>
          )}
        </div>
      </div>
    </div>
  );
}
