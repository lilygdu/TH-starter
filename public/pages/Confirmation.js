import React from "react";
import Styles from "../styles";
import styled from "styled-components";
import { parseISO, format } from "date-fns";
import { useHistory } from "react-router-dom";
import { fetchSession } from "../utils/stripe";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { formatCents } from "../utils/price";
import Button from "../components/Button";

const Main = styled.main`
  margin: 10rem auto;
  text-align: centeright;
  max-width: 50rem;
`;
const Aside = styled.aside`
  background-color: ${Styles.color.confirmationpage.asidebackground};
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25rem;
  justify-content: center;
  z-index: -1;
  padding: 15rem 5rem;
  font-size: 1.4rem;
  line-height: 1.1;
`;

const HomeButton = styled(Button)`
  margin: 0 auto;
`;

const MainSection = styled.section`
  position: relative;
  margin-left: 25rem;
  max-width: 38rem;
`;

const OrderPlacedHeading = styled.h1`
  font-size: 1.6rem;
  line-height: 1.3;
`;

const OrderInstructions = styled.p`
  color: ${Styles.color.confirmationpage.graytext};
  font-size: 0.9rem;
  line-height: 1.1rem;
`;

const OrderNumber = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

const OrderNumberID = styled.span`
  color: ${Styles.color.confirmationpage.redtext};
  font-size: 0.9rem;
`;

const OrderTime = styled.p`
  color: ${Styles.color.confirmationpage.graytext};
  font-size: 0.9rem;
  margin: 0;
`;

const OrderMethod = styled.p`
  color: ${Styles.color.confirmationpage.graytext};
  font-size: 0.9rem;
  margin: 0 0 5rem 0;
`;

const OrderDetails = styled.div`
  background-color: ${Styles.color.confirmationpage.asidebackground};
  padding: 1rem;
`;

const OrderDetailsHeading = styled.h3`
  font-size: 1.4rem;
  text-align: left;
  margin-left: 1.3rem;
  color: ${Styles.color.confirmationpage.graytext};
`;

const OrderedItem = styled.div`
  background-color: white;
  margin: 1rem;
  text-align: left;
  padding: 0.8rem;
  line-height: 0.6rem;
`;

const OrderedItemName = styled.h4`
  color: ${Styles.color.confirmationpage.graytext};
`;

const OrderedItemQuantity = styled.p`
  color: ${Styles.color.confirmationpage.graytext};
`;
const OrderedItemPrice = styled.p`
  color: ${Styles.color.confirmationpage.graytext};
`;

const Currency = styled.span`
  text-transform: uppercase;
`;

const OrderTotal = styled.h4`
  color: ${Styles.color.confirmationpage.graytext};
  text-align: right;
  margin: 3rem 1.2rem 0 0;
`;

const ViewReceipt = styled.p`
  text-align: right;
  line-height: 1rem;
  color: ${Styles.color.confirmationpage.redtext};
  text-decoration: underline;
  cursor: pointer;
  margin: 0 1.2rem 0 0;
`;

const Confirmation = () => {
  const query = new URLSearchParams(window.location.search);
  const sessionID = query.get("session_id");
  const { userName } = React.useContext(UserContext);
  const { clearCart } = React.useContext(CartContext);
  const history = useHistory();
  const [session, setSession] = React.useState({});
  const [lineItems, setLineItems] = React.useState([]);

  React.useEffect(async () => {
    const { response, data } = await fetchSession(sessionID);
    if (response.ok) {
      setSession(data.session);
      setLineItems(data.lineItems.data);
    } else {
      history.push("/");
    }
  }, []);

  React.useEffect(clearCart, []);

  console.log(session, lineItems);

  const orderTime =
    session.metadata && format(parseISO(session.metadata.createdAt), "h:mm aa");

  return (
    <main
      style={{ margin: "10rem auto", textAlign: "center", maxWidth: "50rem" }}
    >
      <Aside>
        <h2>Enjoy your order. See you soon!</h2>
        <HomeButton variant="primary" size="lg">
          Home
        </HomeButton>
      </Aside>
      <MainSection>
        <OrderPlacedHeading>
          Your order has been placed in line with other customers and will be
          ready as soon as possible!
        </OrderPlacedHeading>
        <OrderInstructions>
          Drive up to the ordering screen and let us know you ordered online for{" "}
          {userName}
        </OrderInstructions>
        <OrderNumber>
          <b>
            Order Number:{" "}
            <OrderNumberID>{sessionID.slice(9, 19)}</OrderNumberID>{" "}
          </b>
        </OrderNumber>
        <OrderTime>
          Order Time: <b>{orderTime}</b>
        </OrderTime>
        <OrderMethod>
          Method: <b>Drive Thru</b>
        </OrderMethod>

        <OrderDetails>
          <OrderDetailsHeading>Your Order</OrderDetailsHeading>
          {lineItems.map((item) => (
            <OrderedItem>
              <OrderedItemName>{item.description}</OrderedItemName>
              <OrderedItemQuantity>
                Quantity: {item.quantity}
              </OrderedItemQuantity>
              <OrderedItemPrice>
                Price: <Currency>{item.price.currency}</Currency>$
                {formatCents(item.price.unit_amount)}
              </OrderedItemPrice>
            </OrderedItem>
          ))}
          <OrderTotal>
            Total: <Currency>{session.currency}</Currency>$
            {formatCents(session.amount_total)}
          </OrderTotal>
          <ViewReceipt>View Receipt</ViewReceipt>
        </OrderDetails>
      </MainSection>
    </main>
  );
};

export default Confirmation;
