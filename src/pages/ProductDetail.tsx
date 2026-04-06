import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, ChevronRight, ChevronLeft, Ruler, Store, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { CURRENCY_SYMBOLS, EXCHANGE_RATES } from '../types';
import { cn } from '../lib/utils';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency, addToCart, toggleWishlist, wishlist, products } = useStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedType, setSelectedType] = useState<'Stitched' | 'Unstitched'>('Unstitched');
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (products.length > 0) {
      if (!product) navigate('/');
      if (product) setSelectedSize(product.sizes[0]);
    }
    window.scrollTo(0, 0);
  }, [product, navigate, products.length]);

  if (!product) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const displayPrice = Math.round(product.price * EXCHANGE_RATES[currency]);
  const isWishlisted = wishlist.includes(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <main className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 mb-12">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-black transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Thumbnails */}
          <div className="md:col-span-2 order-2 md:order-1 flex md:flex-col gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "aspect-[3/4] w-20 md:w-full bg-offwhite overflow-hidden border-2 transition-all",
                  activeImage === idx ? "border-gold" : "border-transparent"
                )}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="md:col-span-10 order-1 md:order-2 relative aspect-[3/4] bg-offwhite overflow-hidden cursor-zoom-in group">
            <div 
              className="w-full h-full"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className={cn(
                  "w-full h-full object-cover transition-transform duration-500",
                  isZoomed ? "scale-150" : "scale-100"
                )}
                style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
              />
            </div>
            
            <button 
              onClick={() => setActiveImage(prev => (prev - 1 + product.images.length) % product.images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveImage(prev => (prev + 1) % product.images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-display mb-2">{product.subCategory}</p>
            <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
            <p className="text-2xl font-display font-medium">
              {CURRENCY_SYMBOLS[currency]} {displayPrice.toLocaleString()}
            </p>
          </div>

          <p className="text-black/60 leading-relaxed font-display text-sm">
            {product.description}
          </p>

          {/* Options */}
          <div className="space-y-6">
            {product.category === "Unstitched" && (
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-display text-black/40">Select Type</label>
                <div className="flex gap-4">
                  {(['Unstitched', 'Stitched'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "flex-1 py-3 text-xs uppercase tracking-widest font-display border transition-all",
                        selectedType === type ? "border-black bg-black text-white" : "border-black/10 hover:border-black"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest font-display text-black/40">Select Size</label>
                <button 
                  onClick={() => alert('Size Guide: \nXS: 32-33" \nS: 34-35" \nM: 36-37" \nL: 38-40" \nXL: 42-44"')}
                  className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-display text-gold hover:underline"
                >
                  <Ruler className="w-3 h-3" /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center text-xs font-display border transition-all",
                      selectedSize === size ? "border-black bg-black text-white" : "border-black/10 hover:border-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button 
              onClick={() => addToCart(product, selectedSize, selectedType)}
              className="flex-1 bg-black text-white py-5 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                "w-16 border flex items-center justify-center transition-all",
                isWishlisted ? "bg-gold border-gold text-white" : "border-black/10 hover:border-black"
              )}
            >
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
            </button>
          </div>

          <button 
            onClick={() => alert('This item is currently available at our Lahore Flagship Store and Karachi Boutique.')}
            className="w-full border border-black/10 py-4 text-[10px] uppercase tracking-widest font-display hover:bg-offwhite transition-colors flex items-center justify-center gap-2"
          >
            <Store className="w-4 h-4" />
            Check Availability in Store
          </button>

          {/* Accordions */}
          <div className="border-t pt-8 space-y-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none py-2">
                <span className="text-xs uppercase tracking-widest font-display font-bold">Fabric & Care</span>
                <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="py-4 text-sm text-black/60 space-y-4 font-display">
                <p><span className="text-black font-bold">Fabric:</span> {product.fabric}</p>
                <ul className="list-disc pl-4 space-y-1">
                  {product.care.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </details>
            <details className="group border-t pt-4">
              <summary className="flex items-center justify-between cursor-pointer list-none py-2">
                <span className="text-xs uppercase tracking-widest font-display font-bold">Shipping & Returns</span>
                <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="py-4 text-sm text-black/60 space-y-4 font-display">
                <div className="flex gap-3">
                  <Truck className="w-5 h-5 text-gold shrink-0" />
                  <p>Free nationwide shipping on orders above Rs. 5,000. International shipping calculated at checkout.</p>
                </div>
                <div className="flex gap-3">
                  <RotateCcw className="w-5 h-5 text-gold shrink-0" />
                  <p>Easy 14-day returns and exchanges for unstitched items. Stitched items are final sale.</p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Recommended */}
      <section className="mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">You May Also Like</h2>
          <div className="w-12 h-[1px] bg-gold mx-auto" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
};
