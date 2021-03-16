import React from "react";
import styled from "styled-components";
import Styles from "../styles";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserContext } from "../context/UserContext";
import { LocaleContext } from "../context/LocaleContext";
import { confirmOTP } from "../utils/user";

const Main = styled.main`
  margin: 14.5rem auto 0;
  max-width: 25rem;
  text-align: center;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    max-width: 20rem;
  }
`;
const VerifyCodeHeading = styled.h1`
  font-family: ${Styles.fontFamily.default};
  color: ${Styles.color.confirmOTP.heading.text};
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 0;
  white-space: nowrap;
  font-weight: normal;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    font-size: 1.9rem;
    margin-top: 1.5rem;
  }
`;
const CodeSentHeading = styled.h2`
  color: ${Styles.color.confirmOTP.heading.text};
  font-size: 1.1rem;
  text-align: center;
  line-height: 1.5rem;
  margin-bottom: 2rem;
  font-weight: normal;
  height: 3rem;

  @media only screen and (max-width: ${Styles.breakpoint}) {
    font-size: 1.625rem;
    margin-top: -0.9rem;
    margin-bottom: 1.7rem;
  }
`;

const EnterCode = styled.div`
  font-size: 1.1rem;
`;

const Code = styled.input`
  height: 3rem;
  width: 25rem;
  background-color: ${Styles.color.confirmOTP.input.background};
  border: 1px solid transparent;
  border-radius: 5px;
  margin: 0.7rem 0;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1.5rem;
  color: ${({ invalid }) => (invalid ? Styles.color.input.invalid : "inherit")};
  border-color: ${({ invalid }) =>
    invalid ? Styles.color.input.invalid : "inherit"};

  &:focus {
    border: 1px solid ${Styles.color.input.invalid};
    outline: 0;
  }
`;

const ErrorMessage = styled.div`
  color: ${Styles.color.input.invalid};
  font-size: 1rem;
`;

const DidNotReceiveCode = styled.p`
  font-weight: 700;
  font-size: 0.9rem;
`;

const ConfirmOTP = () => {
  const { locales, setSelectedLocale } = React.useContext(LocaleContext);
  const { userEmail, setUserID, setUserName } = React.useContext(UserContext);
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const codeRef = React.useRef();
  const history = useHistory();

  React.useEffect(() => {
    codeRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!userEmail) {
      history.push("/signin");
    }
  });

  const handleChange = async (input) => {
    setCode(input);
    if (input.length === 6) {
      const { response, data } = await confirmOTP({
        otp: input,
        email: userEmail,
      });
      if (response.ok) {
        const { id, name, country } = data;
        setUserID(id);
        setUserName(name);
        const matchingLocale = locales.find(
          (locale) => locale.countryCode === country
        );
        setSelectedLocale(matchingLocale);
        history.push("/");
      } else {
        setErrorMessage(data.otp);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Tim Hortons - Confirm OTP</title>
      </Helmet>
      <Main>
        <VerifyCodeHeading>Verify with code</VerifyCodeHeading>
        <CodeSentHeading>
          We just sent an email with login instructions to <b>{userEmail}</b>
        </CodeSentHeading>
        <EnterCode>
          <div>Enter Verification Code Below:</div>
        </EnterCode>
        <Code
          type="text"
          name="code"
          id="code"
          autoComplete="off"
          maxLength="6"
          spellCheck="false"
          required
          invalid={!!errorMessage}
          value={code}
          onChange={(event) => handleChange(event.target.value)}
          ref={codeRef}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <DidNotReceiveCode>Didn't receive a code?</DidNotReceiveCode>
      </Main>
    </>
  );
};

export default ConfirmOTP;
