import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import GlobalStyles from "../components/GlobalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Menu = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
      </main>
      <Footer />
    </>
  );
};

ReactDOM.render(<Menu />, document.querySelector("#root"));
