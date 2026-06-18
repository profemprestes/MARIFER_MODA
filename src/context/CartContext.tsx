
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Size } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: Size) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  generateWhatsAppLink: (shippingMethod: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('marifer_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('marifer_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: Size) => {
    const itemId = `${product.id}-${size}`;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: itemId, product, chosenSize: size, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const generateWhatsAppLink = (shippingMethod: string) => {
    const phoneNumber = "59891234567"; // Placeholder Uruguayan number
    let message = "¡Hola Marifer Moda! 🌟 Quisiera realizar un pedido:\n\n";
    
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.product.title} (Talle ${item.chosenSize}) - $${(item.product.price * item.quantity).toLocaleString('es-UY')}\n`;
    });
    
    message += `\n📦 Envío seleccionado: ${shippingMethod}`;
    message += `\n💰 *Total: $${totalPrice.toLocaleString('es-UY')} UYU*`;
    message += `\n\nQuedo a la espera de sus datos para el pago. ¡Gracias!`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
