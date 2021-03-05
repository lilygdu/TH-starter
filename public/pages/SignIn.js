import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import Button from "../components/Button";
import Form from "../components/FloatingFormField";

const Main = styled.main`
  margin: 10rem auto 0;
  max-width: 25rem;
  text-align: center;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    margin-top: 6rem;
    max-width: 20rem;
  }
`;

const Heading = styled.h1`
  font-size: 3rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    font-size: 2rem;
  }
`;

const EnterEmail = styled.div``;

const SignInForm = styled(Form)``;

const SignInFormInput = styled.input``;

const SignInFormField = styled.div``;

const SignInFormLabel = styled.label``;

const ButtonWrapper = styled.div`
  width: 85%;
  margin: 0 auto;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    width: 100%;
  }
`;

const NoAccountText = styled.p`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const NotYourComputer = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const ErrorMessage = styled.div``;

const SignIn = () => {
  return (
    <Main>
      <Heading>Sign In</Heading>
      <EnterEmail></EnterEmail>
      <SignInForm novalidate>
        <SignInFormField>
          <SignInFormInput
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            required
          />
          <SignInFormLabel>Email Address *</SignInFormLabel>
          <ErrorMessage></ErrorMessage>
        </SignInFormField>
        <ButtonWrapper>
          <Button
            // onClick={() => set()}
            variant="primary"
            size="lg"
            fullwidth
            disabled
          >
            Sign In
          </Button>
        </ButtonWrapper>
      </SignInForm>
      <NoAccountText>Don't have an account yet?</NoAccountText>
      <ButtonWrapper>
        <Button href="/signup.html" variant="outline" size="lg" fullwidth>
          Sign Up
        </Button>
      </ButtonWrapper>
      <NotYourComputer>
        Not your computer? Please make sure to log out before you leave
      </NotYourComputer>
    </Main>
  );
};
export default SignIn;
