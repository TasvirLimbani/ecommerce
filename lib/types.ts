// export interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   description: string;
//   image: string;
//   sizes: string[];
//   colors: string[];
//   stock: number;
//   createdAt: Date;
// }

// export interface CartItem {
//   productId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   size: string;
//   color: string;
//   image: string;
// }

// export interface Order {
//   id: string;
//   userId: string;
//   items: CartItem[];
//   totalPrice: number;
//   status: 'pending' | 'processing' | 'shipped' | 'delivered';
//   createdAt: Date;
//   shippingAddress: {
//     fullName: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     zipCode: string;
//   };
// }

// export interface User {
//   id: string;
//   email: string;
//   displayName: string;
//   role: 'user' | 'admin';
//   createdAt: Date;
// }


export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
  colors: string[];
  stock: number;
  createdAt: Date;
  fits?: string[];
  sleeves?: string[];
  monogramPrice?: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
  fit?: string;
  sleeve?: string;
  hasMonogram?: boolean;
  customizationPrice?: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: Date;
}
