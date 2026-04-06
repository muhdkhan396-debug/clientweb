import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PRODUCTS } from '../constants';
import { useStore } from '../context/StoreContext';
import { Plus, Database, Check, AlertCircle } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

export const ProductManager = () => {
  const { isAdmin, products } = useStore();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isAdmin) return <div className="pt-32 text-center">Access Denied</div>;

  const seedProducts = async () => {
    setStatus('loading');
    try {
      for (const product of PRODUCTS) {
        // Check if product already exists by name (simple check)
        if (!products.some(p => p.name === product.name)) {
          const { id, ...prodData } = product;
          try {
            await addDoc(collection(db, 'products'), {
              ...prodData,
              createdAt: serverTimestamp()
            });
          } catch (error) {
            handleFirestoreError(error, OperationType.CREATE, 'products');
          }
        }
      }
      setStatus('success');
    } catch (error) {
      console.error("Error seeding products:", error);
      setStatus('error');
    }
  };

  return (
    <main className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-serif">Product Management</h1>
        <div className="flex gap-4">
          <button 
            onClick={seedProducts}
            disabled={status === 'loading'}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 text-xs uppercase tracking-widest font-display hover:bg-gold transition-colors disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            Seed Initial Products
          </button>
          <button className="flex items-center gap-2 border border-black px-6 py-3 text-xs uppercase tracking-widest font-display hover:bg-black hover:text-white transition-colors">
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>
      </div>

      {status === 'success' && (
        <div className="mb-8 p-4 bg-green-50 text-green-700 flex items-center gap-3 rounded-lg">
          <Check className="w-5 h-5" />
          Products seeded successfully!
        </div>
      )}

      {status === 'error' && (
        <div className="mb-8 p-4 bg-red-50 text-red-700 flex items-center gap-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          Error seeding products. Check console.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="border p-4 flex gap-4">
            <img src={product.images[0]} alt={product.name} className="w-16 h-20 object-cover" />
            <div>
              <h3 className="font-serif text-sm">{product.name}</h3>
              <p className="text-xs text-black/40">{product.category}</p>
              <p className="text-xs font-bold mt-2">Rs. {product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
