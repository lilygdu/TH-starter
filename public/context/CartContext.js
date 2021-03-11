import React from "react";

export const CartContext = React.createContext({});

const CartContextProvider = ({ children }) => {
  const [items, setItems] = React.useState(
    JSON.parse(localStorage.getItem("items") || "[]")
  );
  const [cartVisible, setCartVisible] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [JSON.stringify(items)]);

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

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartVisible,
        setCartVisible,
        addToCart,
        decrementQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
