import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Styles from "../styles";
import Dialog from "../components/Dialog";
import BaseButton from "../components/Button";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { LocaleContext } from "../context/LocaleContext";

const Main = styled.main`
  margin: 11.5rem auto 0;
  max-width: 30rem;
  text-align: center;
`;

const AccountHeading = styled.h1`
  font-size: 3.5rem;
  margin: 1rem auto;
`;

const AccountOptions = styled.section``;

const AccountOptionsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AccountOptionsItem = styled.li``;

const AccountOptionsLink = styled.a`
  display: flex;
  justify-content: space-between;
  color: ${Styles.color.account.link.text};
  height: 4rem;
  border-bottom: 1px solid ${Styles.color.account.link.bottomborder};
  text-decoration: none;
  align-items: center;
  width: 100%;
`;

const AccountOptionsText = styled.span``;

const Modal = styled.div`
  background-color: ${Styles.color.account.modal.background};
  padding: 1rem 2rem;
  text-align: center;
  color: ${Styles.color.account.modal.text};
  border-radius: 5px;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const DialogHeading = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`;

const DialogText = styled.p`
  font-size: 1.1rem;
  margin: 0;
`;

const ModalButton = styled(BaseButton)`
  margin-top: 0.5rem;
`;

const Account = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { redirectIfNotLoggedIn, setUserEmail, setUserID } = React.useContext(
    UserContext
  );
  const { clearCart } = React.useContext(CartContext);
  const { locales, setSelectedLocale } = React.useContext(LocaleContext);
  const history = useHistory();
  const confirmButtonRef = React.useRef();

  React.useEffect(() => {
    redirectIfNotLoggedIn();
  }, []);

  const handleAccountOptionsLinkClick = (event) => {
    event.preventDefault();
    setDialogOpen(true);
  };

  const handleDialogTransition = () => {
    if (dialogOpen) {
      confirmButtonRef.current?.focus();
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUserEmail(null);
    setUserID(null);
    setSelectedLocale(locales[0]);
    clearCart();
    history.push("/signin");
  };

  return (
    <>
      <Main>
        <AccountHeading>Account</AccountHeading>
        <AccountOptions>
          <AccountOptionsList>
            <AccountOptionsItem>
              <AccountOptionsLink href="#">
                <AccountOptionsText>Tims Rewards</AccountOptionsText>
                <i className="fas fa-chevron-right"></i>
              </AccountOptionsLink>
            </AccountOptionsItem>
            <AccountOptionsItem>
              <AccountOptionsLink href="#">
                <AccountOptionsText>Account Info</AccountOptionsText>
                <i className="fas fa-chevron-right"></i>
              </AccountOptionsLink>
            </AccountOptionsItem>
            <AccountOptionsItem>
              <AccountOptionsLink href="#">
                <AccountOptionsText>Payment Methods</AccountOptionsText>
                <i className="fas fa-chevron-right"></i>
              </AccountOptionsLink>
            </AccountOptionsItem>
            <AccountOptionsItem>
              <AccountOptionsLink href="#">
                <AccountOptionsText>Recent Orders</AccountOptionsText>
                <i className="fas fa-chevron-right"></i>
              </AccountOptionsLink>
            </AccountOptionsItem>
            <AccountOptionsItem>
              <AccountOptionsLink href="#">
                <AccountOptionsText>
                  Communications Preferences
                </AccountOptionsText>
                <i className="fas fa-chevron-right"></i>
              </AccountOptionsLink>
            </AccountOptionsItem>
            <AccountOptionsItem>
              <AccountOptionsLink
                href="#"
                onClick={handleAccountOptionsLinkClick}
                dialogOpen={dialogOpen}
              >
                <AccountOptionsText>Sign Out</AccountOptionsText>
                <i className="fas fa-chevron-right"></i>
              </AccountOptionsLink>
            </AccountOptionsItem>
          </AccountOptionsList>
        </AccountOptions>
      </Main>
      <Dialog
        onClick={() => setDialogOpen(false)}
        open={dialogOpen}
        onTransitionEnd={handleDialogTransition}
      >
        <Modal>
          <DialogHeading>Sign Out</DialogHeading>
          <DialogText>Are you sure you want to sign out?</DialogText>
          <ModalButtonWrapper>
            <ModalButton
              variant="primary"
              size="lg"
              onClick={signOut}
              ref={confirmButtonRef}
            >
              Yes
            </ModalButton>
            <ModalButton
              variant="outline"
              size="lg"
              onClick={() => setDialogOpen(false)}
            >
              No
            </ModalButton>
          </ModalButtonWrapper>
        </Modal>
      </Dialog>
    </>
  );
};

export default Account;
