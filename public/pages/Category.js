import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TrackingContext } from "../context/TrackingContext";
import Styles from "../styles";
import LoadingAnimation from "../components/LoadingAnimation";
import Item from "../components/Item";
import { fetchCategory } from "../utils/category";
import Button from "../components/Button";

const Main = styled.main`
  max-width: 80rem;
  margin: 9rem auto 0;
  min-height: 50rem;
  position: relative;
  padding: 0 1rem;
`;

const MainMenuButton = styled(Button)`
  position: absolute;
  top: 1.2rem;
  left: 0rem;
  margin-left: 4rem;
  width: 8rem;

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

  @media only screen and (max-width: ${Styles.breakpoint}) {
    font-size: 2rem;
  }
`;

const Items = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 5rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    gap: 1rem;
  }
`;

const LoadingContainer = styled.div`
  margin: 15rem auto;
  grid-column: 1 / -1;
  color: ${Styles.color.loading.red};
`;

const Category = () => {
  const { categoryID } = useParams();
  const [category, setCategory] = React.useState({ name: "", items: [] });
  const { trackClick } = React.useContext(TrackingContext);

  React.useEffect(async () => {
    setCategory(await fetchCategory(categoryID));
  }, []);

  return (
    <>
      <Helmet>
        <title>Tim Hortons - {category.name}</title>
      </Helmet>
      <Main>
        <MainMenuButton
          to="/"
          onClick={trackClick}
          variant="secondary"
          size="md"
          data-tracking-action="navigate-back-to-main-menu"
          data-tracking-element="link"
        >
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
