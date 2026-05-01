'use client';

export function BannerSection() {
  return (
    <section className="py-6 md:py-10">
      {/* Full-width promotional banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] mx-4 md:mx-16 lg:mx-24 rounded-2xl md:rounded-3xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12 p-8 md:p-12 lg:p-16">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-brand-accent/20 text-brand-accent text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Limited Offer
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              Buy 2, Get 1 Free
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-6 max-w-md">
              Mix and match any products from our collection. Use code <span className="text-brand-accent font-bold">KESURVED3</span> at checkout.
            </p>
            <a
              href="#shop"
              className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark font-bold px-8 py-3.5 rounded-sm hover:bg-brand-accent-hover transition-colors shadow-lg tracking-wide text-sm"
            >
              Claim Offer
            </a>
          </div>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl shrink-0 rotate-3 hover:rotate-0 transition-transform duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://picsum.photos/seed/banneroffer/400/400" alt="Offer" className="w-full h-full object-cover" />
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

export function SecondBanner() {
  return (
    <section className="py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-16 lg:px-24">
        {/* Banner 1 */}
        <div className="relative rounded-2xl overflow-hidden h-52 md:h-64 group cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/seed/banner2a/700/400" alt="Hair Care Range" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">Hair Care Range</h3>
            <p className="text-white/60 text-sm mb-3">Nourish from root to tip</p>
            <span className="inline-flex bg-brand-accent text-brand-dark font-bold px-5 py-2 rounded-sm text-xs tracking-wider hover:bg-brand-accent-hover transition-colors">
              Shop Now
            </span>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative rounded-2xl overflow-hidden h-52 md:h-64 group cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/seed/banner2b/700/400" alt="Skin Care Essentials" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">Skin Care Essentials</h3>
            <p className="text-white/60 text-sm mb-3">Glow naturally, daily</p>
            <span className="inline-flex bg-brand-accent text-brand-dark font-bold px-5 py-2 rounded-sm text-xs tracking-wider hover:bg-brand-accent-hover transition-colors">
              Shop Now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
