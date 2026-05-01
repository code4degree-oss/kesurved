'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
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
];

export function ReviewsSection() {
  return (
    <section className="py-24 bg-brand-accent/5">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-brand-blue mb-4">Loved by Thousands</h2>
          <p className="text-brand-dark/70 text-lg">Real results from our community of natural hair care enthusiasts.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-brand-blue/5 relative"
            >
              <Quote className="absolute top-6 right-6 text-brand-blue/10 w-12 h-12" />
              
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
              
              <p className="text-brand-dark/80 mb-8 flex-1 leading-relaxed relative z-10">
                &quot;{review.text}&quot;
              </p>
              
              <div className="mt-auto">
                <p className="font-medium text-brand-dark">{review.name}</p>
                <p className="text-sm text-brand-blue">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
