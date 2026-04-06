import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product, EXCHANGE_RATES, CURRENCY_SYMBOLS } from '../types';
import { useStore } from '../context/StoreContext';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { currency, toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const displayPrice = Math.round(product.price * EXCHANGE_RATES[currency]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("group relative", className)}
    >
      <Link to={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden bg-offwhite relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-widest px-2 py-1">New</span>
        )}
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform lg:translate-y-4 lg:group-hover:translate-y-0",
              isWishlisted ? "bg-gold text-white" : "bg-white text-black hover:bg-black hover:text-white"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.sizes[0], 'Unstitched');
            }}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 transform lg:translate-y-4 lg:group-hover:translate-y-0 delay-75"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 transform lg:translate-y-4 lg:group-hover:translate-y-0 delay-150">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Quick Actions */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 lg:hidden">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors",
              isWishlisted ? "bg-gold text-white" : "bg-white/90 text-black"
            )}
          >
            <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-current")} />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.sizes[0], 'Unstitched');
            }}
            className="w-8 h-8 bg-white/90 text-black rounded-full flex items-center justify-center shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </Link>

      <div className="mt-4 text-center">
        <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1 font-display">{product.subCategory}</p>
        <h3 className="font-serif text-base mb-1 group-hover:text-gold transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm font-display font-medium">
          {CURRENCY_SYMBOLS[currency]} {displayPrice.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};
