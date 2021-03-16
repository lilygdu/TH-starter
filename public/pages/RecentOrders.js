import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { fetchRecentItemsSanityIds } from "../utils/recentItems";
import { UserContext } from "../context/UserContext";
import RecentItem from "../components/RecentItem";

const Main = styled.main`
  margin: 10rem auto;
  max-width: 51.5rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const RecentItems = styled.section``;

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  padding: 1rem;
`;

const RecentOrders = () => {
  const [recentItems, setRecentItems] = React.useState([]);
  const { userID } = React.useContext(UserContext);

  React.useEffect(async () => {
    const { response, data } = await fetchRecentItemsSanityIds({ userID });
    if (response.ok) {
      setRecentItems(data.items);
    }
  }, []);

  console.log({ recentItems });

  return (
    <>
      <Helmet>
        <title>Tim Hortons - Recent Orders</title>
      </Helmet>
      <Main>
        <RecentItems>
          <Heading>Recent Items</Heading>
          <Carousel>
            {recentItems.map((sanityID) => (
              <RecentItem key={sanityID} sanityID={sanityID} />
            ))}
          </Carousel>
        </RecentItems>
      </Main>
    </>
  );
};

export default RecentOrders;
