import React from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { LocaleContext } from "../context/LocaleContext";
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
  bottom: 0;
  right: 0;
  left: 0;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Price = styled.b`
  font-size: 1.1rem;
`;

const AddToOrderButton = styled(Button)`
  white-space: pre;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;

const Item = ({ name, image, lqip, id, price, calories }) => {
  const { addToCart } = React.useContext(CartContext);
  const { selectedLocale } = React.useContext(LocaleContext);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const displayPrice = `${selectedLocale.currency}${(price / 100).toFixed(2)}`;

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
        <AddToOrderButton
          variant="primary"
          size="md"
          onClick={() => addToCart({ name, image, price, id })}
        >
          <span>Add to order</span>
          <Price>{displayPrice}</Price>
        </AddToOrderButton>
      </ButtonWrapper>
    </ItemWrapper>
  );
};

export default Item;
