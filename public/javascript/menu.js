const categorySection = document.querySelector("#categories");
const menuElement = document.querySelector("h1");
let categories = [];
let categoryCards = [];

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
  categories = data.data.allCategory;
}

function showCategories() {
  categorySection.innerHTML = categories.map(renderCategory).join("");
  menuElement.classList.remove("hidden");
  categoryCards = document.querySelectorAll(".category");
}

const renderCategory = (category) => `
  <a href="#" class="category">
    <img src="${category.primaryImage.asset.url}" alt="${category.name}" />
    <h2>${category.name}</h2>
  </a>
`;

async function initialPageLoad() {
  await fetchCategories();
  showCategories();
}

initialPageLoad();
