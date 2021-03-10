import React from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import Styles from "../styles";
import Button from "./Button";

const ItemWrapper = styled.div`
  text-decoration: none;
  text-align: center;
  display: block;
`;

const Name = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: ${Styles.color.menu.category.text};
  height: 2.5rem;
  line-height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Calories = styled.div`
  color: ${Styles.color.menu.category.text};
  font-size: 0.8rem;
  margin: 0.25rem 0;
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

const ButtonWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Price = styled.b`
  font-size: 1.1rem;
`;

const ButtonText = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
`;

const Item = ({ name, image, lqip, id, price, calories }) => {
  const { addToCart } = React.useContext(CartContext);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const displayPrice = `$${(price / 100).toFixed(2)}`;

  return (
    <ItemWrapper>
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
      <Calories>{calories} Cals</Calories>
      <ButtonWrapper>
        <Button
          variant="primary"
          size="md"
          $fullWidth
          onClick={() => addToCart({ name, image, price, id })}
        >
          <ButtonText>
            <span>Add to order</span>
            <Price>{displayPrice}</Price>
          </ButtonText>
        </Button>
      </ButtonWrapper>
    </ItemWrapper>
  );
};

export default Item;
