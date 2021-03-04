import React from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Colors from "../components/Colors";

const PageDemo = () => {
  return (
    <>
      <Header />
      <h1>Our Beautiful Colors</h1>
      <Colors />
      <Footer />
    </>
  );
};

ReactDOM.render(<PageDemo />, document.querySelector("#root"));
