// context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  increaseQuantity: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
  clearCart: () => void;
  isInCart: (itemId: number) => boolean;
  getItemQuantity: (itemId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper functions - these will only be called on client side
const saveCartToStorage = (cart: CartItem[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('peff-cart', JSON.stringify(cart));
    }
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

const loadCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') {
      return [];
    }
    const saved = localStorage.getItem('peff-cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load cart:', error);
    return [];
  }
};

const calculateTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const getTotalItems = (cart: CartItem[]) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart only after mount (client-side)
  useEffect(() => {
    setIsMounted(true);
    const savedCart = loadCartFromStorage();
    setCart(savedCart);
  }, []);

  // Save cart whenever it changes (only after mounted)
  useEffect(() => {
    if (isMounted) {
      saveCartToStorage(cart);
    }
  }, [cart, isMounted]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantity = item.quantity || 1;
    const existing = cart.find((i) => i.id === item.id);
    
    let newCart: CartItem[];
    if (existing) {
      newCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      newCart = [...cart, { ...item, quantity }];
    }
    
    setCart(newCart);
  };

  const removeFromCart = (itemId: number) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    setCart(newCart);
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const newCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCart(newCart);
  };

  const increaseQuantity = (itemId: number) => {
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (itemId: number) => {
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      if (item.quantity <= 1) {
        removeFromCart(itemId);
      } else {
        updateQuantity(itemId, item.quantity - 1);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId: number) => {
    return cart.some((item) => item.id === itemId);
  };

  const getItemQuantity = (itemId: number) => {
    const item = cart.find((i) => i.id === itemId);
    return item?.quantity || 0;
  };

  const value = {
    cart,
    totalItems: getTotalItems(cart),
    totalAmount: calculateTotal(cart),
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  // Return children directly on server (no cart data yet)
  // This prevents hydration mismatches
  if (!isMounted) {
    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}