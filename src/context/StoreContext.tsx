import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, CartItem, Product } from '../types';
import { db, auth } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface StoreContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, type: 'Stitched' | 'Unstitched') => Promise<void>;
  removeFromCart: (id: string, size: string) => Promise<void>;
  wishlist: string[];
  toggleWishlist: (id: string) => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  products: Product[];
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load guest data from localStorage
  useEffect(() => {
    if (!user) {
      const savedCart = localStorage.getItem('guest_cart');
      const savedWishlist = localStorage.getItem('guest_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }
  }, [user]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check admin status
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (!userDoc.exists()) {
            // Create user profile if not exists
            const isDefaultAdmin = currentUser.email === "muhdkhan396@gmail.com";
            
            // Merge guest data if any
            const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
            const guestWishlist = JSON.parse(localStorage.getItem('guest_wishlist') || '[]');

            try {
              await setDoc(doc(db, 'users', currentUser.uid), {
                uid: currentUser.uid,
                email: currentUser.email,
                role: isDefaultAdmin ? 'admin' : 'user',
                wishlist: guestWishlist,
                cart: guestCart,
                createdAt: serverTimestamp()
              });
              // Clear guest data
              localStorage.removeItem('guest_cart');
              localStorage.removeItem('guest_wishlist');
            } catch (error) {
              handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
            }
            setIsAdmin(isDefaultAdmin);
          } else {
            setIsAdmin(userDoc.data().role === 'admin');
            setCart(userDoc.data().cart || []);
            setWishlist(userDoc.data().wishlist || []);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }

        // Real-time user data sync
        const unsubUser = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
          if (doc.exists()) {
            setCart(doc.data().cart || []);
            setWishlist(doc.data().wishlist || []);
            setIsAdmin(doc.data().role === 'admin');
          }
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        });
        return () => unsubUser();
      } else {
        setIsAdmin(false);
        // Don't clear cart/wishlist immediately, let the guest effect handle it
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Products listener
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prods);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });
    return () => unsubscribe();
  }, []);

  const addToCart = async (product: Product, size: string, type: 'Stitched' | 'Unstitched') => {
    const newCart = [...cart];
    const existing = newCart.find(item => item.id === product.id && item.selectedSize === size);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1, selectedSize: size, selectedType: type });
    }
    
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { cart: newCart });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    } else {
      setCart(newCart);
      localStorage.setItem('guest_cart', JSON.stringify(newCart));
    }
    setIsCartOpen(true);
  };

  const removeFromCart = async (id: string, size: string) => {
    const newCart = cart.filter(item => !(item.id === id && item.selectedSize === size));
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { cart: newCart });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    } else {
      setCart(newCart);
      localStorage.setItem('guest_cart', JSON.stringify(newCart));
    }
  };

  const toggleWishlist = async (id: string) => {
    const newWishlist = wishlist.includes(id) 
      ? wishlist.filter(i => i !== id) 
      : [...wishlist, id];
      
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { wishlist: newWishlist });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      }
    } else {
      setWishlist(newWishlist);
      localStorage.setItem('guest_wishlist', JSON.stringify(newWishlist));
    }
  };

  return (
    <StoreContext.Provider value={{
      currency, setCurrency, cart, addToCart, removeFromCart, wishlist, toggleWishlist, 
      isCartOpen, setIsCartOpen, products, user, isAdmin, loading
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
