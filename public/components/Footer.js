import React from "react";
import styled from "styled-components";
import Styles from "../styles";

const Footer = styled.footer`
  padding: 0 5rem 3rem 5rem;
  background-color: ${Styles.color.footer.background};
  margin-top: 7rem;
  text-decoration: none;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;
`;

const FooterTile = styled.div`
  padding: 3rem 0;
  border-bottom: 1px solid ${Styles.color.footer.tilebottom};
`;

const BottomRow = styled.div`
  margin-top: 1.5rem;
`;

const FooterHeading = styled.h5`
  font-size: 1rem;
  margin: 0.3rem 0;
`;

const MainFooterLink = styled.a`
  color: ${Styles.color.footer.link.main};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BottomFooterLink = styled.a`
  color: ${Styles.color.footer.link.bottom};
  display: block;
  margin: 0.5rem 0;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialsTile = styled.div`
  display: flex;
  margin-left: -0.7rem;
  gap: 1rem;
`;

const SocialsLink = styled.a`
  color: ${Styles.color.footer.socials.text};
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  text-decoration: none;
  &:hover {
    color: ${Styles.color.footer.socials.hover.text};
    background-color: ${Styles.color.footer.socials.hover.backgroundcolor};
  }
`;

const AppFooter = () => (
  <Footer>
    <FooterGrid>
      <FooterTile>
        <FooterHeading>Careers</FooterHeading>
        Come join the team
        <br />
        <MainFooterLink href="#">Browse Opportunities</MainFooterLink>
      </FooterTile>
      <FooterTile>
        <FooterHeading>Community</FooterHeading>
        Make a true difference <br />
        <MainFooterLink href="#">Learn More</MainFooterLink>
      </FooterTile>
      <FooterTile>
        <FooterHeading>Find a Tim Hortons</FooterHeading>
        We can't wait to serve you <br />
        <MainFooterLink href="#">Store Locator</MainFooterLink>
      </FooterTile>
      <FooterTile>
        <BottomFooterLink href="#">Franchising</BottomFooterLink>
        <BottomFooterLink href="#">Investors</BottomFooterLink>
        <BottomFooterLink href="#">Contact Us</BottomFooterLink>
        <BottomFooterLink href="#">Frequently Asked Questions</BottomFooterLink>
      </FooterTile>
      <FooterTile>
        <BottomFooterLink href="#">Privacy Policy</BottomFooterLink>
        <BottomFooterLink href="#">Terms of Service</BottomFooterLink>
        <BottomFooterLink href="#">Trademarks</BottomFooterLink>
        <BottomFooterLink href="#">Notice Accessibility</BottomFooterLink>
        <BottomFooterLink href="#">Diagnostics</BottomFooterLink>
      </FooterTile>
      <FooterTile>
        <FooterHeading>Connect with Us</FooterHeading>
        <SocialsTile>
          <SocialsLink href="#">
            <i className="fab fa-facebook-f"></i>
          </SocialsLink>
          <SocialsLink href="#">
            <i className="fab fa-twitter"></i>
          </SocialsLink>
          <SocialsLink href="#">
            <i className="fab fa-youtube"></i>
          </SocialsLink>
          <SocialsLink href="#">
            <i className="fab fa-instagram"></i>
          </SocialsLink>
        </SocialsTile>
      </FooterTile>
      <BottomRow>TM & © Tim Hortons, 2020</BottomRow>
      <BottomRow></BottomRow>
      <BottomRow>
        <i className="fas fa-globe"></i> EN/CA
      </BottomRow>
    </FooterGrid>
  </Footer>
);

export default AppFooter;
