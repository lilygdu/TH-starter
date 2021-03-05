import React from "react";
import styled from "styled-components";
import Styles from "../styles";

const FormField = styled.div`
  margin: 2rem auto;
  position: relative;
`;

const CheckBoxWrapper = styled.div`
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${Styles.color.signup.checkboxfield.text};
  display: flex;
`;

const CheckBoxLabelContainer = styled.div`
  flex: 1;
`;

const CheckBoxLabel = styled.label``;

const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const CheckBoxErrorMessage = styled.div`
  position: static;
  color: ${Styles.color.input.invalid};
  font-size: 0.7rem;
`;

const CheckBoxField = ({
  name,
  value,
  onChange,
  label,
  errorMessage = "",
  required = false,
}) => {
  return (
    <FormField>
      <CheckBoxWrapper>
        <CheckBox
          type="checkbox"
          name={name}
          id={name}
          checked={value}
          onChange={onChange}
          required={required}
        />
        <CheckBoxLabelContainer>
          <CheckBoxLabel htmlFor={name}>{label}</CheckBoxLabel>
          <CheckBoxErrorMessage>{errorMessage}</CheckBoxErrorMessage>
        </CheckBoxLabelContainer>
      </CheckBoxWrapper>
    </FormField>
  );
};

export default CheckBoxField;
