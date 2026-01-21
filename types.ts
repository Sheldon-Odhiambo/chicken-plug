
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Chicken' | 'Dairy' | 'Bakery' | 'Eggs' | 'Spices';
  image: string;
  unit?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BusinessDetails {
  name: string;
  location: string;
  hours: string;
  phone: string;
  whatsapp: string;
}
