
import { Product, BusinessDetails } from './types';

const defaultSpicePrice = 50;

export const DELIVERY_OPTIONS = [
  { label: 'Short Distance', fee: 70 },
  { label: 'Medium Distance', fee: 100 },
  { label: 'Long Distance', fee: 150 }
];

export const SPICE_LIST = [
  "Cayenne pepper", "Ginger", "Paprika", "Turmeric", "Beef masala", "Nutmeg", "Cloves", 
  "Mixed Spices", "Thafai", "Mukhombero", "Black pepper", "Rosemary", "Hibiscus Tea", 
  "Pilau Masala", "Chicken Masala", "Cinnamon", "Tea Masala", "Coffee", "Dhania Powder", 
  "Cumin", "Cardamom", "Curry Powder"
];

const getSpiceImg = (name: string) => `https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop&sig=${encodeURIComponent(name)}`;

export const PRODUCTS: Product[] = [
  { id: 'c1', name: 'Roasted Gizzard', description: 'Small bits of tender roasted gizzard. Daily from 4 PM.', price: 30, category: 'Chicken', image: 'https://images.unsplash.com/photo-1626645272640-ef0283bc9b0e?auto=format&fit=crop&w=800&q=80' },
  { id: 'c2', name: 'Roasted Liver', description: 'Juicy roasted chicken liver, perfectly seasoned.', price: 50, category: 'Chicken', image: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=800&q=80' },
  { id: 'c3', name: 'Mixed Pieces (S)', description: 'Outer parts divided into small pieces. A Barut favorite.', price: 70, category: 'Chicken', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80' },
  { id: 'c4', name: 'Mixed Pieces (L)', description: 'Premium selection of roasted parts for the ultimate feast.', price: 100, category: 'Chicken', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80' },
  { id: 'd1', name: 'Fresh Yogurt (S)', description: 'Creamy and refreshing local yogurt.', price: 50, category: 'Dairy', image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80' },
  { id: 'd3', name: 'Fresh Yogurt (M)', description: 'Perfect size for a refreshing break.', price: 70, category: 'Dairy', image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80' },
  { id: 'd2', name: 'Fresh Yogurt (L)', description: 'Family size local creamy yogurt.', price: 100, category: 'Dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80' },
  { id: 'b1', name: 'Homemade Cake (S)', description: 'Freshly baked soft cake.', price: 20, category: 'Bakery', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' },
  { id: 'b2', name: 'Homemade Cake (L)', description: 'Double the size, double the flavor.', price: 50, category: 'Bakery', image: 'https://images.unsplash.com/photo-1557308535-4421df66c54a?auto=format&fit=crop&w=800&q=80' },
  { id: 'e1', name: 'Tray of Eggs', description: '30 Fresh farm eggs per tray.', price: 450, category: 'Eggs', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80', unit: 'tray' },
  ...SPICE_LIST.map((spice, index) => ({
    id: `spice-${index}`,
    name: spice,
    description: `Authentic ${spice}. Available in Quarter, Half, or Full measures.`,
    price: spice === 'Mukhombero' ? 100 : defaultSpicePrice,
    category: 'Spices' as const,
    image: getSpiceImg(spice),
    unit: 'Price per Quarter'
  }))
];

export const BUSINESS_DETAILS: BusinessDetails = {
  name: 'Chicken Plug',
  location: 'Barut Area, Nakuru',
  hours: 'Daily 4:00 PM - 7:00 PM (Roasted)',
  phone: '0707352885', 
  whatsapp: '254707352885', 
};
