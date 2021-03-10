import React from "react";

export const CartContext = React.createContext({});

const CartContextProvider = ({ children }) => {
  const [items, setItems] = React.useState([]);
  const [cartVisible, setCartVisible] = React.useState(false);

  return (
    <CartContext.Provider
      value={{ items, cartVisible, setItems, setCartVisible }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
