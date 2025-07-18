import { createContext, useState } from 'react';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <CheckoutContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </CheckoutContext.Provider>
  );
};
