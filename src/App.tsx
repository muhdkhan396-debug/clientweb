import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Shop } from './pages/Shop';
import { ProductManager } from './pages/ProductManager';
import { Wishlist } from './pages/Wishlist';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { Checkout } from './pages/Checkout';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <CartDrawer />
          
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<Legal />} />
                <Route path="/terms-of-service" element={<Legal />} />
                <Route path="/shipping-returns" element={<Legal />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<ProductManager />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </AnimatePresence>
          </div>

          <Footer />
        </div>
      </Router>
    </StoreProvider>
    </ErrorBoundary>
  );
}
