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
  border-color: ${({ errorMessage, isValid }) =>
    errorMessage
      ? Styles.color.input.invalid
      : isValid
      ? Styles.color.input.valid
      : Styles.color.input.default};

  &:focus {
    outline-style: none;
  }

  & ~ label {
    position: absolute;
    color: darkgray;
    transition: all 0.2s;
    bottom: ${({ floatLabel }) => (floatLabel ? "2.4rem" : "0.8rem")};
    left: ${({ floatLabel }) => (floatLabel ? "0.5rem" : "1rem")};
    background-color: ${({ floatLabel }) =>
      floatLabel ? "white" : "transparent"};
    padding: ${({ floatLabel }) => (floatLabel ? "0.1rem" : "initial")};
    font-size: ${({ floatLabel }) => (floatLabel ? "0.75rem" : "initial")};
  }

  &:focus ~ label {
    bottom: 2.4rem;
    left: 0.5rem;
    background-color: white;
    padding: 0.1rem;
    font-size: 0.75rem;
  }
`;

const ErrorMessage = styled.div`
  color: #c8102e;
  font-size: 0.7rem;
  position: absolute;
`;

const FloatingFormField = ({
  element = "input",
  type = "text",
  isValid,
  errorMessage = "",
  label = "",
  value,
  onChange,
  children,
}) => (
  <FormField>
    <FloatingInput
      id={label}
      as={element}
      floatLabel={element === "select" || value !== ""}
      type={element === "input" ? type : undefined}
      value={value}
      onChange={onChange}
      isValid={isValid}
    />
    <label htmlFor={label}>{label}</label>
    <ErrorMessage>{errorMessage}</ErrorMessage>
  </FormField>
);

export default FloatingFormField;
