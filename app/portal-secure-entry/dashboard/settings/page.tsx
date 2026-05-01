'use client';

import { Settings, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [storeName, setStoreName] = useState('Kesurved Herbal Products');
  const [cancelHours, setCancelHours] = useState('4');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('999');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Store configuration</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-lg space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Order Cancel Window (hours)</label>
          <input
            type="number"
            value={cancelHours}
            onChange={(e) => setCancelHours(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
          />
          <p className="text-xs text-gray-400 mt-1">Customers can cancel orders within this many hours of placing</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Free Shipping Threshold (₹)</label>
          <input
            type="number"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
          />
          <p className="text-xs text-gray-400 mt-1">Orders above this amount get free shipping</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-brand-accent text-brand-dark font-bold px-6 py-3 rounded-lg hover:bg-brand-accent-hover transition-colors text-sm"
        >
          <Save size={16} />
          {saved ? 'Saved ✓' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
