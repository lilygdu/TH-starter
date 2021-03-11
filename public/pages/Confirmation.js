import React from "react";
import { parseISO, format } from "date-fns";
import { fetchSession } from "../utils/stripe";
import { UserContext } from "../context/UserContext";
import { formatCents } from "../utils/price";

const Confirmation = () => {
  const query = new URLSearchParams(window.location.search);
  const sessionID = query.get("session_id");
  const { userName } = React.useContext(UserContext);

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

  const orderTime =
    session.metadata && format(parseISO(session.metadata.createdAt), "h:mm aa");

  return (
    <main
      style={{ margin: "10rem auto", textAlign: "center", maxWidth: "50rem" }}
    >
      <aside>
        <h2>Enjoy your order. See you soon!</h2>
        <button variant="primary" size="lg">
          Home
        </button>
      </aside>
      <section>
        <h1>
          Your order has been placed in line with other customers and will be
          ready as soon as possible!
        </h1>
        <p>
          Drive up to the ordering screen and let us know you ordered online for{" "}
          {userName}
        </p>
        <p>Order Number: {sessionID.slice(9, 19)}</p>
        <p>
          Order Time: <b>{orderTime}</b>
        </p>
        <p>
          Method: <b>DriveThru</b>
        </p>

        <div>
          <h3>Your Order</h3>
          {lineItems.map((item) => (
            <div>
              <h4>{item.description}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>
                Price: {item.price.currency}
                {formatCents(item.price.unit_amount)}
              </p>
            </div>
          ))}
          <h4>
            Total: {session.currency}
            {formatCents(session.amount_total)}
          </h4>
          <p>View Receipt</p>
        </div>
      </section>
    </main>
  );
};

export default Confirmation;
