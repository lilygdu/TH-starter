import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import { CartContext } from "../context/CartContext";
import { LocaleContext } from "../context/LocaleContext";
import { formatCents } from "../utils/price";
import Dialog from "./Dialog";
import Button from "./Button";

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

const RemoveItemDialog = styled(Dialog)``;

const Modal = styled.div`
  background-color: ${Styles.color.account.modal.background};
  padding: 1rem 2rem;
  text-align: center;
  color: ${Styles.color.account.modal.text};
  border-radius: 5px;
  width: 25rem;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const DialogHeading = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`;
const DialogText = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

const ModalButton = styled(Button)`
  margin-top: 0.5rem;
  width: 10rem;
`;

const CartItem = ({ item }) => {
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
  const { addToCart, decrementQuantity, removeFromCart } = React.useContext(
    CartContext
  );
  const { selectedLocale } = React.useContext(LocaleContext);
  const okayButtonRef = React.useRef();

  const handleOkayClick = () => {
    removeFromCart(item);
    setRemoveDialogOpen(false);
  };

  const handleDialogTransition = () => {
    if (removeDialogOpen) {
      okayButtonRef.current?.focus();
    }
  };

  return (
    <>
      <ItemWrapper>
        <ItemTop>
          <span>{item.name}</span>
          <Price>
            {selectedLocale.currency}
            {formatCents(item.quantity * item.price)}
          </Price>
        </ItemTop>
        <ItemBottom>
          <RemoveButton
            data-tracking-action="open-remove-item-from-cart-dialog"
            data-tracking-element="button"
            data-tracking-type="item"
            data-tracking-name={item.name}
            data-tracking-id={item.id}
            onClick={() => setRemoveDialogOpen(true)}
          >
            Remove
          </RemoveButton>
          <QuantityButtonsWrapper>
            <QuantityButton
              onClick={() => decrementQuantity(item)}
              disabled={item.quantity <= 1}
              data-tracking-action="decrement-cart-item"
              data-tracking-element="button"
              data-tracking-type="item"
              data-tracking-name={item.name}
              data-tracking-id={item.id}
            >
              <i className="fas fa-minus"></i>
            </QuantityButton>
            <Quantity>{item.quantity}</Quantity>
            <QuantityButton
              data-tracking-action="increment-cart-item"
              data-tracking-element="button"
              data-tracking-type="item"
              data-tracking-name={item.name}
              data-tracking-id={item.id}
              onClick={() => addToCart(item)}
            >
              <i className="fas fa-plus"></i>
            </QuantityButton>
          </QuantityButtonsWrapper>
        </ItemBottom>
      </ItemWrapper>
      <RemoveItemDialog
        data-tracking-action="close-remove-item-from-cart-dialog"
        data-tracking-element="dialog"
        data-tracking-type="item"
        data-tracking-name={item.name}
        data-tracking-id={item.id}
        onClick={() => setRemoveDialogOpen(false)}
        open={removeDialogOpen}
        onTransitionEnd={handleDialogTransition}
      >
        <Modal>
          <DialogHeading>Remove Item</DialogHeading>
          <DialogText>
            Are you sure you want to remove your {item.name} from your cart?
          </DialogText>
          <ModalButtonWrapper>
            <ModalButton
              data-tracking-action="confirm-remove-item-from-cart"
              data-tracking-element="button"
              data-tracking-type="item"
              data-tracking-name={item.name}
              data-tracking-id={item.id}
              variant="primary"
              size="lg"
              onClick={handleOkayClick}
              ref={okayButtonRef}
            >
              Okay
            </ModalButton>
            <ModalButton
              variant="outline"
              size="lg"
              data-tracking-action="cancel-remove-item-from-cart"
              data-tracking-element="button"
              data-tracking-type="item"
              data-tracking-name={item.name}
              data-tracking-id={item.id}
              onClick={() => setRemoveDialogOpen(false)}
            >
              Cancel
            </ModalButton>
          </ModalButtonWrapper>
        </Modal>
      </RemoveItemDialog>
    </>
  );
};

export default CartItem;
