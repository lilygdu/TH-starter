import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ConfirmOTP from "./pages/ConfirmOTP";
import UserContextProvider from "./context/UserContext";

const App = () => (
  <BrowserRouter>
    <UserContextProvider>
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
      </Switch>
      <Footer />
    </UserContextProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.querySelector("#root"));
