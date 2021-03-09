const query = (categoryID) => `
  query {
    Category(id:"${categoryID}"){
      name
      items{
        _id
        name
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
  }
`;

export const fetchCategory = async (categoryID) => {
  const response = await fetch(
    "https://kgjhft50.api.sanity.io/v1/graphql/production/default",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query(categoryID) }),
    }
  );
  const data = await response.json();
  const category = data.data.Category;
  return category;
};
