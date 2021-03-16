import React from "react";
import Styles from "../styles";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { parseISO, format } from "date-fns";
import { useHistory } from "react-router-dom";
import { fetchSession } from "../utils/stripe";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { formatCents } from "../utils/price";
import { formatOrderNumber } from "../utils/order";
import Button from "../components/Button";

const Main = styled.main`
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  z-index: 4;
  background-color: white;
  display: grid;
  grid-template-columns: 25rem 1fr;
  margin-top: 5rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    grid-template-columns: 1fr;
  }
`;

const Aside = styled.aside`
  background-color: ${Styles.color.confirmationpage.asidebackground};
  justify-content: center;
  padding: 15rem 5rem;
  font-size: 1.4rem;
  line-height: 1.1;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const Heading = styled.h2`
  text-transform: uppercase;
  text-align: center;
`;

const HomeButton = styled(Button)`
  margin: 0 auto;
`;

const MainSection = styled.section`
  text-align: center;
  padding: 0 1rem;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 5rem;
`;

const MainContent = styled.div`
  max-width: 26rem;
  margin: 0 auto 5rem;
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
  max-width: 25rem;
  margin: 0 auto;
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

const Header = styled.header`
  height: 5rem;
  background-color: ${Styles.color.confirmationpage.header.background};
  color: ${Styles.color.confirmationpage.header.text};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    height: 3.5rem;
  }
`;

const MyOrder = styled.h1`
  font-size: 1.5rem;
  margin: 0;
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

  const orderTime =
    session.metadata && format(parseISO(session.metadata.createdAt), "h:mm aa");

  return (
    <>
      <Helmet>
        <title>Tim Hortons - Order Confirmation</title>
      </Helmet>
      <Header>
        <MyOrder>My Order</MyOrder>
      </Header>
      <Main>
        <Aside>
          <Heading>Enjoy your order. See you soon!</Heading>
          <HomeButton variant="primary" size="lg" to="/">
            Home
          </HomeButton>
        </Aside>
        <MainSection>
          <MainContent>
            <OrderPlacedHeading>
              Your order has been placed in line with other customers and will
              be ready as soon as possible!
            </OrderPlacedHeading>
            <OrderInstructions>
              Drive up to the ordering screen and let us know you ordered online
              for {userName}
            </OrderInstructions>
            <OrderNumber>
              <b>
                Order Number:{" "}
                <OrderNumberID>{formatOrderNumber(sessionID)}</OrderNumberID>{" "}
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
                <OrderedItem key={item.id}>
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
                {session.amount_total && formatCents(session.amount_total)}
              </OrderTotal>
              <ViewReceipt>View Receipt</ViewReceipt>
            </OrderDetails>
          </MainContent>
        </MainSection>
      </Main>
    </>
  );
};

export default Confirmation;
