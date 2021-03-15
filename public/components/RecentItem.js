import React from "react";
import { fetchItem } from "../utils/recent";
import { CartContext } from "../context/CartContext";
import styled from "styled-components";
import Button from "../components/Button";
import Styles from "../styles";

const Wrapper = styled.div`
  box-shadow: 2px 2px 9px 0px rgba(178, 178, 178, 0.5);
  height: 10rem;
  width: 16rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const Top = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 7rem;
  height: 5rem;
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

const Name = styled.h3`
  color: ${Styles.color.recentitems.itemname};
  font-size: 0.9rem;
  text-align: left;
  line-height: 1rem;
  width: 12rem;
`;

const AddButton = styled(Button)`
  margin: 1rem auto;
`;

const RecentItem = ({ sanityID }) => {
  const { addToCart } = React.useContext(CartContext);
  const [item, setItem] = React.useState({});
  const [imageLoaded, setImageLoaded] = React.useState(false);
  React.useEffect(async () => {
    const data = await fetchItem({ sanityID });
    setItem({
      name: data.name,
      image: data.primaryImage.asset.url,
      lqip: data.primaryImage.asset.metadata.lqip,
      price: data.price,
      id: sanityID,
    });
  }, []);

  return (
    <Wrapper>
      <Top>
        <ImageWrapper>
          {item.image && (
            <>
              <Image
                src={item.lqip}
                alt={`${item.name}-preview`}
                loading="lazy"
                isHidden={imageLoaded}
              />
              <Image
                src={item.image}
                alt={item.name}
                onLoad={() => setImageLoaded(true)}
                isHidden={!imageLoaded}
                loading="lazy"
              />
            </>
          )}
        </ImageWrapper>
        <Name>{item.name}</Name>
      </Top>
      <AddButton variant="outline" size="md" onClick={() => addToCart(item)}>
        Add +
      </AddButton>
    </Wrapper>
  );
};

export default RecentItem;
