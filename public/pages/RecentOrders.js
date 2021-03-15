import React from "react";
import styled from "styled-components";
import { fetchRecentItemsSanityIds, fetchRecentOrders } from "../utils/recent";
import { UserContext } from "../context/UserContext";
import RecentItem from "../components/RecentItem";
import RecentOrder from "../components/RecentOrder";

const Main = styled.main`
  margin: 10rem auto;
  max-width: 51.5rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
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

const RecentOrders = () => {
  const [recentItems, setRecentItems] = React.useState([]);
  const [recentOrders, setRecentOrders] = React.useState([]);
  const { userID } = React.useContext(UserContext);

  React.useEffect(async () => {
    const { response, data } = await fetchRecentItemsSanityIds({ userID });
    if (response.ok) {
      setRecentItems(data.items);
    }
  }, []);

  React.useEffect(async () => {
    const { response, data } = await fetchRecentOrders({ userID });
    if (response.ok) {
      setRecentOrders(data.purchases);
    }
  }, []);

  console.log({ recentOrders });

  return (
    <Main>
      <RecentItems>
        <Heading>Recent Items</Heading>
        <Carousel>
          {recentItems.map((sanityID) => (
            <RecentItem key={sanityID} sanityID={sanityID} />
          ))}
        </Carousel>
      </RecentItems>

      <Orders>
        <Heading>Recent Orders</Heading>
        {recentOrders.map(({ id, createdAt, items }) => (
          <RecentOrder key={id} id={id} createdAt={createdAt} items={items} />
        ))}
      </Orders>
    </Main>
  );
};

export default RecentOrders;
