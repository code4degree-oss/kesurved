'use client';

import { Leaf, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark text-brand-light pt-20 pb-10">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 group mb-6 text-white">
              <Leaf className="text-brand-accent" />
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Kesurved
              </span>
            </a>
            <p className="text-brand-light/60 text-sm leading-relaxed mb-6">
              Rooted in ancient Ayurvedic wisdom. Sourced from the purest botanical ingredients across India. Designed for the modern ritual.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Shop</h4>
            <ul className="space-y-4 text-sm text-brand-light/60">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Hair Oils</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Scalp Serums</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Wooden Combs</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Gift Sets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-white">About</h4>
            <ul className="space-y-4 text-sm text-brand-light/60">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Ingredients</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Journal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Newsletter</h4>
            <p className="text-sm text-brand-light/60 mb-4">
              Subscribe to get 10% off your first order and exclusive holistic care tips.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 w-full focus:outline-none focus:border-brand-accent text-sm transition-colors text-white"
              />
              <button 
                type="submit"
                className="bg-brand-accent text-brand-dark px-4 py-3 rounded-r-lg font-medium hover:bg-brand-accent-hover transition-colors text-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-light/40">
          <p>© {new Date().getFullYear()} Kesurved Herbals. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
