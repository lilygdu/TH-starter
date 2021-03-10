import React from "react";
import styled from "styled-components";

const Dialog = styled.dialog`
  position: fixed;
  top: 5rem;
  left: auto;
  width: 15rem;
  margin: 0 2rem 0 0;
  z-index: 3;
`;

const Cart = ({ open }) => {
  return (
    <Dialog open={open}>
      <h2>I am the Cart!</h2>
    </Dialog>
  );
};

export default Cart;
