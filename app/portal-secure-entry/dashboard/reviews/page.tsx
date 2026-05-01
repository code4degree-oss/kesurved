'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Star, Clock, Filter } from 'lucide-react';

interface ReviewRow {
  id: string;
  product: string;
  customer: string;
  phone: string;
  rating: number;
  text: string;
  approved: boolean | null; // null = pending
  date: string;
}

// TODO: Fetch from API
const INITIAL_REVIEWS: ReviewRow[] = [];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const filteredReviews = reviews.filter((r) => {
    if (filter === 'pending') return r.approved === null;
    if (filter === 'approved') return r.approved === true;
    if (filter === 'rejected') return r.approved === false;
    return true;
  });

  const approve = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, approved: true } : r));
  };

  const reject = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, approved: false } : r));
  };

  const pendingCount = reviews.filter(r => r.approved === null).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <p className="text-sm text-gray-500 mt-1">{pendingCount} reviews waiting for approval</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['pending', 'approved', 'rejected', 'all'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === tab
                ? 'bg-white shadow-sm border border-gray-200 text-gray-900'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
            }`}
          >
            {tab === 'pending' && <Clock size={14} className="inline mr-1.5" />}
            {tab} {tab === 'pending' && pendingCount > 0 && `(${pendingCount})`}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900">{review.customer}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{review.phone}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? 'text-brand-accent' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.text}</p>
                <p className="text-xs text-gray-400">
                  Product: <span className="font-medium text-gray-600">{review.product}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {review.approved === null ? (
                  <>
                    <button
                      onClick={() => approve(review.id)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-xs font-medium transition-colors"
                    >
                      <CheckCircle2 size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => reject(review.id)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  </>
                ) : (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    review.approved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {review.approved ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {review.approved ? 'Approved' : 'Rejected'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-16 text-center text-gray-400">
            <Filter size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No reviews in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
