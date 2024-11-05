'use client';

import { createContext, useContext } from 'react';
import useCustomCart from '../../hooks/useCustomCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useCustomCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
