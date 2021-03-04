import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Logo from "url:../images/th-logo.svg";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const HeaderTop = styled.div`
  height: 5rem;
  background-color: #c8102e;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 0 3.5rem;
  position: relative;

  @media only screen and (max-width: 815px) {
    height: 3.5rem;
    padding: 0;
  }
`;

const HeaderLeftNav = styled.nav`
  width: 20rem;

  @media only screen and (max-width: 815px) {
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

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 1.125rem;

  &:hover {
    border-bottom: 2px solid white;
  }
`;

const HeaderLogoLink = styled.a`
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

  @media only screen and (max-width: 815px) {
    display: none;
  }
`;

const HeaderBottom = styled.div`
  height: 1.9rem;
  background: linear-gradient(
    to right,
    rgba(199, 16, 47, 1) 0%,
    rgba(174, 11, 38, 1) 50%,
    rgba(199, 16, 47, 1) 100%
  );
  color: white;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-left: 3.5rem;
  padding-right: 2rem;
  font-size: 0.9rem;

  @media only screen and (max-width: 815px) {
    display: none;
  }
`;

const HeaderBottomLeft = styled.div``;
const HeaderBottomRight = styled.div``;

const ChangeServiceMode = styled.span`
  color: white;
  font-weight: 700;
  margin-left: 1rem;
`;

const AppHeader = ({ isLoggedIn }) => {
  return (
    <Header>
      <HeaderTop>
        <HeaderLeftNav>
          <NavList>
            <NavListItem>
              <NavLink href="#">Order</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink href="#">Catering</NavLink>
            </NavListItem>
            <NavListItem>
              <NavLink href="#">
                More <i class="fas fa-caret-down"></i>
              </NavLink>
            </NavListItem>
          </NavList>
        </HeaderLeftNav>
        <HeaderLogoLink href="/">
          <HeaderLogoImage src={Logo} alt="logo" />
        </HeaderLogoLink>
        <HeaderRight>
          {isLoggedIn ? (
            <Button href="/account.html" as="a" variant="primary" size="sm">
              <i class="far fa-user"></i>
            </Button>
          ) : (
            <Button as="a" href="/signin.html" variant="inverse" size="md">
              Log In
            </Button>
          )}
          <Button variant="primary" size="md">
            <i class="fas fa-shopping-bag"></i> 0
          </Button>
        </HeaderRight>
      </HeaderTop>
      <HeaderBottom>
        <HeaderBottomLeft>
          How would you like to receive this order?
          <ChangeServiceMode>Change</ChangeServiceMode>
        </HeaderBottomLeft>
        <HeaderBottomRight>
          <i class="fas fa-globe"></i>
          EN/CA
        </HeaderBottomRight>
      </HeaderBottom>
    </Header>
  );
};

export default AppHeader;
