import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import { Helmet } from "react-helmet";
import { fetchRecentItemsSanityIds, fetchRecentOrders } from "../utils/recent";
import { UserContext } from "../context/UserContext";
import Button from "../components/Button";
import RecentItem from "../components/RecentItem";
import RecentOrder from "../components/RecentOrder";
import LoadingAnimation from "../components/LoadingAnimation";

const Main = styled.main`
  margin: ${({ topMargin }) => (topMargin ? "16rem auto" : "10rem auto")};
  max-width: 51.5rem;
  min-height: 25rem;
`;

const LoadingContainer = styled.div`
  margin: 15rem auto;
  grid-column: 1 / -1;
  color: ${Styles.color.loading.red};
`;

const ItemsHeading = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const OrdersHeading = styled.h1`
  font-size: ${({ large }) => (large ? "3.4rem" : "1.5rem")};
  margin: ${({ large }) => (large ? "0" : "inherit")};
  text-align: center;
`;

const RecentItems = styled.section`
  width: 100%;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

const Orders = styled.section`
  padding: 0 1rem;
`;

const EmptyOrdersDisplay = styled.section`
  text-align: center;
`;

const CoffeeIcon = styled.div`
  color: #c8102e;
  font-size: 4rem;
  margin: 1.5rem auto;
  height: 5rem;
`;

const EmptyOrdersHeading = styled.h2`
  text-transform: uppercase;
  font-size: 1.3rem;
  margin: 0;
`;

const StartOrderText = styled.div`
  font-size: 1.2rem;
  margin: 0.7rem auto;
`;

const StartOrderButton = styled(Button)`
  margin: 2rem auto;
  width: 13rem;
`;

const RecentOrders = () => {
  const [recentItems, setRecentItems] = React.useState([]);
  const [recentOrders, setRecentOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { userID, redirectIfNotLoggedIn } = React.useContext(UserContext);
  const showRecentOrders = recentOrders.length > 0;

  React.useEffect(async () => {
    const {
      response: itemResponse,
      data: itemData,
    } = await fetchRecentItemsSanityIds({
      userID,
    });
    const {
      response: orderResponse,
      data: orderData,
    } = await fetchRecentOrders({ userID });

    if (itemResponse.ok && orderResponse.ok) {
      setRecentItems(itemData.items);
      setRecentOrders(orderData.purchases);
    }

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    redirectIfNotLoggedIn();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tim Hortons - Recent Orders</title>
      </Helmet>
      <Main topMargin={!showRecentOrders}>
        {isLoading ? (
          <LoadingContainer>
            <LoadingAnimation />
          </LoadingContainer>
        ) : (
          <>
            {showRecentOrders && (
              <RecentItems>
                <ItemsHeading>Recent Items</ItemsHeading>
                <Carousel>
                  {recentItems.map((sanityID) => (
                    <RecentItem key={sanityID} sanityID={sanityID} />
                  ))}
                </Carousel>
              </RecentItems>
            )}
            <Orders>
              <OrdersHeading large={!showRecentOrders}>
                Recent Orders
              </OrdersHeading>
              {recentOrders.map(({ id, createdAt, items }) => (
                <RecentOrder
                  key={id}
                  id={id}
                  createdAt={createdAt}
                  items={items}
                />
              ))}
              {!showRecentOrders && (
                <EmptyOrdersDisplay>
                  <CoffeeIcon>
                    <i className="fas fa-mug-hot"></i>
                  </CoffeeIcon>
                  <EmptyOrdersHeading>
                    Recent orders & items will appear here
                  </EmptyOrdersHeading>
                  <StartOrderText>Go start a new order now!</StartOrderText>
                  <StartOrderButton to="/" variant="primary" size="lg">
                    Start Order
                  </StartOrderButton>
                </EmptyOrdersDisplay>
              )}
            </Orders>
          </>
        )}
      </Main>
    </>
  );
};

export default RecentOrders;
