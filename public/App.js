import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import CartContextProvider from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ConfirmOTP from "./pages/ConfirmOTP";
import Category from "./pages/Category";
import Confirmation from "./pages/Confirmation";
import LocaleContextProvider from "./context/LocaleContext";

const App = () => (
  <BrowserRouter>
    <LocaleContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Menu />
            </Route>
            <Route path="/account" exact>
              <Account />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/confirm-otp" exact>
              <ConfirmOTP />
            </Route>
            <Route path="/category/:categoryID">
              <Category />
            </Route>
            <Route path="/confirmation" exact>
              <Confirmation />
            </Route>
          </Switch>
          <Footer />
        </CartContextProvider>
      </UserContextProvider>
    </LocaleContextProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.querySelector("#root"));
