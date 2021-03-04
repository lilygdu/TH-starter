import styled from "styled-components";

const Demo = styled.main`
  text-align: center;
  & > div {
    max-width: 30rem;
    margin: 0 auto;
  }
`;

export default Demo;
