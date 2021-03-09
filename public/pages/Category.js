import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Styles from "../styles";
import BaseButton from "../components/Button";
import { UserContext } from "../context/UserContext";
import { fetchCategory } from "../utils/category";
import { fetchCategories } from "../utils/menu";

const Category = () => {
  const { categoryID } = useParams();
  const [category, setCategory] = React.useState({ name: "", items: [] });

  React.useEffect(async () => {
    setCategory(await fetchCategory(categoryID));
  }, []);

  console.log({ category });

  return (
    <main style={{ marginTop: "5rem" }}>
      <h1>Hi, I'm the category page!</h1>
      <h2>You are looking for {category.name}</h2>
      <h3>It has {category.items.length} items!</h3>
    </main>
  );
};

export default Category;
