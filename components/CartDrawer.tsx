'use client';

import { useCart } from './CartContext';
import { ShoppingBag, X, Minus, Plus, ArrowRight, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    closeCart();
    router.push('/checkout');
    setIsCheckingOut(false);
  };

  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 999;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-black" />
                <h2 className="text-xl font-bold text-black">Cart</h2>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center text-black/60 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            {items.length > 0 && (
              <div className="px-6 py-3 bg-brand-light border-b border-gray-200">
                {remainingForFreeShipping > 0 ? (
                  <p className="text-sm text-black mb-2">
                    Add <span className="font-bold text-black">₹{remainingForFreeShipping.toFixed(0)}</span> more to get <span className="font-bold text-green-600">Free Shipping!</span>
                  </p>
                ) : (
                  <p className="text-sm text-green-600 font-bold mb-2 flex items-center gap-1">
                    <Truck size={16} /> You qualify for Free Shipping! 🎉
                  </p>
                )}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    className="h-2 rounded-full bg-brand-accent"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-black/50 space-y-4">
                  <ShoppingBag size={56} className="opacity-15 text-black" />
                  <p className="text-lg font-medium text-black/60">Your cart is empty</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-8 py-3 bg-brand-accent text-black font-bold rounded-sm hover:bg-brand-accent-hover transition-colors tracking-wide"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="w-20 h-20 bg-brand-light rounded-lg overflow-hidden flex-shrink-0">
                        <div className="relative w-full h-full">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-black text-sm truncate">{item.name}</h3>
                        <p className="text-black font-bold mt-1">₹{item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-sm bg-gray-100 border border-gray-200 text-black hover:bg-gray-200 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-sm bg-gray-100 border border-gray-200 text-black hover:bg-gray-200 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-black/70 font-medium">Subtotal</span>
                  <span className="font-bold text-black text-xl">₹{cartTotal.toFixed(2)}</span>
                </div>
                
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 px-6 bg-brand-accent text-black rounded-sm font-bold hover:bg-brand-accent-hover transition-colors flex justify-between items-center disabled:opacity-70 disabled:cursor-not-allowed group tracking-wide"
                  >
                    <span>{isCheckingOut ? 'Redirecting...' : 'Proceed to Checkout'}</span>
                    {!isCheckingOut && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
