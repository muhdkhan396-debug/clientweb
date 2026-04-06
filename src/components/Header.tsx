import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, Heart, ShoppingBag, X, ChevronDown, LogOut, LogIn, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useStore } from '../context/StoreContext';
import { CURRENCY_SYMBOLS, EXCHANGE_RATES } from '../types';
import { signInWithGoogle, logout } from '../firebase';

const MEGA_MENU = [
  {
    title: "Unstitched",
    items: ["Lawn", "Luxury Chiffon", "Cotton", "Silk"],
  },
  {
    title: "Ready to Wear",
    items: ["Kurtas", "2-Piece", "3-Piece", "Co-ords"],
  },
  {
    title: "Luxury Formals",
    items: ["Wedding Wear", "Festive Collections"],
  },
  {
    title: "Kids",
    items: ["Girls' Eastern Wear"],
  },
  {
    title: "Accessories",
    items: ["Jewelry", "Bags", "Perfumes"],
  },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { cart, wishlist, currency, setCurrency, setIsCartOpen, user, isAdmin, products } = useStore();
  const location = useLocation();

  const filteredSearchProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setActiveMegaMenu(null);
  }, [location]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        {/* Main Header */}
        <div className={cn(
          "bg-white transition-all duration-300 border-b",
          isScrolled ? "py-3 shadow-sm" : "py-6"
        )}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* Left: Menu (Mobile) & Search */}
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gold transition-colors hidden md:block"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-4xl font-serif tracking-[0.1em] uppercase">US BRIDALS</h1>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-4 md:gap-6 flex-1">
              <div className="hidden md:flex items-center gap-2 border-r border-black/10 pr-4">
                {(['PKR', 'USD', 'GBP', 'AED'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={cn(
                      "text-[10px] font-display transition-colors",
                      currency === c ? "text-gold font-bold" : "text-black/40 hover:text-black"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gold transition-colors md:hidden"
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="relative group hidden sm:block">
                <button className="hover:text-gold transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <div className="bg-white border shadow-xl p-6 w-64 space-y-4">
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 border-b pb-4">
                          <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-10 h-10 rounded-full" />
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate">{user.displayName}</p>
                            <p className="text-[10px] text-black/40 truncate">{user.email}</p>
                          </div>
                        </div>
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center gap-3 text-xs uppercase tracking-widest font-display hover:text-gold transition-colors">
                            <Settings className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        )}
                        <button 
                          onClick={() => logout()}
                          className="flex items-center gap-3 text-xs uppercase tracking-widest font-display hover:text-gold transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => signInWithGoogle()}
                        className="flex items-center gap-3 text-xs uppercase tracking-widest font-display hover:text-gold transition-colors w-full text-left"
                      >
                        <LogIn className="w-4 h-4" />
                        Login with Google
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <Link to="/wishlist" className="hover:text-gold transition-colors relative hidden sm:block">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="hover:text-gold transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar (Desktop) */}
        <div className={cn(
          "bg-white border-b transition-all duration-300 hidden lg:block",
          isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
        )}>
          <nav className="max-w-7xl mx-auto px-8 flex items-center justify-center gap-12 py-3">
            {MEGA_MENU.map((category) => (
              <div 
                key={category.title}
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu(category.title)}
              >
                <button className="text-[10px] uppercase tracking-[0.3em] font-display hover:text-gold transition-colors flex items-center gap-1 py-1">
                  {category.title}
                  <ChevronDown className="w-3 h-3 opacity-30" />
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="absolute top-full left-0 w-full bg-white border-b border-black/5 shadow-xl py-12 hidden lg:block"
            >
              <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-12">
                <div className="col-span-1">
                  <h3 className="font-serif text-xl mb-6">{activeMegaMenu}</h3>
                  <ul className="space-y-4">
                    {MEGA_MENU.find(m => m.title === activeMegaMenu)?.items.map(item => (
                      <li key={item}>
                        <Link to={`/shop?category=${activeMegaMenu}&sub=${item}`} className="text-sm text-black/60 hover:text-gold transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-6">
                  <div className="aspect-[3/4] bg-offwhite overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600" 
                      alt="New Arrivals" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                      <span className="text-white text-xs uppercase tracking-widest font-display">New Arrivals</span>
                    </div>
                  </div>
                  <div className="aspect-[3/4] bg-offwhite overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=600" 
                      alt="Best Sellers" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                      <span className="text-white text-xs uppercase tracking-widest font-display">Best Sellers</span>
                    </div>
                  </div>
                  <div className="aspect-[3/4] bg-offwhite overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?q=80&w=600" 
                      alt="Sale" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                      <span className="text-white text-xs uppercase tracking-widest font-display">Seasonal Sale</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-serif text-xl">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-8">
                  {MEGA_MENU.map((cat) => (
                    <li key={cat.title}>
                      <h3 className="text-xs uppercase tracking-widest font-display text-black/40 mb-4">{cat.title}</h3>
                      <ul className="space-y-4 pl-2">
                        {cat.items.map(item => (
                          <li key={item}>
                            <Link 
                              to={`/shop?category=${cat.title}&sub=${item}`} 
                              className="text-lg font-serif hover:text-gold transition-colors block py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border-t bg-offwhite">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-widest font-display">Currency</span>
                  <div className="flex gap-4">
                    {(['PKR', 'USD', 'GBP', 'AED'] as const).map(c => (
                      <button 
                        key={c} 
                        onClick={() => setCurrency(c)}
                        className={cn("text-xs font-bold", currency === c ? "text-gold" : "text-black/40")}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <Link 
                  to="/account" 
                  className="flex items-center gap-3 text-sm font-display uppercase tracking-widest hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  {user ? user.displayName : 'My Account'}
                </Link>
                {user && (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-sm font-display uppercase tracking-widest hover:text-gold transition-colors mt-6 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                )}
                {!user && (
                  <button 
                    onClick={() => {
                      signInWithGoogle();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-sm font-display uppercase tracking-widest hover:text-gold transition-colors mt-6 w-full text-left"
                  >
                    <LogIn className="w-5 h-5" />
                    Login with Google
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col"
          >
            <div className="p-6 md:p-12 flex items-center justify-between">
              <div className="flex-1 max-w-3xl mx-auto relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-black/20" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search for products, categories..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-black/10 py-4 pl-10 text-2xl md:text-4xl font-serif outline-none focus:border-gold transition-colors"
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="ml-8 hover:text-gold transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-12">
              <div className="max-w-3xl mx-auto">
                {searchQuery.length > 0 ? (
                  <div className="space-y-12">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-display text-black/40">Search Results</p>
                    {filteredSearchProducts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredSearchProducts.map(product => (
                          <Link 
                            key={product.id} 
                            to={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex gap-6 group"
                          >
                            <div className="w-24 aspect-[3/4] bg-offwhite overflow-hidden">
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="flex-1 py-2">
                              <p className="text-[10px] uppercase tracking-widest text-gold font-display mb-1">{product.subCategory}</p>
                              <h4 className="text-lg font-serif group-hover:text-gold transition-colors">{product.name}</h4>
                              <p className="text-sm font-display mt-2">{CURRENCY_SYMBOLS[currency]} {Math.round(product.price * (EXCHANGE_RATES as any)[currency]).toLocaleString()}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xl font-serif text-black/40">No products found for "{searchQuery}"</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-display text-black/40 mb-6">Trending Searches</p>
                      <div className="flex flex-wrap gap-4">
                        {['Unstitched', 'Luxury Chiffon', 'Ready to Wear', 'Wedding Wear'].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-6 py-2 border rounded-full text-xs uppercase tracking-widest font-display hover:bg-black hover:text-white transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
