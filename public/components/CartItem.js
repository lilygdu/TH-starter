import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import { CartContext } from "../context/CartContext";
import { formatCents } from "../utils/price";

const ItemWrapper = styled.div`
  margin: 1.25rem;
  background-color: ${Styles.color.cartitem.background};
  padding: 1rem 1rem 1.5rem;
  border-radius: 0.25rem;
`;

const ItemTop = styled.div`
  border-bottom: 2px solid ${Styles.color.cartitem.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  font-size: 1.1rem;
  color: ${Styles.color.cartitem.name};
`;

const ItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  font-size: 0.9rem;
  margin: 0 0 -0.5rem;
`;

const Price = styled.span`
  font-size: 0.9rem;
  color: ${Styles.color.cartitem.price};
  &::before {
    content: "$";
  }
`;

const RemoveButton = styled.button`
  border: none;
  outline: none;
  background-color: ${Styles.color.cartitem.background};
  color: ${Styles.color.cartitem.removebutton};
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
`;

const QuantityButtonsWrapper = styled.div``;

const QuantityButton = styled.button`
  border: none;
  outline: none;
  background-color: ${Styles.color.cartitem.background};
  color: ${({ disabled }) =>
    disabled
      ? Styles.color.cartitem.quantitybutton.disabled
      : Styles.color.cartitem.quantitybutton.enabled};
  cursor: pointer;
  font-size: 0.75rem;
`;

const Quantity = styled.span`
  width: 3rem;
  display: inline-block;
  font-size: 1.25rem;
  text-align: center;
`;

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart, decrementQuantity } = React.useContext(
    CartContext
  );

  return (
    <ItemWrapper>
      <ItemTop>
        <span>{item.name}</span>
        <Price>{formatCents(item.quantity * item.price)}</Price>
      </ItemTop>
      <ItemBottom>
        <RemoveButton onClick={() => removeFromCart(item)}>Remove</RemoveButton>
        <QuantityButtonsWrapper>
          <QuantityButton
            onClick={() => decrementQuantity(item)}
            disabled={item.quantity <= 1}
          >
            <i className="fas fa-minus"></i>
          </QuantityButton>
          <Quantity>{item.quantity}</Quantity>
          <QuantityButton onClick={() => addToCart(item)}>
            <i className="fas fa-plus"></i>
          </QuantityButton>
        </QuantityButtonsWrapper>
      </ItemBottom>
    </ItemWrapper>
  );
};

export default CartItem;
