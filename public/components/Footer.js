import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  padding: 0 5rem 3rem 5rem;
  background-color: #f4f4f4;
  margin-top: 7rem;
  text-decoration: none;

  @media only screen and (max-width: 815px) {
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
  border-bottom: 1px solid rgb(228, 227, 227);
`;

const BottomRow = styled.div`
  margin-top: 1.5rem;
`;

const FooterHeading = styled.h5`
  font-size: 1rem;
  margin: 0.3rem 0;
`;

const MainFooterLink = styled.a`
  color: #c8102e;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BottomFooterLink = styled.a`
  color: #572d2d;
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
  color: #572d2d;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  text-decoration: none;
  &:hover {
    color: white;
    background-color: #c8102e;
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
            <i class="fab fa-facebook-f"></i>
          </SocialsLink>
          <SocialsLink href="#">
            <i class="fab fa-twitter"></i>
          </SocialsLink>
          <SocialsLink href="#">
            <i class="fab fa-youtube"></i>
          </SocialsLink>
          <SocialsLink href="#">
            <i class="fab fa-instagram"></i>
          </SocialsLink>
        </SocialsTile>
      </FooterTile>
      <BottomRow>TM & © Tim Hortons, 2020</BottomRow>
      <BottomRow></BottomRow>
      <BottomRow>
        <i class="fas fa-globe"></i> EN/CA
      </BottomRow>
    </FooterGrid>
  </Footer>
);

export default AppFooter;
