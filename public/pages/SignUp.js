import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import Button from "../components/Button";
import FloatingFormField from "../components/FloatingFormField";
import { Link } from "react-router-dom";

const Main = styled.main`
  margin: 8rem auto 0;
  max-width: 25rem;
  @media only screen and (max-width: ${Styles.breakpoint}) {
    max-width: 20rem;
  }
`;

const EarnRewardsHeading = styled.h1`
  font-family: ${Styles.fontFamily.display.greasepencil};
  color: ${Styles.color.signup.earnrewards.text};
  transform: rotate(-5deg);
  font-size: 3.3rem;
  text-align: center;
  margin-bottom: 0;
  white-space: nowrap;
  letter-spacing: -2px;
  @media only screen and (max-width: ${Styles.breakpoint}) {
    font-size: 1.9rem;
    margin-top: 1.5rem;
  }
`;

const CreateAccountHeading = styled.h2`
  color: ${Styles.color.signup.createaccount.text};
  font-size: 3rem;
  text-align: center;
  margin-top: -1.9rem;
  line-height: 1;
  margin-bottom: 0.8rem;
  @media only screen and (max-width: ${Styles.breakpoint}) {
    font-size: 1.625rem;
    margin-top: -0.9rem;
    margin-bottom: 1.7rem;
  }
`;
const ExistingAccount = styled.div`
  background-color: ${Styles.color.signup.existingaccount.background};
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 7px;
  padding: 0.75rem;
  margin: 2rem;
  @media only screen and (max-width: ${Styles.breakpoint}) {
    margin: 0;
  }
`;
const ExistingAccountLink = styled.a`
  text-decoration: none;
  color: ${Styles.color.signup.link.text};
  transition: color 0.2s;
  &:hover {
    color: ${Styles.color.signup.existingaccount.link};
  }
`;

const OptionalInformation = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid
    ${Styles.color.signup.optionalinformation.bottomborder};
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const CheckboxField = styled.div`
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${Styles.color.signup.checkboxfield.text};
  display: flex;
`;

// input[type="checkbox"] {
//   width: 1rem;
//   height: 1rem;
// }

// input[type="checkbox"] ~ .label-container {
//   flex: 1;
// }

const TOSLink = styled.a`
  text-decoration: none;
  color: ${Styles.color.signup.link.text};
`;

const NotYourComputer = styled.p`
  margin: 2rem;
  font-size: 0.75rem;
  text-align: center;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

// .checkbox-field .error-message {
//   position: static;
// }

const SignUp = () => {
  const [country, setCountry] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  return (
    <Main>
      <EarnRewardsHeading>Start earning rewards</EarnRewardsHeading>
      <CreateAccountHeading>Create an Account</CreateAccountHeading>
      <ExistingAccount>
        <div>Already have an account?</div>
        <a to="/signin.html">Sign In</a>
      </ExistingAccount>
      <form noValidate onSubmit={handleSubmit}>
        <FloatingFormField
          type="select"
          label="Country *"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          isValid={false}
          errorMessage={""}
          required={true}
        >
          <option value="CAN">Canada</option>
          <option value="USA">United States</option>
        </FloatingFormField>
        <FloatingFormField
          type="text"
          label="Email *"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          isValid={false}
          errorMessage={""}
          autoComplete="off"
          required={true}
        />
        <FloatingFormField
          type="text"
          label="Name *"
          value={name}
          onChange={(event) => setName(event.target.value)}
          isValid={false}
          errorMessage={""}
          autoComplete="off"
          required={true}
        />
        <OptionalInformation>
          <span>Optional Information</span> <i class="fas fa-angle-down"></i>
        </OptionalInformation>
        <div class="form-field">
          <div class="checkbox-field">
            <input type="checkbox" name="email_consent" id="email_consent" />
            <div class="label-container">
              <label for="email_consent">
                Yes! I want to receive promotional emails about special offers
                and other information about Tim Hortons. (Optional)
              </label>
              <div class="error-message"></div>
            </div>
          </div>
        </div>
        <div class="form-field">
          <div class="checkbox-field" id="privacy">
            <input
              type="checkbox"
              name="tos_consent"
              id="tos_consent"
              required
            />
            <div class="label-container">
              <label for="tos_consent">
                I agree to the following:
                <span>
                  <TOSLink to="#">Privacy Policy,</TOSLink>
                  <br />
                  <TOSLink to="#">Tims Rewards Terms and Conditions,</TOSLink>
                  <TOSLink to="#">Terms of Service</TOSLink>
                </span>
              </label>
              <div class="error-message"></div>
            </div>
          </div>
        </div>
        <Button variant="primary" size="lg" fullWidth>
          Sign Up
        </Button>
      </form>
      <NotYourComputer>
        Not your computer? Please make sure to log out before you leave
      </NotYourComputer>
    </Main>
  );
};
export default SignUp;
