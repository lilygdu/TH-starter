import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import Dialog from "../components/Dialog";
import { LocaleContext } from "../context/LocaleContext";

const Dialog = styled.dialog``;

const Modal = styled.div`
  background-color: ${Styles.color.account.modal.background};
  padding: 1rem 2rem;
  text-align: center;
  color: ${Styles.color.account.modal.text};
  border-radius: 5px;
`;

const DialogHeading = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`;

const ModalButton = styled(BaseButton)`
  margin-top: 0.5rem;
`;

const LocaleDialog = () => {
  const [isLocaleDialogOpen, setLocaleDialogOpen] = React.useState(false);

  const handleApplyClick = (event) => {
    setSelectedLocale(event.target.value);
    setLocaleDialogOpen(false);
  };

  return (
    <Dialog
      onClick={() => setLocaleDialogOpen(false)}
      open={isLocaleDialogOpen}
    >
      <Modal>
        <DialogHeading>Select Language and Region</DialogHeading>
        <select>
          <option>
            <span>English</span>
            <span>Canada</span>
          </option>
          <option>
            <span>English</span>
            <span>USA</span>
          </option>
        </select>
        <ModalButton variant="primary" size="lg" onClick={handleApplyClick}>
          Apply
        </ModalButton>
      </Modal>
    </Dialog>
  );
};

export default LocaleDialog;
