import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif tracking-widest uppercase">US BRIDALS</h2>
            <p className="text-sm text-black/60 leading-relaxed font-display">
              Elevating traditional Pakistani craftsmanship through contemporary luxury design. US BRIDALS is more than a brand; it's a celebration of heritage and modern elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-display font-bold mb-8">Collections</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-sm text-black/60 hover:text-gold transition-colors">Unstitched</Link></li>
              <li><Link to="/shop" className="text-sm text-black/60 hover:text-gold transition-colors">Ready to Wear</Link></li>
              <li><Link to="/shop" className="text-sm text-black/60 hover:text-gold transition-colors">Luxury Formals</Link></li>
              <li><Link to="/shop" className="text-sm text-black/60 hover:text-gold transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-sm text-black/60 hover:text-gold transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-display font-bold mb-8">Customer Care</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-sm text-black/60 hover:text-gold transition-colors">Track Your Order</Link></li>
              <li><Link to="/shipping-returns" className="text-sm text-black/60 hover:text-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-sm text-black/60 hover:text-gold transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="text-sm text-black/60 hover:text-gold transition-colors">Store Locator</Link></li>
              <li><Link to="/contact" className="text-sm text-black/60 hover:text-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-display font-bold mb-8">Newsletter</h4>
            <p className="text-sm text-black/60 font-display">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="relative" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing! Check your email for a welcome gift.'); }}>
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                className="w-full border-b border-black/10 py-3 text-sm focus:border-gold outline-none transition-colors pr-10"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-gold transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </form>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs text-black/60">
                <Phone className="w-3 h-3" />
                +92 300 1234567
              </div>
              <div className="flex items-center gap-3 text-xs text-black/60">
                <MapPin className="w-3 h-3" />
                Gulberg III, Lahore, Pakistan
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-black/40">
            © 2026 US BRIDALS. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors">Cookies Settings</Link>
          </div>
          <div className="flex gap-4 items-center grayscale opacity-40">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};
