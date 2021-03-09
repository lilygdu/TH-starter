import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Styles from "../styles";
import LoadingAnimation from "../components/LoadingAnimation";
import Item from "../components/Item";
import { fetchCategory } from "../utils/category";

const Main = styled.main`
  max-width: 60rem;
  margin: 9rem auto 0;
  min-height: 50rem;
`;

const CategoryHeading = styled.h1`
  font-size: 3.2rem;
  text-align: center;
  height: 3.5rem;
`;

const Items = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1rem;
`;

const LoadingContainer = styled.div`
  margin: 15rem auto;
  grid-column: 1 / -1;
  color: ${Styles.color.loading.red};
`;

const Category = () => {
  const { categoryID } = useParams();
  const [category, setCategory] = React.useState({ name: "", items: [] });

  React.useEffect(async () => {
    setCategory(await fetchCategory(categoryID));
  }, []);

  return (
    <Main>
      <CategoryHeading>{category.name}</CategoryHeading>
      <Items>
        {category.items.length === 0 && (
          <LoadingContainer>
            <LoadingAnimation />
          </LoadingContainer>
        )}
        {category.items.map((item) => (
          <Item
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.primaryImage.asset.url}
            lqip={item.primaryImage.asset.metadata.lqip}
            price={item.price}
            calories={item.calories}
          />
        ))}
      </Items>
    </Main>
  );
};

export default Category;
