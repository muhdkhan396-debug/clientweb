import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const { wishlist, products } = useStore();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Your Wishlist</h1>
          <p className="text-black/40 uppercase tracking-widest text-xs font-display">
            {wishlistedProducts.length} Items Saved
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-24 bg-offwhite">
            <Heart className="w-12 h-12 text-black/10 mx-auto mb-6" />
            <p className="text-black/40 font-display uppercase tracking-widest text-sm mb-8">Your wishlist is empty</p>
            <Link 
              to="/shop" 
              className="inline-block bg-black text-white px-10 py-4 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
