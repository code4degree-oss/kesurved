'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    title: 'Ancient Wisdom,\nModern Results',
    subtitle: 'Ayurvedic hair & skin care crafted from 100% organic herbs',
    cta: 'Shop Bestsellers',
    href: '#bestsellers',
    image: 'https://picsum.photos/seed/hero1/1400/600',
    mobileImage: 'https://picsum.photos/seed/hero1m/800/1000',
  },
  {
    title: 'Hair Fall?\nWe Got You.',
    subtitle: 'Our Brahmi & Amla Growth Elixir is India\'s #1 herbal hair oil',
    cta: 'Shop Hair Care',
    href: '#shop',
    image: 'https://picsum.photos/seed/hero2/1400/600',
    mobileImage: 'https://picsum.photos/seed/hero2m/800/1000',
  },
  {
    title: 'Flat 25% Off\nOn All Combos',
    subtitle: 'Limited time offer — bundle your favourites and save big',
    cta: 'View Combos',
    href: '#shop',
    image: 'https://picsum.photos/seed/hero3/1400/600',
    mobileImage: 'https://picsum.photos/seed/hero3m/800/1000',
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setCurrent((current + 1) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-20">
      {/* Desktop Hero */}
      <div className="relative h-[480px] md:h-[540px] lg:h-[600px]">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.title}
              className="hidden md:block w-full h-full object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.mobileImage}
              alt={s.title}
              className="block md:hidden w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-6 md:px-16 lg:px-24 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight whitespace-pre-line mb-4 drop-shadow-lg">
                  {s.title}
                </h1>
                <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 max-w-xl">
                  {s.subtitle}
                </p>
                <a
                  href={s.href}
                  className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark font-bold px-8 py-3.5 rounded-sm hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/30 tracking-wide text-sm md:text-base"
                >
                  {s.cta}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2.5 bg-brand-accent' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
