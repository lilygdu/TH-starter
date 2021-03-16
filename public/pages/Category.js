import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Styles from "../styles";
import LoadingAnimation from "../components/LoadingAnimation";
import Button from "../components/Button";
import Item from "../components/Item";
import { fetchCategory } from "../utils/category";
import { Link } from "react-router-dom";

const Main = styled.main`
  max-width: 80rem;
  margin: 9rem auto 0;
  min-height: 50rem;
  position: relative;
`;

const MainMenuButton = styled(Link)`
  position: absolute;
  text-decoration: none;
  top: 1.2rem;
  left: 0rem;
  margin-left: 4rem;
  background-color: ${Styles.color.button.inverse.background};
  border-color: ${Styles.color.button.inverse.border};
  color: ${Styles.color.button.inverse.text};
  padding: 0.5rem 1rem;
  border-radius: 9999rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  &:focus {
    outline: none;
    box-shadow: ${Styles.boxShadow.button};
  }

  &:hover {
    background-color: ${Styles.color.button.inverse.hover.background};
    border-color: ${Styles.color.button.inverse.hover.border};
  }
  &:active {
    background-color: ${Styles.color.button.inverse.active.background};
    color: ${Styles.color.button.inverse.active.text};
    border-color: ${Styles.color.button.inverse.active.border};
  }

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const Arrow = styled.span`
  font-size: 0.75rem;
`;

const CategoryHeading = styled.h1`
  font-size: 3.2rem;
  text-align: center;
  height: 3.5rem;
`;

const Items = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
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
    <>
      <Helmet>
        <title>Tim Hortons - {category.name}</title>
      </Helmet>
      <Main>
        <MainMenuButton to="/">
          <Arrow>
            <i className="fas fa-arrow-left"></i>
          </Arrow>
          Main Menu
        </MainMenuButton>
        <CategoryHeading>{category.name}</CategoryHeading>
        <Items>
          {!category.items?.length && (
            <LoadingContainer>
              <LoadingAnimation />
            </LoadingContainer>
          )}
          {(category.items || []).map((item) => (
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
    </>
  );
};

export default Category;
