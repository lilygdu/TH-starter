import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Styles from "../styles";

const CategoryLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  display: block;
`;

const Name = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: ${Styles.color.menu.category.text};
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 15rem;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  transition: opacity 0.3s;
`;

const Category = ({ name, image, lqip, id }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <CategoryLink to={`/category/${id}`}>
      <ImageWrapper>
        <Image
          src={lqip}
          alt={`${name}-preview`}
          loading="lazy"
          isHidden={imageLoaded}
        />
        <Image
          src={image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          isHidden={!imageLoaded}
          loading="lazy"
        />
      </ImageWrapper>
      <Name>{name}</Name>
    </CategoryLink>
  );
};

export default Category;
