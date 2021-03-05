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
