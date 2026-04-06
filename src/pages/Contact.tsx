import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Contact Us</h1>
          <p className="text-black/40 uppercase tracking-widest text-xs font-display">
            We're here to assist you with your luxury experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-serif">Get in Touch</h2>
              <p className="text-black/60 leading-relaxed font-display">
                Whether you have a question about our collections, need assistance with sizing, or want to track your order, our dedicated team is at your service.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-offwhite flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-display font-bold mb-1">Email Us</h4>
                  <p className="text-sm text-black/60">support@usbridals.com</p>
                  <p className="text-sm text-black/60">sales@usbridals.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-offwhite flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-display font-bold mb-1">Call Us</h4>
                  <p className="text-sm text-black/60">+92 300 1234567</p>
                  <p className="text-sm text-black/60">Mon - Sat: 10 AM - 8 PM PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-offwhite flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-display font-bold mb-1">Visit Our Boutique</h4>
                  <p className="text-sm text-black/60">Gulberg III, Lahore, Pakistan</p>
                  <p className="text-sm text-black/60">Flagship Store</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t">
              <h4 className="text-xs uppercase tracking-widest font-display font-bold mb-6">Follow Our Journey</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-offwhite p-8 md:p-12">
            <h2 className="text-2xl font-serif mb-8 text-center">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! Our team will contact you soon.'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-display text-black/40">Full Name</label>
                  <input type="text" required className="w-full bg-white border-b border-black/10 py-3 px-4 text-sm focus:border-gold outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-display text-black/40">Email Address</label>
                  <input type="email" required className="w-full bg-white border-b border-black/10 py-3 px-4 text-sm focus:border-gold outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-display text-black/40">Subject</label>
                <input type="text" required className="w-full bg-white border-b border-black/10 py-3 px-4 text-sm focus:border-gold outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-display text-black/40">Your Message</label>
                <textarea rows={6} required className="w-full bg-white border-b border-black/10 py-3 px-4 text-sm focus:border-gold outline-none transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
