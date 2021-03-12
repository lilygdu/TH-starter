import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51ITqhfK3N0KQbmMTSKBgE1P8cSOmKkyr8xnoHQ5PFdSEndfOdEVmUMK8FGTJyfuT6UPFfGPaUgusk0lS14Fll6kk00SojsxXhj"
);

export const initiateCheckout = async ({
  userEmail,
  userID,
  items,
  currencyCode,
}) => {
  const stripe = await stripePromise;
  const response = await fetch("/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail, userID, items, currencyCode }),
  });
  const { id } = await response.json();
  await stripe.redirectToCheckout({ sessionId: id });
};

export const fetchSession = async (sessionID) => {
  const response = await fetch(`/sessions/${sessionID}`);
  const data = await response.json();
  return { data, response };
};
