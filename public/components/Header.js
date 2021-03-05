import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Logo from "url:../images/th-logo.svg";
import Styles from "../styles";
import { UserContext } from "../context/UserContext";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const HeaderTop = styled.div`
  height: 5rem;
  background-color: ${Styles.color.header.top.background};
  color: ${Styles.color.header.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 0 3.5rem;
  position: relative;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    height: 3.5rem;
    padding: 0;
  }
`;

const HeaderLeftNav = styled.nav`
  width: 20rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
`;

const NavListItem = styled.li``;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${Styles.color.header.text};
  font-size: 1.125rem;

  &:hover {
    border-bottom: 2px solid ${Styles.color.header.text};
  }
`;

const HeaderLogoLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const HeaderLogoImage = styled.img`
  height: 39%;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 21.5rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const HeaderBottom = styled.div`
  height: 1.9rem;
  background: linear-gradient(
    to right,
    ${Styles.color.header.top.gradient.sides} 0%,
    ${Styles.color.header.top.gradient.middle} 50%,
    ${Styles.color.header.top.gradient.sides} 100%
  );
  color: ${Styles.color.header.text};
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-left: 3.5rem;
  padding-right: 2rem;
  font-size: 0.9rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const HeaderBottomLeft = styled.div``;
const HeaderBottomRight = styled.div``;

const ChangeServiceMode = styled.span`
  color: ${Styles.color.header.text};
  font-weight: 700;
  margin-left: 1rem;
`;

const AppHeader = () => {
  const { isLoggedIn } = React.useContext(UserContext);
  return (
    <Header>
      <HeaderTop>
        <HeaderLeftNav>
          <NavList>
            <NavListItem>
              <NavLink to="#">Order</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink to="#">Catering</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink to="#">
                More <i className="fas fa-caret-down"></i>
              </NavLink>
            </NavListItem>
          </NavList>
        </HeaderLeftNav>
        <HeaderLogoLink to="/">
          <HeaderLogoImage src={Logo} alt="logo" />
        </HeaderLogoLink>
        <HeaderRight>
          {isLoggedIn ? (
            <Button to="/account" variant="primary" size="sm">
              <i className="far fa-user"></i>
            </Button>
          ) : (
            <Button to="/signin" variant="inverse" size="md">
              Log In
            </Button>
          )}
          <Button variant="primary" size="md">
            <i className="fas fa-shopping-bag"></i> 0
          </Button>
        </HeaderRight>
      </HeaderTop>
      <HeaderBottom>
        <HeaderBottomLeft>
          How would you like to receive this order?
          <ChangeServiceMode>Change</ChangeServiceMode>
        </HeaderBottomLeft>
        <HeaderBottomRight>
          <i className="fas fa-globe"></i>
          EN/CA
        </HeaderBottomRight>
      </HeaderBottom>
    </Header>
  );
};

export default AppHeader;
