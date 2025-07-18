import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter(item => item !== itemToRemove));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        userInfo,
        setUserInfo,
        cartCount  // ✅ Provide this to Navbar
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
