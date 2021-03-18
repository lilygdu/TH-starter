import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { LocaleContext } from "../context/LocaleContext";
import { TrackingContext } from "../context/TrackingContext";
import Button from "./Button";
import Logo from "url:../images/th-logo.svg";
import Styles from "../styles";
import Cart from "./Cart";
import LocaleDialog from "./LocaleDialog";

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
const HeaderBottomRight = styled.button`
  font-size: inherit;
  color: inherit;
  font-family: inherit;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: 0;
  }
  & i {
    margin-top: 0.1rem;
  }
`;

const ChangeServiceMode = styled.span`
  color: ${Styles.color.header.text};
  font-weight: 700;
  margin-left: 1rem;
`;

const AppHeader = () => {
  const { isLoggedIn } = React.useContext(UserContext);
  const { cartVisible, setCartVisible, items } = React.useContext(CartContext);
  const { selectedLocale } = React.useContext(LocaleContext);
  const { trackClick } = React.useContext(TrackingContext);
  const [isLocaleDialogOpen, setIsLocaleDialogOpen] = React.useState(false);

  const cartButton = React.useRef(null);

  React.useEffect(() => {
    if (cartVisible) {
      cartButton.current?.focus();
    }
  }, [cartVisible]);

  let totalItemsInCart = 0;
  items.forEach((item) => (totalItemsInCart += item.quantity));

  const handleToggleCartVisibility = (event) => {
    trackClick(event);
    setCartVisible(!cartVisible);
  };

  const handleOpenLocaleDialogClick = (event) => {
    trackClick(event);
    setIsLocaleDialogOpen(!isLocaleDialogOpen);
  };

  return (
    <>
      <Header>
        <HeaderTop>
          <HeaderLeftNav>
            <NavList>
              <NavListItem>
                <NavLink
                  to="/"
                  onClick={trackClick}
                  data-tracking-action="navigate-to-menu"
                  data-tracking-element="link"
                  data-tracking-type="nav"
                >
                  Order
                </NavLink>
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
          <HeaderLogoLink
            to="/"
            onClick={trackClick}
            data-tracking-action="navigate-to-menu"
            data-tracking-element="link"
            data-tracking-type="logo"
          >
            <HeaderLogoImage src={Logo} alt="logo" />
          </HeaderLogoLink>
          <HeaderRight>
            {isLoggedIn ? (
              <Button
                to="/account"
                variant="primary"
                size="sm"
                onClick={trackClick}
                data-tracking-action="navigate-to-account"
                data-tracking-element="link"
              >
                <i className="far fa-user"></i>
              </Button>
            ) : (
              <Button
                to="/signin"
                variant="inverse"
                size="md"
                onClick={trackClick}
                data-tracking-action="navigate-to-signin"
                data-tracking-element="link"
              >
                Log In
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={handleToggleCartVisibility}
              ref={cartButton}
              data-tracking-action="toggle-cart-visibility"
              data-tracking-element="button"
            >
              <i className="fas fa-shopping-bag"></i>{" "}
              <span>{totalItemsInCart}</span>
            </Button>
          </HeaderRight>
        </HeaderTop>
        <HeaderBottom>
          <HeaderBottomLeft>
            How would you like to receive this order?
            <ChangeServiceMode>Change</ChangeServiceMode>
          </HeaderBottomLeft>
          <HeaderBottomRight
            onClick={handleOpenLocaleDialogClick}
            data-tracking-action="open-locale-dialog"
            data-tracking-element="button"
          >
            <i className="fas fa-globe"></i>
            {selectedLocale.key}
          </HeaderBottomRight>
        </HeaderBottom>
      </Header>
      <Cart open={cartVisible} />
      <LocaleDialog
        isOpen={isLocaleDialogOpen}
        closeDialog={() => setIsLocaleDialogOpen(false)}
      />
    </>
  );
};

export default AppHeader;
