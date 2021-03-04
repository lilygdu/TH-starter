import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import GlobalStyles from "../components/GlobalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Styles from "../styles";
import LoadingAnimation from "../components/LoadingAnimation";
import { fetchCategories } from "../utils/menu";
import Category from "../components/Category";

const Main = styled.main`
  max-width: 60rem;
  margin: 9rem auto 0;
  min-height: 50rem;
`;

const MenuHeading = styled.h1`
  font-size: 3.2rem;
  text-align: center;
  height: 3.5rem;
`;

const Categories = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1rem;
`;

const LoadingContainer = styled.div`
  margin: 15rem auto;
  grid-column: 1 / -1;
  color: ${Styles.color.loading.red};
`;

const Menu = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(async () => {
    setCategories(await fetchCategories());
  }, []);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Main>
        <MenuHeading>{categories.length > 0 && "Menu"}</MenuHeading>
        <Categories>
          {categories.length === 0 && (
            <LoadingContainer>
              <LoadingAnimation />
            </LoadingContainer>
          )}
          {categories.map((category) => (
            <Category
              key={category._id}
              name={category.name}
              image={category.primaryImage.asset.url}
              lqip={category.primaryImage.asset.metadata.lqip}
            />
          ))}
        </Categories>
      </Main>
      <Footer />
    </>
  );
};

ReactDOM.render(<Menu />, document.querySelector("#root"));
