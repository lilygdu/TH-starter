import React from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import Button from "./Button";
import CartItem from "./CartItem";
import Styles from "../styles";
import { formatCents } from "../utils/price";

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
  const { items } = React.useContext(CartContext);
  let grandTotal = 0;
  items.forEach((item) => (grandTotal += item.price * item.quantity));
  return (
    <Dialog open={open}>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      {items.length === 0 && <div>You have nothing in the cart!</div>}
      <CartBottom>
        <p>Total: ${formatCents(grandTotal)}</p>
        <p>Order cannot exceed $100</p>
        <Button to="/checkout" variant="primary" size="lg">
          Checkout
        </Button>
      </CartBottom>
    </Dialog>
  );
};

export default Cart;
