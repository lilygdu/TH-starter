const categories = document.querySelector("#categories");

const query = `
  query {
    allCategory{
      name
      primaryImage {
        asset {
          url
        }
      }
    } 
  }
`;

async function fetchCategories() {
  const response = await fetch(
    "https://kgjhft50.api.sanity.io/v1/graphql/production/default",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    }
  );
  const data = await response.json();
  categories.innerHTML = data.data.allCategory.map(renderCategory).join("");
}

const renderCategory = (category) => `
  <a href="#" class="category">
    <img src="${category.primaryImage.asset.url}" alt="${category.name}" />
    <h2>${category.name}</h2>
  </a>
`;

fetchCategories();
