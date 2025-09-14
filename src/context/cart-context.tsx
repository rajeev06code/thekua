"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, packSize: string) => void;
  updateQuantity: (id: string, packSize: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

   useEffect(() => {
    const storedCart = localStorage.getItem('thekua_cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('thekua_cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('thekua_cart');
    }
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id && i.packSize === item.packSize);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && i.packSize === item.packSize
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string, packSize: string) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.packSize === packSize)));
  };

  const updateQuantity = (id: string, packSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, packSize);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.packSize === packSize ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getCartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
