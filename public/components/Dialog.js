import styled from "styled-components";

const Dialog = styled.dialog`
  display: grid !important;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
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

export default Dialog;
