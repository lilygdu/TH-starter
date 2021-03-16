import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Styles from "../styles";
import Button from "../components/Button";
import FloatingFormField from "../components/FloatingFormField";
import CheckBoxField from "../components/CheckBoxField";
import { Helmet } from "react-helmet";
import { signUp } from "../utils/user";
import { sendOTPEmail } from "../utils/email";
import { UserContext } from "../context/UserContext";
import { LocaleContext } from "../context/LocaleContext";

const Main = styled.main`
  margin: 8rem auto 0;
  max-width: 25rem;
  @media only screen and (max-width: ${Styles.breakpoint}) {
    max-width: 20rem;
  }
`;

const EarnRewardsHeading = styled.h1`
  font-family: ${Styles.fontFamily.display};
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

const SignInLink = styled(Link)`
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

const TOSLink = styled.a`
  text-decoration: none;
  color: ${Styles.color.signup.link.text};
`;

const FormField = styled.div`
  margin: 2rem auto;
  position: relative;
`;

const NotYourComputer = styled.p`
  margin: 2rem;
  font-size: 0.75rem;
  text-align: center;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    display: none;
  }
`;

const SignUp = () => {
  const [country, setCountry] = React.useState("CAN");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [emailConsent, setEmailConsent] = React.useState(false);
  const [tosConsent, setTosConsent] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [tosConsentErrorMessage, setTosConsentErrorMessage] = React.useState(
    ""
  );
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const { setUserEmail } = React.useContext(UserContext);
  const { locales } = React.useContext(LocaleContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    setIsFormSubmitted(true);
    event.preventDefault();
    const { response, data } = await signUp({
      email,
      name,
      country,
      emailConsent,
      tosConsent,
    });
    if (response.ok) {
      const { email, otp } = data;
      setUserEmail(email);
      await sendOTPEmail({ otp, email });
      history.push("/confirm-otp");
    } else {
      setEmailErrorMessage(data.email || "");
      setNameErrorMessage(data.name || "");
      setTosConsentErrorMessage(data.tos_consent || "");
      setIsEmailValid(!data.email);
      setIsNameValid(!data.name);
    }
  };

  return (
    <>
      <Helmet>
        <title>Tim Hortons - Sign Up</title>
      </Helmet>
      <Main>
        <EarnRewardsHeading>Start earning rewards</EarnRewardsHeading>
        <CreateAccountHeading>Create an Account</CreateAccountHeading>
        <ExistingAccount>
          <div>Already have an account?</div>
          <SignInLink to="/signin">Sign In</SignInLink>
        </ExistingAccount>
        <form noValidate onSubmit={handleSubmit}>
          <FloatingFormField
            element="select"
            label="Country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            validate={false}
          >
            {locales.map((locale) => (
              <option key={locale.key} value={locale.countryCode}>
                {locale.country}
              </option>
            ))}
          </FloatingFormField>
          <FloatingFormField
            type="email"
            label="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            isValid={isEmailValid}
            errorMessage={emailErrorMessage}
            autoComplete="off"
            required={true}
            validate={isFormSubmitted}
          />
          <FloatingFormField
            type="text"
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            isValid={isNameValid}
            errorMessage={nameErrorMessage}
            autoComplete="off"
            required={true}
            validate={isFormSubmitted}
          />
          <OptionalInformation>
            <span>Optional Information</span>{" "}
            <i className="fas fa-angle-down"></i>
          </OptionalInformation>
          <CheckBoxField
            name="email_consent"
            value={emailConsent}
            onChange={() => setEmailConsent(!emailConsent)}
            label={
              "Yes! I want to receive promotional emails about special offers and other information about Tim Hortons. (Optional)"
            }
          />
          <CheckBoxField
            name="tos_consent"
            value={tosConsent}
            onChange={() => setTosConsent(!tosConsent)}
            errorMessage={tosConsentErrorMessage}
            label={
              <>
                I agree to the following:
                <span>
                  <TOSLink to="#"> Privacy Policy,</TOSLink>
                  <br />
                  <TOSLink to="#">Tims Rewards Terms and Conditions, </TOSLink>
                  <TOSLink to="#">Terms of Service</TOSLink>
                </span>
              </>
            }
          />
          <Button variant="primary" size="lg" $fullWidth>
            Sign Up
          </Button>
        </form>
        <NotYourComputer>
          Not your computer? Please make sure to log out before you leave
        </NotYourComputer>
      </Main>
    </>
  );
};
export default SignUp;
