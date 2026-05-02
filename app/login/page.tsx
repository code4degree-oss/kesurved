'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      localStorage.setItem('customer_phone', mobile);
      router.push('/account');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-md w-full">
        <h1 className="text-3xl font-bold font-playfair mb-2 text-center">Track Your Orders</h1>
        <p className="text-gray-600 mb-8 text-center">Enter your mobile number to view your past orders and their status.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 flex items-center">
                <Phone size={18} />
              </span>
              <input
                required
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent text-lg"
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={mobile.length !== 10}
            className="w-full py-4 px-6 bg-brand-accent text-black rounded-sm font-bold hover:bg-brand-accent-hover transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group tracking-wide text-lg"
          >
            <span>View Orders</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}
