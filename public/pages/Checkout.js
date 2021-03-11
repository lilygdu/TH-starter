import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../components/Button";

const stripePromise = loadStripe(
  "pk_test_51ITqhfK3N0KQbmMTSKBgE1P8cSOmKkyr8xnoHQ5PFdSEndfOdEVmUMK8FGTJyfuT6UPFfGPaUgusk0lS14Fll6kk00SojsxXhj"
);

const Checkout = () => {
  const handleCheckoutClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/checkout", { method: "POST" });
    const { id } = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: id });
    if (result.error) {
      alert("ooops");
    }
  };

  return (
    <main
      style={{ margin: "10rem auto", textAlign: "center", maxWidth: "50rem" }}
    >
      <h1>Checkout Page!!</h1>
      <Button
        variant="primary"
        size="lg"
        $fullWidth
        onClick={handleCheckoutClick}
      >
        Buy the one thing this store apparently sells
      </Button>
    </main>
  );
};

export default Checkout;
