import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CURRENCY_SYMBOLS, EXCHANGE_RATES } from '../types';
import { cn } from '../lib/utils';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, currency } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const displaySubtotal = Math.round(subtotal * EXCHANGE_RATES[currency]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-serif text-xl">Your Bag ({cart.length})</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-black/10" />
                  <p className="text-black/40 font-display uppercase tracking-widest text-sm">Your bag is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-gold text-sm font-bold underline underline-offset-4"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                      <div className="w-24 aspect-[3/4] bg-offwhite overflow-hidden flex-shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-base">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="text-black/20 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-black/40 mt-1">
                            {item.selectedType} • Size: {item.selectedSize}
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          <p className="text-xs text-black/60">Qty: {item.quantity}</p>
                          <p className="font-display font-medium">
                            {CURRENCY_SYMBOLS[currency]} {Math.round(item.price * item.quantity * EXCHANGE_RATES[currency]).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-offwhite space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase tracking-widest font-display text-black/40">Subtotal</span>
                  <span className="text-xl font-serif">{CURRENCY_SYMBOLS[currency]} {displaySubtotal.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-black/40 text-center uppercase tracking-widest">Shipping & taxes calculated at checkout</p>
                <Link 
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors block text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
