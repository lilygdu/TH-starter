import styled from "styled-components";

const Demo = styled.main`
  text-align: center;
  & > div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 30rem;
    margin: 0 auto;
  }
`;

export default Demo;
