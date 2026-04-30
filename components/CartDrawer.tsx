'use client';

import { useCart } from './CartContext';
import { ShoppingBag, X, Minus, Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulate checkout process
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeCart();
      }, 3000);
    }, 2000);
  };

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-brand-light shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-blue/10">
              <h2 className="text-2xl font-serif text-brand-blue">Your Basket</h2>
              <button
                onClick={closeCart}
                className="p-2 text-brand-dark/60 hover:text-brand-dark transition-colors rounded-full hover:bg-brand-blue/5"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-brand-dark/50 space-y-4">
                  <ShoppingBag size={48} className="opacity-20 text-brand-blue" />
                  <p className="text-lg">Your basket is beautifully empty.</p>
                  <button 
                    onClick={closeCart}
                    className="mt-4 px-6 py-2 border border-brand-blue text-brand-blue rounded-full hover:bg-brand-blue hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-brand-blue/5">
                      <div className="w-20 h-20 bg-brand-blue/5 rounded-xl overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-brand-dark truncate">{item.name}</h3>
                        <p className="text-brand-blue font-medium mt-1">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-light border border-brand-blue/20 text-brand-blue hover:bg-brand-blue/5"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-light border border-brand-blue/20 text-brand-blue hover:bg-brand-blue/5"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-brand-blue/10">
                <div className="flex justify-between items-center mb-6 text-lg">
                  <span className="text-brand-dark/70">Subtotal</span>
                  <span className="font-serif font-medium text-brand-blue text-2xl">${cartTotal.toFixed(2)}</span>
                </div>
                
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full py-4 px-6 bg-blue-50 text-blue-800 rounded-full text-center font-medium border border-blue-200"
                  >
                    Order Placed Successfully! ✨
                  </motion.div>
                ) : (
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 px-6 bg-brand-blue text-white rounded-full font-medium hover:bg-brand-blue-hover transition-colors flex justify-between items-center disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    <span>{isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}</span>
                    {!isCheckingOut && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
