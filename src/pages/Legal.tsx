import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export const Legal = () => {
  const location = useLocation();
  const path = location.pathname;

  const content = {
    '/privacy-policy': {
      title: 'Privacy Policy',
      subtitle: 'Your data security is our priority',
      sections: [
        {
          title: 'Data Collection',
          body: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team. This may include your name, email address, shipping address, and payment information.'
        },
        {
          title: 'How We Use Your Information',
          body: 'We use the information we collect to process your orders, provide customer support, and send you updates about our collections and promotions. We do not sell your personal information to third parties.'
        },
        {
          title: 'Security',
          body: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or modification.'
        }
      ]
    },
    '/terms-of-service': {
      title: 'Terms of Service',
      subtitle: 'Guidelines for using our boutique',
      sections: [
        {
          title: 'Acceptance of Terms',
          body: 'By accessing and using the US BRIDALS website, you agree to comply with and be bound by these Terms of Service.'
        },
        {
          title: 'Product Availability',
          body: 'All products are subject to availability. We reserve the right to limit the quantity of any product we supply or to discontinue any product at any time.'
        },
        {
          title: 'Intellectual Property',
          body: 'All content on this website, including text, graphics, logos, and images, is the property of US BRIDALS and is protected by intellectual property laws.'
        }
      ]
    },
    '/shipping-returns': {
      title: 'Shipping & Returns',
      subtitle: 'Seamless delivery and easy returns',
      sections: [
        {
          title: 'Shipping Policy',
          body: 'We offer free shipping on all orders over PKR 5000 within Pakistan. International shipping rates vary by destination and will be calculated at checkout.'
        },
        {
          title: 'Delivery Times',
          body: 'Orders are typically processed within 2-3 business days. Domestic delivery takes 3-5 business days, while international delivery may take 7-14 business days.'
        },
        {
          title: 'Returns & Exchanges',
          body: 'We accept returns and exchanges within 14 days of delivery. Items must be in their original condition, unworn, and with all tags attached. Please contact our support team to initiate a return.'
        }
      ]
    }
  }[path as keyof typeof content] || { title: 'Legal', subtitle: '', sections: [] };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">{content.title}</h1>
          <p className="text-black/40 uppercase tracking-widest text-xs font-display">
            {content.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {content.sections.map((section, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-xl font-serif">{section.title}</h2>
              <p className="text-black/60 leading-relaxed font-display text-sm">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t text-center">
          <p className="text-[10px] uppercase tracking-widest text-black/40">
            Last Updated: April 2026
          </p>
        </div>
      </div>
    </motion.div>
  );
};
