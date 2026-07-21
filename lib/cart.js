// lib/cart.js - JavaScript version (NO TypeScript)

// Types (remove these)
// export interface CartItem { ... }
// export interface CartSummary { ... }

// Constants
export const CART_STORAGE_KEY = 'peff-cart';

/**
 * Save cart to localStorage
 */
export function saveCartToStorage(cart) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

/**
 * Load cart from localStorage
 */
export function loadCartFromStorage() {
  try {
    if (typeof window === 'undefined') {
      return [];
    }
    
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) {
      return [];
    }
    
    const parsed = JSON.parse(savedCart);
    if (!Array.isArray(parsed)) {
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
}

/**
 * Clear cart from localStorage
 */
export function clearCartFromStorage() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
}

/**
 * Calculate cart total amount
 */
export function calculateCartTotal(cart) {
  if (!cart || cart.length === 0) {
    return 0;
  }
  
  return cart.reduce((total, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return total + (price * quantity);
  }, 0);
}

/**
 * Get total number of items in cart
 */
export function getCartItemCount(cart) {
  if (!cart || cart.length === 0) {
    return 0;
  }
  
  return cart.reduce((count, item) => {
    return count + (item.quantity || 0);
  }, 0);
}

/**
 * Get cart summary
 */
export function getCartSummary(cart) {
  return {
    items: cart || [],
    totalAmount: calculateCartTotal(cart),
    totalItems: getCartItemCount(cart),
    uniqueItems: cart?.length || 0,
  };
}

/**
 * Add item to cart
 */
export function addToCart(cart, item) {
  const quantity = item.quantity || 1;
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  
  let newCart;
  
  if (existingItem) {
    newCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + quantity }
        : cartItem
    );
  } else {
    newCart = [...cart, { ...item, quantity }];
  }
  
  saveCartToStorage(newCart);
  return newCart;
}

/**
 * Remove item from cart
 */
export function removeFromCart(cart, itemId) {
  const newCart = cart.filter((item) => item.id !== itemId);
  saveCartToStorage(newCart);
  return newCart;
}

/**
 * Update item quantity
 */
export function updateCartItemQuantity(cart, itemId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(cart, itemId);
  }
  
  const newCart = cart.map((item) =>
    item.id === itemId ? { ...item, quantity } : item
  );
  
  saveCartToStorage(newCart);
  return newCart;
}

/**
 * Clear cart
 */
export function clearCart() {
  clearCartFromStorage();
  return [];
}

/**
 * Check if cart has items
 */
export function hasItems(cart) {
  return cart && cart.length > 0;
}

/**
 * Check if item exists in cart
 */
export function isInCart(cart, itemId) {
  return cart.some((item) => item.id === itemId);
}

/**
 * Get item quantity in cart
 */
export function getItemQuantity(cart, itemId) {
  const item = cart.find((cartItem) => cartItem.id === itemId);
  return item?.quantity || 0;
}

/**
 * Merge two carts
 */
export function mergeCarts(cart1, cart2) {
  const merged = [...cart1];
  
  cart2.forEach((item) => {
    const existingIndex = merged.findIndex((i) => i.id === item.id);
    if (existingIndex !== -1) {
      merged[existingIndex] = {
        ...merged[existingIndex],
        quantity: Math.max(merged[existingIndex].quantity, item.quantity),
      };
    } else {
      merged.push(item);
    }
  });
  
  return merged;
}

/**
 * Sync cart across tabs
 */
export function syncCartAcrossTabs(callback) {
  const handleStorageChange = (event) => {
    if (event.key === CART_STORAGE_KEY && event.newValue) {
      try {
        const cart = JSON.parse(event.newValue);
        if (Array.isArray(cart)) {
          callback(cart);
        }
      } catch (error) {
        console.error('Failed to sync cart:', error);
      }
    }
  };
  
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageChange);
  }
  
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageChange);
    }
  };
}