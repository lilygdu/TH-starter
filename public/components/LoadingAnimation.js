import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  & > span {
    animation: dance 0.6s ease alternate infinite;
  }

  & > span:nth-child(1) {
    animation-delay: -0.5s;
  }

  & > span:nth-child(2) {
    animation-delay: -0.3s;
  }

  & > span:nth-child(3) {
    animation-delay: -0.1s;
  }

  @keyframes dance {
    from {
      transform: scale(0.2);
    }
    to {
      transform: scale(0.6);
    }
  }
`;

const LoadingAnimation = () => (
  <LoadingContainer>
    <span>
      <i className="fas fa-circle dot"></i>
    </span>
    <span>
      <i className="fas fa-circle dot"></i>
    </span>
    <span>
      <i className="fas fa-circle dot"></i>
    </span>
  </LoadingContainer>
);

export default LoadingAnimation;
