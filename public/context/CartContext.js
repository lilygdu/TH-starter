import React from "react";

export const CartContext = React.createContext({});

const CartContextProvider = ({ children }) => {
  const [items, setItems] = React.useState([]);
  const [cartVisible, setCartVisible] = React.useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);

  const addToCart = (item) => {
    const newItems = [...items];
    const itemAlreadyInCart = newItems.find((i) => i.id === item.id);
    if (itemAlreadyInCart) {
      itemAlreadyInCart.quantity += 1;
    } else {
      newItems.push({ ...item, quantity: 1 });
    }
    setItems(newItems);
    setCartVisible(true);
  };

  const decrementQuantity = (item) => {
    const newItems = [...items];
    const itemAlreadyInCart = newItems.find((i) => i.id === item.id);
    if (itemAlreadyInCart.quantity > 1) {
      itemAlreadyInCart.quantity -= 1;
    }
    setItems(newItems);
  };

  const removeFromCart = (item) => {
    setRemoveDialogOpen(true);
    setItems(items.filter((i) => i.id !== item.id));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartVisible,
        removeDialogOpen,
        setCartVisible,
        setRemoveDialogOpen,
        addToCart,
        decrementQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
