import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CURRENCY_SYMBOLS, EXCHANGE_RATES } from '../types';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { cart, currency } = useStore();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const displaySubtotal = Math.round(subtotal * EXCHANGE_RATES[currency]);

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-32 pb-24 min-h-screen flex items-center justify-center"
      >
        <div className="text-center space-y-6 max-w-md px-4">
          <CheckCircle2 className="w-20 h-20 text-gold mx-auto" />
          <h1 className="text-4xl font-serif">Order Confirmed!</h1>
          <p className="text-black/60 font-display">
            Thank you for shopping with US BRIDALS. Your order has been placed successfully and will be delivered soon.
          </p>
          <div className="pt-8">
            <Link 
              to="/" 
              className="inline-block bg-black text-white px-10 py-4 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors w-full"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className="hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-display font-bold border-b pb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="First Name" className="w-full border-b py-3 text-sm outline-none focus:border-gold" />
                <input placeholder="Last Name" className="w-full border-b py-3 text-sm outline-none focus:border-gold" />
                <input placeholder="Email Address" className="w-full border-b py-3 text-sm outline-none focus:border-gold md:col-span-2" />
                <input placeholder="Phone Number" className="w-full border-b py-3 text-sm outline-none focus:border-gold md:col-span-2" />
                <input placeholder="Shipping Address" className="w-full border-b py-3 text-sm outline-none focus:border-gold md:col-span-2" />
                <input placeholder="City" className="w-full border-b py-3 text-sm outline-none focus:border-gold" />
                <input placeholder="Postal Code" className="w-full border-b py-3 text-sm outline-none focus:border-gold" />
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-display font-bold border-b pb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border cursor-pointer hover:border-gold transition-colors">
                  <input type="radio" name="payment" defaultChecked className="accent-gold" />
                  <span className="text-sm font-display uppercase tracking-widest">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-4 p-4 border cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled className="accent-gold" />
                  <span className="text-sm font-display uppercase tracking-widest">Credit / Debit Card (Coming Soon)</span>
                </label>
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <div className="bg-offwhite p-8 sticky top-32">
              <h2 className="text-xs uppercase tracking-[0.3em] font-display font-bold mb-8">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 aspect-[3/4] bg-white overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-serif">{item.name}</p>
                      <p className="text-[10px] text-black/40 uppercase tracking-widest mt-1">Qty: {item.quantity} • {item.selectedSize}</p>
                      <p className="font-display mt-1">{CURRENCY_SYMBOLS[currency]} {Math.round(item.price * item.quantity * EXCHANGE_RATES[currency]).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-black/40 font-display uppercase tracking-widest">Subtotal</span>
                  <span className="font-display">{CURRENCY_SYMBOLS[currency]} {displaySubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/40 font-display uppercase tracking-widest">Shipping</span>
                  <span className="font-display text-gold">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-serif pt-4 border-t">
                  <span>Total</span>
                  <span>{CURRENCY_SYMBOLS[currency]} {displaySubtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsSuccess(true)}
                className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors mt-8"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
