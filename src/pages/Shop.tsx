import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../lib/utils';
import { useStore } from '../context/StoreContext';

const CATEGORIES = ["All", "Unstitched", "Ready to Wear", "Luxury Formals", "Accessories"];
const FABRICS = ["All", "Chiffon", "Cotton", "Silk", "Velvet", "Lawn"];
const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under Rs. 10,000", min: 0, max: 10000 },
  { label: "Rs. 10,000 - 20,000", min: 10000, max: 20000 },
  { label: "Rs. 20,000 - 40,000", min: 20000, max: 40000 },
  { label: "Above Rs. 40,000", min: 40000, max: Infinity },
];

export const Shop = () => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const activeCategory = searchParams.get('category') || 'All';
  const activeFabric = searchParams.get('fabric') || 'All';
  const activePrice = searchParams.get('price') || 'All';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (activeFabric !== 'All') {
      result = result.filter(p => p.fabric.toLowerCase().includes(activeFabric.toLowerCase()));
    }

    if (activePrice !== 'All') {
      const range = PRICE_RANGES.find(r => r.label === activePrice);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, activeFabric, activePrice, sortBy]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return (
    <main className="pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">{activeCategory === 'All' ? 'Our Collections' : activeCategory}</h1>
          <p className="text-black/40 text-xs uppercase tracking-[0.3em] font-display">Discover the art of Pakistani craftsmanship</p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-y py-6">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-display hover:text-gold transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <div className="flex items-center gap-8">
            <p className="text-[10px] uppercase tracking-widest font-display text-black/40 hidden md:block">
              Showing {filteredProducts.length} Products
            </p>
            <div className="relative group">
              <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-display">
                Sort By: {sortBy.replace('-', ' ')}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <div className="bg-white border shadow-xl p-4 w-48 space-y-3">
                  {[
                    { label: 'Newest', value: 'newest' },
                    { label: 'Price: Low to High', value: 'price-low' },
                    { label: 'Price: High to Low', value: 'price-high' },
                  ].map(opt => (
                    <button 
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={cn(
                        "block w-full text-left text-[10px] uppercase tracking-widest font-display hover:text-gold transition-colors",
                        sortBy === opt.value ? "text-gold font-bold" : "text-black/60"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="text-black/40 font-serif text-2xl">No products found matching your filters.</p>
            <button 
              onClick={() => setSearchParams({})}
              className="text-gold text-xs uppercase tracking-widest font-display underline underline-offset-4"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-white z-[110] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-serif text-xl">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                {/* Category */}
                <div className="space-y-6">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-display text-black/40">Category</h3>
                  <div className="space-y-4">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateFilter('category', cat)}
                        className={cn(
                          "block w-full text-left text-sm font-serif transition-colors",
                          activeCategory === cat ? "text-gold" : "text-black/60 hover:text-black"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric */}
                <div className="space-y-6">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-display text-black/40">Fabric</h3>
                  <div className="space-y-4">
                    {FABRICS.map(f => (
                      <button
                        key={f}
                        onClick={() => updateFilter('fabric', f)}
                        className={cn(
                          "block w-full text-left text-sm font-serif transition-colors",
                          activeFabric === f ? "text-gold" : "text-black/60 hover:text-black"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-6">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-display text-black/40">Price Range</h3>
                  <div className="space-y-4">
                    {PRICE_RANGES.map(r => (
                      <button
                        key={r.label}
                        onClick={() => updateFilter('price', r.label)}
                        className={cn(
                          "block w-full text-left text-sm font-serif transition-colors",
                          activePrice === r.label ? "text-gold" : "text-black/60 hover:text-black"
                        )}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t bg-offwhite">
                <button 
                  onClick={() => {
                    setSearchParams({});
                    setIsFilterOpen(false);
                  }}
                  className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};
