import React from "react";
import { formatOrderNumber } from "../utils/order";
import { parseISO, format } from "date-fns";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { LocaleContext } from "../context/LocaleContext";
import Button from "../components/Button";
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
  text-decoration: underline;
`;

const ViewDetailsButton = styled(Button)`
  white-space: pre;

  @media (max-width: ${Styles.breakpoint}) {
    font-size: 0.9rem;
  }
`;

const ReorderButton = styled(Button)`
  white-space: pre;
  @media (max-width: ${Styles.breakpoint}) {
    font-size: 0.9rem;
  }
`;

const RecentOrder = ({ id, createdAt, items }) => {
  const { addMultipleToCart, items: allCartItems } = React.useContext(
    CartContext
  );
  const { userEmail, userID } = React.useContext(UserContext);
  const { selectedLocale } = React.useContext(LocaleContext);
  const [sanityItems, setSanityItems] = React.useState([]);
  const [isReordering, setIsReordering] = React.useState(false);

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

  return (
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
        <ViewDetailsButton variant="outline" size="lg" $fullWidth>
          View Details
        </ViewDetailsButton>
        <ReorderButton
          variant="primary"
          size="lg"
          $fullWidth
          onClick={handleReorderClick}
        >
          Reorder
        </ReorderButton>
      </Right>
    </Wrapper>
  );
};

export default RecentOrder;
