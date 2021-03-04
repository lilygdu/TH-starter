import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import BaseButton from "../components/Button";

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

const Dialog = styled.dialog`
  display: grid !important;
  opacity: ${({ dialogOpen }) => (dialogOpen ? 1 : 0)};
  visibility: ${({ dialogOpen }) => (dialogOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  place-items: center;
  z-index: 2;
  transition: all 0.3s;
`;

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

  //protected.js
  // if (!localStorage.getItem("userId") || !localStorage.getItem("email")) {
  //   window.location = "/signin.html";
  // }
  //---------------------------------------
  //users.js
  // const loginButton = document.querySelector("#login");
  // const accountButton = document.querySelector("#account");

  // function checkUser() {
  //   const isLoggedIn =
  //     !!localStorage.getItem("userId") && localStorage.getItem("email");
  //   if (isLoggedIn) {
  //     loginButton.classList.add("display-none");
  //     accountButton.classList.remove("display-none");
  //   }
  // }
  // checkUser();
  //---------------------------------------
  //signout.js
  // function handleConfirmSignOut() {
  //   localStorage.clear();
  //   window.location = "/";
  // }

  // confirmButton.addEventListener("click", handleConfirmSignOut);
  // dialog.addEventListener("transitionend", () => confirmButton.focus());

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
                onClick={() => setDialogOpen(true)}
                dialogOpen={dialogOpen}
              >
                <AccountOptionsText>Sign Out</AccountOptionsText>
                <i className="fas fa-chevron-right"></i>
              </AccountOptionsLink>
            </AccountOptionsItem>
          </AccountOptionsList>
        </AccountOptions>
      </Main>
      <Dialog onClick={() => setDialogOpen(false)}>
        <Modal>
          <DialogHeading>Sign Out</DialogHeading>
          <DialogText>Are you sure you want to sign out?</DialogText>
          <ModalButtonWrapper>
            <ModalButton variant="primary" size="lg">
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
