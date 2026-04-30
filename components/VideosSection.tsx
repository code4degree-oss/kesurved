'use client';

import { motion } from 'motion/react';
import { PlayCircle, Heart, Send } from 'lucide-react';
import Image from 'next/image';

const REELS = [
  { id: 1, image: 'https://picsum.photos/seed/reel1/400/700', handle: '@kesurved' },
  { id: 2, image: 'https://picsum.photos/seed/reel2/400/700', handle: '@kesurved' },
  { id: 3, image: 'https://picsum.photos/seed/reel3/400/700', handle: '@kesurved' },
  { id: 4, image: 'https://picsum.photos/seed/reel4/400/700', handle: '@kesurved' },
  { id: 5, image: 'https://picsum.photos/seed/reel5/400/700', handle: '@kesurved' },
  { id: 6, image: 'https://picsum.photos/seed/reel6/400/700', handle: '@kesurved' },
];

const YT_VIDEOS = [
  { id: 1, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1' },
  { id: 2, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1' },
  { id: 3, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1' },
  { id: 4, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=1' },
];

export function VideosSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-light text-brand-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-2">Our Community</h2>
            <p className="text-brand-dark/70 text-base md:text-lg">Real results and rituals from our customers.</p>
          </div>
        </div>

        {/* Reels Section */}
        <div className="mb-12 md:mb-16">
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {REELS.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative shrink-0 w-[192px] sm:w-[224px] aspect-[9/16] bg-brand-dark/5 rounded-2xl overflow-hidden snap-start group cursor-pointer border border-brand-dark/5 shadow-sm"
              >
                <Image
                  src={reel.image}
                  alt={`Reel ${reel.id}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  unoptimized={false}
                />
                
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none" />
                
                {/* Play Button center overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <PlayCircle className="w-16 h-16 text-white drop-shadow-md" />
                </div>

                {/* IG-like UI Elements at the bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md overflow-hidden border border-white/40">
                      <Image
                        src={`https://picsum.photos/seed/avatar${reel.id}/100/100`}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                        unoptimized={false}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-medium text-sm drop-shadow-md">{reel.handle}</span>
                  </div>
                  <div className="flex gap-3">
                    <Heart size={20} className="drop-shadow-md" />
                    <Send size={20} className="drop-shadow-md" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* YouTube Videos Section */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-2xl font-serif font-bold text-brand-dark">Featured Guides</h3>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {YT_VIDEOS.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative shrink-0 w-[240px] sm:w-[320px] md:w-[384px] aspect-video bg-black rounded-2xl overflow-hidden snap-start shadow-md"
              >
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={video.url} 
                  title={`YouTube video player ${video.id}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

