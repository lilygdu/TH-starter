import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import LoadingAnimation from "./LoadingAnimation";
import { Link } from "react-router-dom";

const BaseButton = styled.button`
  font-family: ${Styles.fontFamily.default};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-width: 1px;
  border-style: solid;
  border-radius: 9999rem;
  transition: background-color 0.2s, border-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  text-decoration: none;
  user-select: none;

  // depends on size
  font-size: ${({ size }) => Styles.fontSize.button[size]};
  height: ${({ size }) => Styles.size.button[size].height};
  width: ${({ size, $fullWidth }) =>
    $fullWidth ? "100%" : Styles.size.button[size].width};
  padding: ${({ size }) => Styles.padding.button[size]};

  // depends on variant
  border-color: ${({ variant, disabled }) =>
    disabled
      ? Styles.color.button.disabled.border
      : Styles.color.button[variant].border};
  background-color: ${({ variant, disabled }) =>
    disabled
      ? Styles.color.button.disabled.background
      : Styles.color.button[variant].background};
  color: ${({ variant, disabled }) =>
    disabled
      ? Styles.color.button.disabled.text
      : Styles.color.button[variant].text};

  &:focus {
    outline-style: none;
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : Styles.boxShadow.button};
  }

  &:hover {
    border-color: ${({ variant, disabled }) =>
      disabled
        ? Styles.color.button.disabled.border
        : Styles.color.button[variant].hover.border};
    background-color: ${({ variant, disabled }) =>
      disabled
        ? Styles.color.button.disabled.background
        : Styles.color.button[variant].hover.background};
  }

  &:active {
    border-color: ${({ variant, disabled }) =>
      disabled
        ? Styles.color.button.disabled.border
        : Styles.color.button[variant].active.border};
    background-color: ${({ variant, disabled }) =>
      disabled
        ? Styles.color.button.disabled.background
        : Styles.color.button[variant].active.background};
    color: ${({ variant, disabled }) =>
      disabled
        ? Styles.color.button.disabled.text
        : Styles.color.button[variant].active.text};
  }
`;

const Button = React.forwardRef(
  (
    {
      variant,
      $fullWidth,
      size,
      to,
      disabled,
      children,
      isLoading = false,
      onClick,
      ...rest
    },
    ref
  ) => {
    const handleClick = (event) => {
      if (disabled) {
        event.preventDefault();
      } else if (onClick) {
        onClick(event);
      }
    };

    return (
      <BaseButton
        {...rest}
        onClick={handleClick}
        variant={variant}
        $fullWidth={$fullWidth}
        size={size}
        as={to && Link}
        to={to}
        disabled={disabled}
        ref={ref}
      >
        {isLoading ? <LoadingAnimation /> : children}
      </BaseButton>
    );
  }
);

export default Button;
