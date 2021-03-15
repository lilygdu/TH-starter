export const fetchRecentItemsSanityIds = async ({ userID }) => {
  const response = await fetch(`/users/${userID}/recent_items`);
  const data = await response.json();
  return { response, data };
};

export const fetchRecentOrders = async ({ userID }) => {
  const response = await fetch(`/users/${userID}/recent_orders`);
  const data = await response.json();
  return { response, data };
};

const itemQuery = (sanityID) => `
  query {
    Item(id:"${sanityID}"){
      name
      price
      calories
      primaryImage {
        asset{
          url
          metadata{
            lqip
          }
        }
      }
    }
  }
`;

export const fetchItem = async ({ sanityID }) => {
  const response = await fetch(
    "https://kgjhft50.api.sanity.io/v1/graphql/production/default",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: itemQuery(sanityID) }),
    }
  );
  const data = await response.json();
  const item = data.data.Item;
  return item;
};
