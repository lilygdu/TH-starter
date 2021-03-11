import React from "react";
import { fetchSession } from "../utils/stripe";

const Confirmation = () => {
  const query = new URLSearchParams(window.location.search);
  const sessionID = query.get("session_id");

  const [session, setSession] = React.useState({});
  const [lineItems, setLineItems] = React.useState([]);

  React.useEffect(async () => {
    const { response, data } = await fetchSession(sessionID);
    if (response.ok) {
      setSession(data.session);
      setLineItems(data.lineItems.data);
    } else {
      // someone is trying to hack us
    }
  }, []);

  console.log(session, lineItems);

  // I have the session Id
  // Make a get request to my backend
  // from the backend, use that information to learn more about the purchase
  // and send that information in a respinse
  // so that the FE can display it

  return (
    <main
      style={{ margin: "10rem auto", textAlign: "center", maxWidth: "50rem" }}
    >
      <h1>Confirmation Page!!</h1>

      <h2>Here will be some info about your order... {sessionID}</h2>
      <h2>You paid {session.amount_total} cents!</h2>
      <ul>
        {lineItems.map((item) => (
          <li key={item.id}>
            {item.quantity} {item.description} @ {item.price.unit_amount} for{" "}
            {item.amount_total}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Confirmation;
