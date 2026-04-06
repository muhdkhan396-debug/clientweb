import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { ArrowRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { EXCHANGE_RATES, CURRENCY_SYMBOLS } from '../types';

const CATEGORIES = [
  {
    title: "Unstitched",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800",
    link: "/shop?category=Unstitched"
  },
  {
    title: "Ready to Wear",
    image: "https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?q=80&w=800",
    link: "/shop?category=Ready+to+Wear"
  },
  {
    title: "Luxury Formals",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800",
    link: "/shop?category=Luxury+Formals"
  }
];

export const Home = () => {
  const { products, currency } = useStore();
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const featuredLook = products.find(p => p.isLuxury) || products[0];

  return (
    <main className="bg-white">
      <Hero />

      {/* Shop by Category */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Shop by Category</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] overflow-hidden bg-offwhite"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-2xl md:text-3xl font-serif mb-4">{cat.title}</h3>
                <Link 
                  to={cat.link}
                  className="text-[10px] uppercase tracking-[0.3em] font-display border-b border-white/40 pb-1 hover:border-white transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] font-display text-gold mb-2">The Latest</p>
              <h2 className="text-3xl md:text-5xl font-serif">New Arrivals</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 text-xs uppercase tracking-widest font-display hover:text-gold transition-colors group">
              View All Collections
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop the Look */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000" 
              alt="Shop the Look" 
              className="w-full h-full object-cover"
            />
            {/* Hotspots */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
              <div className="w-4 h-4 bg-white rounded-full animate-ping absolute" />
              <div className="w-4 h-4 bg-white rounded-full relative z-10 cursor-pointer" />
              <div className="absolute left-6 top-0 bg-white p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-48">
                <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Luxury Chiffon</p>
                <p className="text-xs font-serif mb-1">Midnight Bloom Shirt</p>
                <p className="text-xs font-bold">Rs. 12,500</p>
              </div>
            </div>
          </div>
          <div className="space-y-8 lg:pl-12">
            <p className="text-xs uppercase tracking-[0.4em] font-display text-gold">Curated Style</p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Shop the Look: <br />Evening Elegance</h2>
            <p className="text-black/60 leading-relaxed font-display">
              Discover the perfect ensemble for your next festive occasion. Our curated selection combines traditional craftsmanship with contemporary silhouettes, ensuring you stand out in every room.
            </p>
            <div className="space-y-6">
              {products.slice(0, 2).map(p => (
                <div key={p.id} className="flex gap-4 items-center group">
                  <div className="w-16 h-16 overflow-hidden bg-offwhite">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif group-hover:text-gold transition-colors">{p.name}</h4>
                    <p className="text-xs font-bold">{CURRENCY_SYMBOLS[currency]} {Math.round(p.price * EXCHANGE_RATES[currency]).toLocaleString()}</p>
                  </div>
                  <Link to={`/product/${p.id}`} className="ml-auto">
                    <ArrowRight className="w-4 h-4 text-black/20 group-hover:text-gold transition-colors" />
                  </Link>
                </div>
              ))}
            </div>
            <Link 
              to="/shop?category=Luxury+Formals"
              className="inline-block bg-black text-white px-10 py-4 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors"
            >
              Shop Entire Look
            </Link>
          </div>
        </div>
      </section>

      {/* Worn & Loved */}
      <section className="py-24 border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Instagram className="w-5 h-5 text-gold" />
              <span className="text-xs uppercase tracking-[0.4em] font-display">#USBridals</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif">Worn & Loved</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              "https://images.unsplash.com/photo-1594189029441-4b75111ea64b?q=80&w=400",
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400",
              "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=400",
              "https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?q=80&w=400",
              "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=400",
              "https://images.unsplash.com/photo-1583391266914-983067949f5a?q=80&w=400"
            ].map((img, i) => (
              <div key={i} className="aspect-square bg-offwhite overflow-hidden relative group">
                <img 
                  src={img} 
                  alt="Social Proof" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="text-white w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
