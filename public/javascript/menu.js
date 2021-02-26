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
          metadata {
            lqip
          }
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

function blurUp(image) {
  image.classList.remove("hidden");
  const preview = image.closest(".image-wrapper").querySelector(".preview");
  preview.addEventListener("transitionend", () => {
    preview.classList.add("not-visible");
  });
  preview.classList.add("transparent");
}

const renderCategory = (category) => `
  <a href="#" class="category">
    <div class="image-wrapper">
      <img 
        src="${category.primaryImage.asset.metadata.lqip}" 
        alt="${category.name}-preview" 
        class="preview"
        loading="lazy" 
      />
      <img 
        src="${category.primaryImage.asset.url}" 
        alt="${category.name}" 
        class="hidden"
        onload="blurUp(this)"
        loading="lazy"
      />
    </div>
    <h2>${category.name}</h2>
  </a>
`;

async function initialPageLoad() {
  await fetchCategories();
  showCategories();
}

initialPageLoad();
