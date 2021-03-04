const query = `
  query {
    allCategory{
      _id
      name
      primaryImage {
        asset {
          url
          metadata {
            lqip
          }
        }
      }
    } 
  }
`;

export const fetchCategories = async () => {
  const response = await fetch(
    "https://kgjhft50.api.sanity.io/v1/graphql/production/default",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    }
  );
  const data = await response.json();
  const categories = data.data.allCategory;
  return categories;
};
