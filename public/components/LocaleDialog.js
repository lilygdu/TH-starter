import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import { LocaleContext } from "../context/LocaleContext";

const Modal = styled.div`
  background-color: ${Styles.color.locale.modal.background};
  text-align: center;
  color: ${Styles.color.account.modal.text};
  border-radius: 5px;
  text-align: center;
  max-width: 50rem;
  min-width: 30rem;
`;

const Row = styled.div`
  border-bottom: 1px solid ${Styles.color.locale.modal.border};
  padding: 1rem;
`;

const DialogHeading = styled.h2`
  font-size: 1rem;
  margin: 1rem;
`;

const ModalButton = styled(Button)`
  margin: 1rem auto;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 1rem;
  text-align: left;
  width: 8rem;
  margin: 0 auto;
  align-items: center;
`;

const RadioButton = styled.input`
  &:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }

  &:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: ${Styles.color.input.radio};
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }
`;

const LocaleDialog = ({ isOpen, closeDialog }) => {
  const { locales, selectedLocale, setSelectedLocale } = React.useContext(
    LocaleContext
  );

  const [formSelectedLocale, setFormSelectedLocale] = React.useState(
    selectedLocale
  );

  React.useEffect(() => {
    setFormSelectedLocale(selectedLocale);
  }, [selectedLocale]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedLocale(formSelectedLocale);
    closeDialog();
  };

  const handleDialogClick = (event) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <Dialog onClick={handleDialogClick} open={isOpen}>
      <Modal>
        <Row>
          <DialogHeading>Select Language and Region</DialogHeading>
        </Row>
        <form onSubmit={handleSubmit}>
          {locales.map((locale) => (
            <Row key={locale.key}>
              <RadioWrapper>
                <RadioButton
                  name="locale"
                  type="radio"
                  value={locale.key}
                  checked={locale.key === formSelectedLocale.key}
                  onChange={() => setFormSelectedLocale(locale)}
                />
                <label>
                  <b>{locale.language}</b>
                  <br />
                  {locale.country}
                </label>
              </RadioWrapper>
            </Row>
          ))}
          <ModalButton variant="primary" size="lg">
            Apply
          </ModalButton>
        </form>
      </Modal>
    </Dialog>
  );
};

export default LocaleDialog;
