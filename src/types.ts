export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  images: string[];
  description: string;
  fabric: string;
  care: string[];
  isNew?: boolean;
  isLuxury?: boolean;
  colors: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedType: 'Stitched' | 'Unstitched';
}

export type Currency = 'PKR' | 'USD' | 'GBP' | 'AED';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  PKR: 'Rs.',
  USD: '$',
  GBP: '£',
  AED: 'AED',
};

export const EXCHANGE_RATES: Record<Currency, number> = {
  PKR: 1,
  USD: 0.0036,
  GBP: 0.0028,
  AED: 0.013,
};
