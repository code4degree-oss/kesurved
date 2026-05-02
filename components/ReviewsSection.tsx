'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

export function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/reviews/featured')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        } else {
          // Fallback static reviews if no featured reviews exist
          setReviews([
            {
              id: 1,
              name: 'Priya M.',
              role: 'Verified Buyer',
              text: 'After centuries of trying commercial products, my roots finally feel alive again. The Bhringraj blend smells incredibly earthly and reduced my hair fall within 3 weeks.',
              rating: 5,
            },
            {
              id: 2,
              name: 'Sarah J.',
              role: 'Verified Buyer',
              text: 'I was skeptical about oiling my fine hair, but the Hibiscus Daily oil is so lightweight! It gives me this gorgeous gloss without weighing my hair down.',
              rating: 5,
            },
            {
              id: 3,
              name: 'Anita D.',
              role: 'Verified Buyer',
              text: 'The ritual of massaging this oil into my scalp has become my favorite part of Sunday. The scent alone is therapeutic. My hair has never been this thick.',
              rating: 4,
            }
          ]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-black mb-4">Loved by Thousands</h2>
          <p className="text-black text-lg">Real results from our community of natural hair care enthusiasts.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl shadow-sm border border-brand-blue/5 relative flex flex-col h-full"
            >
              <Quote className="absolute top-6 right-6 text-black/10 w-12 h-12" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index}
                    size={18} 
                    fill={index < review.rating ? 'currentColor' : 'none'} 
                    className={index < review.rating ? 'text-brand-accent' : 'text-gray-300'}
                  />
                ))}
              </div>
              
              <p className="text-black/80 mb-6 flex-1 leading-relaxed relative z-10">
                &quot;{review.text}&quot;
              </p>
              
              {review.image && (
                <div className="mb-6 rounded-md overflow-hidden bg-gray-100 h-32 w-full">
                  <img src={review.image} alt="Review attachment" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="mt-auto">
                <p className="font-medium text-black">{review.name}</p>
                <p className="text-sm text-black">{review.role || 'Verified Buyer'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
