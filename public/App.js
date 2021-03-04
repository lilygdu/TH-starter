import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyles from "./components/GlobalStyles";
import Menu from "./pages/Menu";
import Account from "./pages/Account";

const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <Header isLoggedIn />
    <Switch>
      <Route path="/" exact>
        <Menu />
      </Route>
      <Route path="/account" exact>
        <Account />
      </Route>
    </Switch>
    <Footer />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.querySelector("#root"));
