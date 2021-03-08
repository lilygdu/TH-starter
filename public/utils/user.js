export const signUp = async ({
  email,
  country,
  name,
  emailConsent,
  tosConsent,
}) => {
  const response = await fetch(`/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      country,
      name,
      email_consent: emailConsent,
      tos_consent: tosConsent,
    }),
  });
  const data = await response.json();
  return { response, data };
};

export const confirmOTP = async ({ otp, email }) => {
  const response = await fetch(`/confirm-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const data = await response.json();
  return { response, data };
};

// morning activity added below

export const signIn = async ({ email }) => {
  const response = await fetch(`/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await response.json();
  return { response, data };
};
