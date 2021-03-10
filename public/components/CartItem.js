import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import Button from "./Button";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart, decrementQuantity } = React.useContext(
    CartContext
  );

  return (
    <li>
      <button onClick={() => removeFromCart(item)}>Remove</button>
      <button
        onClick={() => decrementQuantity(item)}
        disabled={item.quantity <= 1}
      >
        -
      </button>
      {item.quantity}
      <button onClick={() => addToCart(item)}>+</button>
      {item.name} | {item.quantity * item.price}
    </li>
  );
};

export default CartItem;
