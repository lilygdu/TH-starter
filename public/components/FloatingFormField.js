import React from "react";
import styled from "styled-components";
import Styles from "../styles";

const FormField = styled.div`
  margin: 2rem auto;
  position: relative;
`;

const FloatingInput = styled.input`
  width: 100%;
  font-family: sofia_pro, Helvetica, Arial, sans-serif;
  border-width: 1px;
  border-style: solid;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border-radius: 0.2rem;
  color: rgb(87, 45, 45);
  font-size: 0.9375rem;
  height: 3.125rem;
  border-color: ${({ isInvalid, isValid }) =>
    isInvalid
      ? Styles.color.input.invalid
      : isValid
      ? Styles.color.input.valid
      : Styles.color.input.default};

  &:focus {
    outline-style: none;
  }

  & ~ label {
    position: absolute;
    color: ${Styles.color.input.label};
    transition: all 0.2s;
    bottom: ${({ floatLabel }) => (floatLabel ? "2.4rem" : "0.8rem")};
    left: ${({ floatLabel }) => (floatLabel ? "0.5rem" : "1rem")};
    background-color: ${({ floatLabel }) =>
      floatLabel ? Styles.color.input.background : "transparent"};
    padding: ${({ floatLabel }) => (floatLabel ? "0.1rem" : "initial")};
    font-size: ${({ floatLabel }) => (floatLabel ? "0.75rem" : "initial")};
  }

  &:focus ~ label {
    bottom: 2.4rem;
    left: 0.5rem;
    background-color: ${Styles.color.input.background};
    padding: 0.1rem;
    font-size: 0.75rem;
  }
`;

const ErrorMessage = styled.div`
  color: ${Styles.color.input.invalid};
  font-size: 0.7rem;
  position: absolute;
`;

const FloatingFormField = ({
  element = "input",
  type = "text",
  errorMessage = "",
  label = "",
  value,
  onChange,
  autoComplete,
  children,
  required = false,
  validate = false,
}) => {
  const [displayError, setDisplayError] = React.useState(errorMessage);
  const [wasValidated, setWasValidated] = React.useState(false);

  React.useEffect(() => {
    setDisplayError(errorMessage);
  }, [errorMessage]);

  const validateInput = (event) => {
    if (event.target.checkValidity()) {
      setDisplayError("");
    } else if (required && !event.target.value) {
      setDisplayError(`${label} is a required field.`);
    } else {
      setDisplayError(`That doesn't look like a valid ${type}`);
    }
    setWasValidated(true);
  };

  const handleChange = (event) => {
    if (validate || wasValidated) {
      validateInput(event);
    }
    onChange(event);
  };

  return (
    <FormField>
      <FloatingInput
        id={label}
        as={element}
        floatLabel={element === "select" || value !== ""}
        value={value}
        onChange={handleChange}
        onBlur={validateInput}
        isValid={wasValidated && !displayError}
        isInvalid={!!displayError}
        type={element === "input" ? type : undefined}
        autoComplete={element === "input" ? autoComplete : undefined}
        required={required}
      >
        {children}
      </FloatingInput>
      <label htmlFor={label}>
        {label}
        {required && " *"}
      </label>
      <ErrorMessage>{displayError}</ErrorMessage>
    </FormField>
  );
};

export default FloatingFormField;
