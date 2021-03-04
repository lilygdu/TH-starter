import styled from "styled-components";
import Styles from "../styles";

const Button = styled.button`
  // example of referencing the Styles object
  font-family: ${Styles.fontFamily.default};
  // example of using a prop
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  // supported props:
  // variant="primary" | variant="inverse" | variant="outline"
  // size="md" | size="lg"
  // fullWidth={true} | fullWidth={false}
  // disabled={true} | disabled={false}
  // this button can also techically become a link,
  // using the as="a" prop, (https://styled-components.com/docs/api#as-polymorphic-prop)
  // so:
  // text-decoration: none;
  // is a good idea, too...

  &:focus {
    // focus styles go here
  }

  &:hover {
    // hover styles go here
  }

  &:active {
    // active styles go here
  }
`;

export default Button;
