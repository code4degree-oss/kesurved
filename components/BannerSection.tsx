'use client';

interface BannerData {
  id: string;
  slot: string;
  imageUrl: string;
  mobileImageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  linkedProductId: string;
  isActive: boolean;
}

function getLink(id: string): string {
  if (!id) return '#shop';
  if (id.startsWith('cat-')) return `/category/${id.replace('cat-', '')}`;
  return `/product/${id}`;
}

export function BannerSection({ banners = [] }: { banners?: BannerData[] }) {
  const mid = banners.find(b => b.slot === 'mid' && b.isActive);

  const imgSrc = mid?.imageUrl || 'https://picsum.photos/seed/banneroffer/1400/500';
  const title = mid?.title || 'Buy 2, Get 1 Free';
  const subtitle = mid?.subtitle || 'Mix and match any products from our collection. Use code KESURVED3 at checkout.';
  const btnText = mid?.buttonText || 'Claim Offer';
  const href = mid ? getLink(mid.linkedProductId) : '#shop';

  return (
    <section className="py-6 md:py-10">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] mx-4 md:mx-16 lg:mx-24 rounded-2xl md:rounded-3xl">
        {imgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgSrc} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" loading="lazy" />
        )}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12 p-8 md:p-12 lg:p-16">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-brand-accent/20 text-brand-accent text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Limited Offer
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{title}</h2>
            <p className="text-white/60 text-sm md:text-base mb-6 max-w-md">{subtitle}</p>
            <a href={href} className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark font-bold px-8 py-3.5 rounded-sm hover:bg-brand-accent-hover transition-colors shadow-lg tracking-wide text-sm">
              {btnText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBanner() {
  const features = [
    { icon: '🌿', title: '100% Organic', desc: 'No chemicals, ever' },
    { icon: '🧪', title: 'Lab Tested', desc: 'Dermatologically safe' },
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹999' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day money back' },
  ];

  return (
    <section className="py-8 md:py-12 bg-white border-y border-brand-dark/5">
      <div className="px-4 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center group">
              <span className="text-2xl md:text-3xl block mb-2 group-hover:scale-110 transition-transform">{f.icon}</span>
              <h3 className="font-bold text-brand-dark text-sm md:text-base">{f.title}</h3>
              <p className="text-brand-dark/50 text-xs mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SecondBanner({ banners = [] }: { banners?: BannerData[] }) {
  const leftBanner = banners.find(b => b.slot === 'bottom-left' && b.isActive);
  const rightBanner = banners.find(b => b.slot === 'bottom-right' && b.isActive);

  const left = {
    image: leftBanner?.imageUrl || 'https://picsum.photos/seed/banner2a/700/400',
    title: leftBanner?.title || 'Hair Care Range',
    subtitle: leftBanner?.subtitle || 'Nourish from root to tip',
    btnText: leftBanner?.buttonText || 'Shop Now',
    href: leftBanner ? getLink(leftBanner.linkedProductId) : '/category/hair-care',
  };
  const right = {
    image: rightBanner?.imageUrl || 'https://picsum.photos/seed/banner2b/700/400',
    title: rightBanner?.title || 'Skin Care Essentials',
    subtitle: rightBanner?.subtitle || 'Glow naturally, daily',
    btnText: rightBanner?.buttonText || 'Shop Now',
    href: rightBanner ? getLink(rightBanner.linkedProductId) : '/category/skin-care',
  };

  return (
    <section className="py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-16 lg:px-24">
        <a href={left.href} className="relative rounded-2xl overflow-hidden h-52 md:h-64 group cursor-pointer block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={left.image} alt={left.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">{left.title}</h3>
            <p className="text-white/60 text-sm mb-3">{left.subtitle}</p>
            <span className="inline-flex bg-brand-accent text-brand-dark font-bold px-5 py-2 rounded-sm text-xs tracking-wider">{left.btnText}</span>
          </div>
        </a>
        <a href={right.href} className="relative rounded-2xl overflow-hidden h-52 md:h-64 group cursor-pointer block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={right.image} alt={right.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">{right.title}</h3>
            <p className="text-white/60 text-sm mb-3">{right.subtitle}</p>
            <span className="inline-flex bg-brand-accent text-brand-dark font-bold px-5 py-2 rounded-sm text-xs tracking-wider">{right.btnText}</span>
          </div>
        </a>
      </div>
    </section>
  );
}
