import React from "react";
import { formatOrderNumber } from "../utils/order";
import { parseISO, format } from "date-fns";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { LocaleContext } from "../context/LocaleContext";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import Styles from "../styles";
import { fetchItems } from "../utils/recent";
import { initiateCheckout } from "../utils/stripe";

const Wrapper = styled.div`
  box-shadow: 2px 2px 9px 0px rgba(178, 178, 178, 0.5);
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;

  @media (max-width: ${Styles.breakpoint}) {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div``;

const Right = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 3rem;
  gap: 0.5rem;
`;

const OrderNumber = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`;

const OrderID = styled.span`
  color: #c8102e;
  font-weight: bold;
`;

const OrderDate = styled.div`
  font-size: 1.2rem;
  padding-top: 0.5rem;
`;

const Quantity = styled.div`
  font-weight: bold;
  color: ${Styles.color.recentitems.quantity};
  padding: 0.5rem 0;
`;

const Name = styled.h3`
  color: ${Styles.color.recentitems.orderitem};
  font-size: 0.9rem;
  text-align: left;
  line-height: 1rem;
  font-weight: normal;
  margin: 0;
`;

const MoreItems = styled.span`
  color: #c8102e;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ViewDetailsButton = styled(Button)`
  white-space: pre;

  @media (max-width: ${Styles.breakpoint}) {
    font-size: 0.9rem;
  }
`;

const DialogHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
  color: ${Styles.color.recentitems.modal.heading};
`;

const OrderDetails = styled(Dialog)``;
const OrderDetailsWrapper = styled.div`
  text-align: left;
  margin-top: 2.5rem;
`;
const ModalOrderDate = styled.div`
  font-weight: bold;
`;
const ModalOrderNumber = styled.div``;
const ModalOrderTime = styled.div``;
const OrderMethod = styled.div``;
const OrderLocation = styled.div``;

const ReorderButton = styled(Button)`
  white-space: pre;
  @media (max-width: ${Styles.breakpoint}) {
    font-size: 0.9rem;
  }
`;

const Modal = styled.div`
  background-color: ${Styles.color.recentitems.modal.background};
  color: ${Styles.color.recentitems.modal.text};
  border-radius: 5px;
  max-width: 40rem;
  padding: 1rem 0;
`;

const ModalTop = styled.div`
  max-height: 30rem;
  overflow-y: scroll;
  padding: 0 7rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    padding: 0 2rem;
  }
`;

const OrderedItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 1rem;
`;

const OrderedItem = styled.div`
  border-top: 1px solid ${Styles.color.recentitems.modal.border};
  padding: 1.5rem 0;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  margin: 0;
`;

const ModalButtonWrapper = styled.div`
  gap: 1rem;
  justify-content: center;
  padding: 0 7rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    padding: 0 2rem;
  }
`;

const ModalReorderButton = styled(Button)`
  margin: 0.5rem;
  width: 100%;
`;

const PriceSubjectToChange = styled.div`
  text-align: left;
  margin: 1rem 0;
  font-size: 1.1rem;
`;

const ModalTotal = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${Styles.color.recentitems.modal.border};
  padding: 2rem 0;
`;

const ModalNeedHelpButton = styled(Button)`
  margin: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
`;

const RecentOrder = ({ id, createdAt, items }) => {
  const { addMultipleToCart, items: allCartItems } = React.useContext(
    CartContext
  );
  const { userEmail, userID } = React.useContext(UserContext);
  const { selectedLocale } = React.useContext(LocaleContext);
  const [sanityItems, setSanityItems] = React.useState([]);
  const [isReordering, setIsReordering] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(async () => {
    setSanityItems(
      await fetchItems({ sanityIDs: items.map((item) => item.sanityItemID) })
    );
  }, []);

  React.useEffect(() => {
    if (isReordering) {
      initiateCheckout({
        userEmail,
        userID,
        items: allCartItems,
        currencyCode: selectedLocale.currencyCode,
      });
    }
  }, [isReordering]);

  let totalItems = 0;

  items.forEach((item) => (totalItems += item.quantity));
  const orderTime = format(parseISO(createdAt), "MMM d, h:mm aa");
  const modalOrderDate = format(parseISO(createdAt), "MMM d, yyyy");
  const modalOrderTime = format(parseISO(createdAt), "h:mm aa");

  const handleReorderClick = async () => {
    const additions = [];
    for (const item of items) {
      const correspondingSanityItem = sanityItems.find(
        (sanityItem) => sanityItem._id === item.sanityItemID
      );
      additions.push({
        quantity: item.quantity,
        item: {
          name: correspondingSanityItem.name,
          image: correspondingSanityItem.primaryImage.asset.url,
          id: correspondingSanityItem._id,
          price: correspondingSanityItem.price,
        },
      });
    }
    addMultipleToCart(additions);
    setIsReordering(true);
  };

  const handleViewDetailsClick = () => {
    setDialogOpen(true);
  };

  console.log({ items });

  return (
    <>
      <Wrapper>
        <Left>
          <OrderNumber>
            Order Number: <OrderID>{formatOrderNumber(id)}</OrderID>
          </OrderNumber>
          <OrderDate>{orderTime}</OrderDate>
          <Quantity>
            {totalItems} item{totalItems > 1 && "s"}
          </Quantity>
          <Name>
            {items[0].name}
            {totalItems > 1 && (
              <>
                , <MoreItems>{totalItems - 1} more items...</MoreItems>
              </>
            )}
          </Name>
        </Left>
        <Right>
          <ViewDetailsButton
            variant="outline"
            size="lg"
            onClick={handleViewDetailsClick}
            $fullWidth
          >
            View Details
          </ViewDetailsButton>
          <ReorderButton
            variant="primary"
            size="lg"
            onClick={handleReorderClick}
            $fullWidth
          >
            Reorder
          </ReorderButton>
        </Right>
      </Wrapper>
      <OrderDetails onClick={() => setDialogOpen(false)} open={dialogOpen}>
        <Modal>
          <DialogHeading>Order Details</DialogHeading>
          <ModalTop>
            <OrderDetailsWrapper>
              <ModalOrderDate>{modalOrderDate}</ModalOrderDate>
              <ModalOrderNumber>
                Order Number: {formatOrderNumber(id)}
              </ModalOrderNumber>
              <ModalOrderTime>Order time: {modalOrderTime}</ModalOrderTime>
              <OrderMethod>Method: Take Out</OrderMethod>
              <OrderLocation>
                Location: 130 King Street West, TORONTO, Ontario
              </OrderLocation>
            </OrderDetailsWrapper>
            <OrderedItemsWrapper>
              {items.map((item) => (
                <OrderedItem key={id}>
                  <b>{item.name}</b>
                  {item.quantity}
                  {item.price}
                </OrderedItem>
              ))}
            </OrderedItemsWrapper>
            <ModalTotal>
              <span>Total</span>
              <span>$12.00</span>
            </ModalTotal>
          </ModalTop>
          <ModalButtonWrapper>
            <ModalReorderButton
              variant="primary"
              size="lg"
              onClick={handleReorderClick}
            >
              Reorder
            </ModalReorderButton>
            <PriceSubjectToChange>
              Prices, discounts and availability are subject to change when you
              reorder.
            </PriceSubjectToChange>
            <ModalNeedHelpButton
              variant="outline"
              size="md"
              onClick={() => setDialogOpen(false)}
            >
              Need Help?
            </ModalNeedHelpButton>
          </ModalButtonWrapper>
        </Modal>
      </OrderDetails>
    </>
  );
};

export default RecentOrder;
