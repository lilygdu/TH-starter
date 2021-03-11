import express from "express";
import dirname from "es-dirname";
import path from "path";
import db from "./db.js";
import stripeLibrary from "stripe";

const app = express();
const port = process.env.PORT || 5000;
const stripe = stripeLibrary(
  "sk_test_51ITqhfK3N0KQbmMT8TBZQyfOSgJN0S0DKucX7Fvl4ZOwmrFXkQ7okYeh3hVj3NyZvkWvftHPnJHVNXvVHnszoKby0017txxIeX"
);

app.use(express.json());
app.use(express.static("dist"));

const emailRegex = new RegExp(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/);

const YOUR_DOMAIN = "http://localhost:5000/confirmation";

app.get("/sessions/:sessionID", async (request, response) => {
  const { sessionID } = request.params;

  const session = await stripe.checkout.sessions.retrieve(sessionID);
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionID, {
    limit: 100,
  });

  response.json({ session, lineItems });
});

app.post("/checkout", async (request, response) => {
  const { userEmail, items } = request.body;

  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    payment_method_types: ["card"],
    metadata: {
      createdAt: new Date().toISOString(),
    },
    line_items: items.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  response.json({ id: session.id });
});

app.post("/signup", async (request, response) => {
  const {
    email,
    name,
    country,
    dob,
    tos_consent,
    email_consent,
  } = request.body;

  const errors = {};

  if (!emailRegex.test(email)) {
    errors.email = "That doesn't look like a valid email.";
  }
  if (!email) {
    errors.email = "Email is a required field.";
  }
  if (!country) {
    errors.country = "Country is a required field.";
  }
  if (!name) {
    errors.name = "Name is a required field.";
  }
  if (!tos_consent) {
    errors.tos_consent =
      "You must agree to the privacy policy and terms of service before signing up.";
  }

  const queryResult = await db.query(
    `SELECT * FROM th_users WHERE email = $1;`,
    [email]
  );
  if (queryResult.rows.length > 0) {
    errors.email = `An account with the given email already exists.`;
  }

  if (Object.keys(errors).length > 0) {
    response.status(401).json(errors);
    return;
  }

  const insertResult = await db.query(
    `INSERT INTO th_users (email, name, country, dob, tos_consent, email_consent, otp) 
    VALUES(
      $1, $2, $3, $4, $5, $6, 
      (SELECT string_agg(shuffle('0123456789')::char, '') FROM generate_series(1, 6)) 
    ) 
    RETURNING email, otp;`,
    [email, name, country, dob, !!tos_consent, !!email_consent]
  );

  response.json({
    email: insertResult.rows[0].email,
    otp: insertResult.rows[0].otp,
  });
});

app.post("/confirm-otp", async (request, response) => {
  const { email, otp } = request.body;
  const match = await db.query(
    `SELECT * FROM th_users 
    WHERE email = $1 AND otp = $2 AND account_locked = $3;`,
    [email, otp, false]
  );
  const matchingUser = match.rows[0];
  if (matchingUser) {
    delete matchingUser.otp;
    response.json(matchingUser);
  } else {
    const failedAttemptsResult = await db.query(
      `SELECT failed_attempts from th_users WHERE email = $1;`,
      [email]
    );
    const failedUser = failedAttemptsResult.rows[0];
    if (!failedUser) {
      response.status(401).json({ message: "No such user" });
      return;
    }
    const failedAttempts = failedUser.failed_attempts + 1;
    await db.query(
      `UPDATE th_users
      SET failed_attempts = $1, account_locked = $2
      WHERE email = $3;`,
      [failedAttempts, failedAttempts >= 5, email]
    );
    if (failedAttempts >= 5) {
      response.status(401).json({
        otp: `You've reached the maximum login attempts we allow, please contact customer service.`,
      });
    } else {
      response.status(401).json({
        otp: `The code you entered doesn't match the code we sent. Check your messages and try typing it in again.`,
      });
    }
  }
});

app.post("/signin", async (request, response) => {
  const { email } = request.body;
  const match = await db.query(`SELECT * FROM th_users WHERE email = $1;`, [
    email,
  ]);
  const user = match.rows[0];
  if (user) {
    const updateResult = await db.query(
      `
      UPDATE th_users
      SET otp = (SELECT string_agg(shuffle('0123456789')::char, '') FROM generate_series(1, 6))
      WHERE email = $1
      RETURNING email, otp;
      `,
      [email]
    );
    response.json(updateResult.rows[0]);
  } else if (!emailRegex.test(email)) {
    response.status(401).json({
      email: `That doesn't look like a valid email.`,
    });
  } else {
    response.status(401).json({
      email: `This user does not exist.`,
    });
  }
});

app.get("/*", (_request, response) => {
  response.sendFile(path.join(dirname(), "dist", "index.html"));
});

app.listen(port, () => console.log(`API running on port ${port} 🚀`));
