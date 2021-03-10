import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import Button from "./Button";
import { CartContext } from "../context/CartContext";

const Dialog = styled.dialog`
  position: fixed;
  top: 4.5rem;
  left: auto;
  width: 27.5rem;
  margin: 0 2rem 0 0;
  z-index: 3;
  border: 0;
  background-color: ${Styles.color.cart.background};
  border-radius: 0.5rem;
  padding: 0;
`;

const CartBottom = styled.div`
  background-color: white;
  height: 10rem;
`;

const Cart = ({ open }) => {
  const {
    items,
    addToCart,
    decrementCartQuantity,
    removeFromCart,
  } = React.useContext(CartContext);
  return (
    <Dialog open={open}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button onClick={() => removeFromCart(item)}>Remove</button>
            <button
              onClick={() => decrementCartQuantity(item)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            {item.quantity}
            <button onClick={() => addToCart(item)}>+</button>
            {item.name} | {item.quantity * item.price}
          </li>
        ))}
      </ul>
      {items.length === 0 && <div>You have nothing in the cart!</div>}
      <CartBottom>
        <p>Total: $100</p>
        <p>Order cannot exceed $100</p>
        <Button to="/checkout" variant="primary" size="lg">
          Checkout
        </Button>
      </CartBottom>
    </Dialog>
  );
};

export default Cart;
