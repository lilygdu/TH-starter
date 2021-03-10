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
  background-color: ${Styles.color.cart.notempty.background};
  border-radius: 0.5rem;
  padding: 0;
  box-shadow: 0px 2px 10px -2px rgba(186, 186, 186, 0.75);

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const CartTop = styled.div`
  max-height: 35rem;
  overflow: scroll;
  box-shadow: ${({ showCartTopInsetShadow }) =>
    showCartTopInsetShadow
      ? `inset 0px -10px 10px -9px rgba(186,186,186,0.75)`
      : "none"};
`;

const CartBottom = styled.div`
  background-color: white;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

const EmptyCart = styled.div`
  color: ${Styles.color.cart.empty.text};
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background-color: ${Styles.color.cart.empty.background};
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  padding-top: 2rem;
`;

const CheckoutButton = styled(Button)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.3rem;
`;

const Total = styled.p`
  font-family: ${Styles.fontFamily.display};
  font-size: 1.1rem;
  color: ${Styles.color.cart.total};
  margin-top: 0.6rem;
`;

const Cost = styled.p`
  font-family: ${Styles.fontFamily.display};
  font-size: 1.1rem;
  color: ${Styles.color.cart.total};
  margin-top: 0.6rem;
`;

const OrderMax = styled.p`
  color: ${Styles.color.cart.ordermax};
  text-align: center;
  font-size: 0.8rem;
  padding-bottom: 2rem;
  margin: 0;
`;

const Cart = ({ open }) => {
  const { items, setCartVisible } = React.useContext(CartContext);
  const [showCartTopInsetShadow, setShowCartTopInsetShadow] = React.useState(
    false
  );

  let grandTotal = 0;
  items.forEach((item) => (grandTotal += item.price * item.quantity));

  const handleScroll = (event) => {
    const isAtBottom =
      event.target.scrollTop ===
      event.target.scrollHeight - event.target.offsetHeight;
    setShowCartTopInsetShadow(!isAtBottom);
  };

  return (
    <Dialog open={open}>
      <CartTop
        onScroll={handleScroll}
        showCartTopInsetShadow={showCartTopInsetShadow}
      >
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        {items.length === 0 && (
          <EmptyCart>You don't have anything in your cart yet!</EmptyCart>
        )}
      </CartTop>
      <CartBottom>
        <TotalWrapper>
          <Total>Total: </Total>
          <Cost>${formatCents(grandTotal)}</Cost>
        </TotalWrapper>
        <OrderMax>Order cannot exceed $100.00</OrderMax>
        <CheckoutButton
          onClick={() => setCartVisible(false)}
          to="/checkout"
          variant="primary"
          size="lg"
          disabled={items.length === 0}
        >
          Checkout
        </CheckoutButton>
      </CartBottom>
    </Dialog>
  );
};

export default Cart;
