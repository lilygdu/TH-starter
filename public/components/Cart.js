import React from "react";
import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";
import { useHistory } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { LocaleContext } from "../context/LocaleContext";
import Button from "./Button";
import CartItem from "./CartItem";
import Styles from "../styles";
import { formatCents } from "../utils/price";
import { initiateCheckout } from "../utils/stripe";

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
  padding-bottom: 10.5rem;
  overflow: scroll;
`;

const CartBottom = styled.div`
  background-color: white;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: ${({ showCartShadow }) =>
    showCartShadow ? "rgba(0, 0, 0, 0.1) 0 -4px 4px 0" : "none"};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
  width: 100%;
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

const Currency = styled.span`
  font-size: 0.9rem;
`;

const Cart = ({ open }) => {
  const { items, cartVisible, setCartVisible } = React.useContext(CartContext);
  const { userEmail, userID, isLoggedIn } = React.useContext(UserContext);
  const { selectedLocale } = React.useContext(LocaleContext);
  const [showCartShadow, setShowCartShadow] = React.useState(false);
  const cartTop = React.useRef();
  const history = useHistory();

  const handleCheckoutClick = async () => {
    setCartVisible(false);
    if (isLoggedIn) {
      initiateCheckout({
        userEmail,
        userID,
        items,
        currencyCode: selectedLocale.currencyCode,
      });
    } else {
      history.push("/signin");
    }
  };

  const showShadowIfMoreCartItems = () => {
    const isAtBottom =
      cartTop.current?.scrollTop ===
      cartTop.current?.scrollHeight - cartTop.current?.offsetHeight;
    setShowCartShadow(!isAtBottom);
  };

  React.useEffect(showShadowIfMoreCartItems);

  const handleClickAway = (event) => {
    const isClickOnAddToOrderButton = !!event.target.closest(".add-to-order");
    if (cartVisible && !isClickOnAddToOrderButton) {
      setCartVisible(false);
    }
  };

  let grandTotal = 0;
  items.forEach((item) => (grandTotal += item.price * item.quantity));

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Dialog open={open}>
        <CartTop onScroll={showShadowIfMoreCartItems} ref={cartTop}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <EmptyCart>You don't have anything in your cart yet!</EmptyCart>
          )}
        </CartTop>
        <CartBottom showCartShadow={showCartShadow}>
          <TotalWrapper>
            <Total>Total: </Total>
            <Cost>
              <Currency>{selectedLocale.currency}</Currency>
              {formatCents(grandTotal)}
            </Cost>
          </TotalWrapper>
          <OrderMax>
            Order cannot exceed {selectedLocale.currency}100.00
          </OrderMax>
          <CheckoutButton
            onClick={handleCheckoutClick}
            variant="primary"
            size="lg"
            disabled={items.length === 0}
            data-tracking-action="checkout"
            data-tracking-element="button"
            data-tracking-type="cart"
          >
            Checkout
          </CheckoutButton>
        </CartBottom>
      </Dialog>
    </ClickAwayListener>
  );
};

export default Cart;
