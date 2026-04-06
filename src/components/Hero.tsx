import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: "Eid Edit 2026",
    subtitle: "Luxury Unstitched Collection",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1920",
    cta: "Shop Collection"
  },
  {
    id: 2,
    title: "Velvet Royale",
    subtitle: "Festive Formal Wear",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=1920",
    cta: "Explore Formals"
  },
  {
    id: 3,
    title: "Summer Breeze",
    subtitle: "Premium Lawn Series",
    image: "https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?q=80&w=1920",
    cta: "View Lawn"
  }
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_SLIDES[current].image} 
            alt={HERO_SLIDES[current].title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-xs md:text-sm uppercase tracking-[0.4em] font-display mb-4"
          >
            {HERO_SLIDES[current].subtitle}
          </motion.p>
          <motion.h2
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-white text-4xl sm:text-5xl md:text-8xl font-serif mb-8 leading-tight"
          >
            {HERO_SLIDES[current].title}
          </motion.h2>
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button className="bg-white text-black px-10 py-4 text-xs uppercase tracking-widest font-display hover:bg-gold hover:text-white transition-all duration-300">
              {HERO_SLIDES[current].cta}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 z-10">
        <button 
          onClick={() => setCurrent(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "w-12 h-[2px] transition-all duration-500",
                current === idx ? "bg-white" : "bg-white/20"
              )}
            />
          ))}
        </div>
        <button 
          onClick={() => setCurrent(prev => (prev + 1) % HERO_SLIDES.length)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-12 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] rotate-90 origin-right whitespace-nowrap">Scroll Down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
