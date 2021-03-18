import React from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { LocaleContext } from "../context/LocaleContext";
import { TrackingContext } from "../context/TrackingContext";
import Styles from "../styles";
import Button from "./Button";

const ItemWrapper = styled.div`
  text-decoration: none;
  text-align: center;
  display: block;
  padding-bottom: 2rem;
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
  justify-content: center;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    width: 100%;
    margin: 0 auto;
  }
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
  width: 90%;
  margin: 0 auto;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    width: 100%;
  }
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
  const { trackClick } = React.useContext(TrackingContext);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const displayPrice = `${selectedLocale.currency}${(price / 100).toFixed(2)}`;

  const handleClick = (event, { name, image, price, id }) => {
    trackClick(event);
    addToCart({ name, image, price, id });
  };

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
          onClick={(event) => handleClick(event, { name, image, price, id })}
          className="add-to-order"
          data-tracking-action="add-item-to-cart"
          data-tracking-element="button"
          data-tracking-type="item"
          data-tracking-name={name}
          data-tracking-id={id}
        >
          <span>Add to order</span>
          <Price>{displayPrice}</Price>
        </AddToOrderButton>
      </ButtonWrapper>
    </ItemWrapper>
  );
};

export default Item;
