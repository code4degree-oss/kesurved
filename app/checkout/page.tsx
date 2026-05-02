'use client';

import { useCart } from '@/components/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, ShieldCheck, MapPin, User, Phone } from 'lucide-react';

export default function CheckoutPage() {
  const { items, cartTotal, closeCart, cartCount } = useCart();
  const router = useRouter();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartCount === 0) {
      router.push('/');
    }
    closeCart(); // ensure drawer is closed
  }, [cartCount, router, closeCart]);

  const [formData, setFormData] = useState({
    mobile: '',
    name: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [deliveryRates, setDeliveryRates] = useState({ maharashtra: 50, outside: 80 });

  useEffect(() => {
    // Fetch customer profile
    const phone = localStorage.getItem('customer_phone');
    if (phone) {
      setFormData(prev => ({ ...prev, mobile: phone }));
      fetch(`/api/customer/profile?phone=${phone}`)
        .then(res => res.json())
        .then(data => {
          if (data.customer) {
            setFormData(prev => ({
              ...prev,
              name: data.customer.name || prev.name,
              addressLine1: data.customer.addressLine1 || prev.addressLine1,
              addressLine2: data.customer.addressLine2 || prev.addressLine2,
              addressLine3: data.customer.addressLine3 || prev.addressLine3,
              pincode: data.customer.pincode || prev.pincode,
              city: data.customer.city || prev.city,
              state: data.customer.state || prev.state,
            }));
          }
        })
        .catch(console.error);
    }

    // Fetch delivery rates
    fetch('/api/admin/delivery-zones')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setDeliveryRates({ maharashtra: data.maharashtra, outside: data.outside });
        }
      })
      .catch(console.error);
  }, []);

  // Pincode auto-fill logic
  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
            const po = data[0].PostOffice[0];
            setFormData(prev => ({
              ...prev,
              city: po.District,
              state: po.State
            }));
          }
        })
        .catch(console.error);
    }
  }, [formData.pincode]);

  let shippingCost = 0;
  if (formData.state) {
    if (formData.state.toLowerCase() === 'maharashtra') {
      shippingCost = deliveryRates.maharashtra;
    } else {
      shippingCost = deliveryRates.outside;
    }
  }

  const finalTotal = cartTotal + shippingCost;

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      // 1. Create order on our backend
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map(item => ({ id: item.id, quantity: item.quantity })),
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // 2. Load Razorpay script
      const resScript = await loadRazorpayScript();
      if (!resScript) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // 3. Open Razorpay Widget
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: 'Kesurved',
        description: 'Herbal Hair Oils Purchase',
        order_id: data.order_id,
        handler: async function (response: any) {
          // 4. Verify Payment on backend
          try {
            const verifyRes = await fetch('/api/checkout/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                local_order_id: data.local_order_id
              }),
            });
            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok) {
              router.push(`/order-success?orderId=${data.local_order_id}`);
            } else {
              setError(verifyData.error || 'Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.mobile,
        },
        theme: {
          color: '#1a1a1a',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        setError('Payment failed or was cancelled.');
      });
      paymentObject.open();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartCount === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold font-playfair mb-8">Checkout</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Form */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-brand-accent" />
                Shipping Details
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 flex items-center">
                      <Phone size={18} />
                    </span>
                    <input
                      required
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 flex items-center">
                      <MapPin size={18} />
                    </span>
                    <input
                      required
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                      placeholder="House/Flat No., Building Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    placeholder="Street, Area, Locality"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 3</label>
                  <input
                    type="text"
                    name="addressLine3"
                    value={formData.addressLine3}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    placeholder="Landmark, City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                  <input
                    required
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    placeholder="6-digit Pincode"
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pincode"
                  />
                  <p className="text-xs text-brand-accent mt-1">We will auto-detect your city and state from your pincode.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-brand-accent focus:border-brand-accent"
                      placeholder="Auto-filled"
                      readOnly={!!formData.city} // make it readonly if auto-filled, else user can type if API fails
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <input
                      required
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-brand-accent focus:border-brand-accent"
                      placeholder="Auto-filled"
                      readOnly={!!formData.state}
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isProcessing || !formData.state} // ensure state is loaded for shipping calc
                    className="w-full py-4 px-6 bg-brand-accent text-black rounded-sm font-bold hover:bg-brand-accent-hover transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group tracking-wide text-lg"
                  >
                    <ShieldCheck size={20} />
                    {isProcessing ? 'Processing...' : `Pay ₹${finalTotal.toFixed(2)} Securely`}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} /> 100% Secure Payments powered by Razorpay
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full md:w-96">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-accent" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping {formData.state ? `(${formData.state})` : ''}</span>
                  <span className="font-medium">
                    {formData.state ? `₹${shippingCost.toFixed(2)}` : 'Enter Pincode'}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
