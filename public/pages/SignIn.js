import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import Button from "../components/Button";
import FloatingFormField from "../components/FloatingFormField";
import { useHistory } from "react-router-dom";
import { sendOTPEmail } from "../utils/email";
import { signIn } from "../utils/user";

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

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { response, data } = await signIn({
      email,
    });
    // check if email exists
    // console.log(`Trying to sign in ${email}`);
    if (response.ok) {
      const { email, otp } = data;
      setUserEmail(email);
      await sendOTPEmail({ otp, email });
      history.push("/confirm-otp");
    } else {
      // show error:
      // "This user does not exist"
      // "That doesn't look like a valid email"
    }
  };

  return (
    <Main>
      <Heading>Sign In</Heading>
      <form noValidate onSubmit={handleSubmit}>
        <FloatingFormField
          type="email"
          label="Email Address *"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          isValid={false}
          autoComplete="off"
          errorMessage={""}
        />
        <ButtonWrapper>
          <Button
            variant="primary"
            size="lg"
            $fullWidth
            disabled={email.length === 0}
          >
            Sign In
          </Button>
        </ButtonWrapper>
      </form>
      <NoAccountText>Don't have an account yet?</NoAccountText>
      <ButtonWrapper>
        <Button to="/signup" variant="outline" size="lg" $fullWidth>
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
