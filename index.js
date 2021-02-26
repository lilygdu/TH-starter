import express from "express";
import db from "./db.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static("public"));

const emailRegex = new RegExp(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/);

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
    `
    SELECT * FROM th_users WHERE email = $1 AND otp = $2;
  `,
    [email, otp]
  );

  const user = match.rows[0];

  if (user) {
    delete user.otp;
    response.json(user);
  } else {
    const numAttempts = await db.query(
      `SELECT failed_attempts from th_users WHERE email = $1
      `
    );
    if (numAttempts < 5) {
      numAttempts += 1;
      const addAttempt = await db.query(
        `
        UPDATE th_users
        SET failed_attempts = $1 
        WHERE email = $2
        RETURNING email, failed_attempts;
        `,
        [numAttempts, email]
      );
      response.status(401).json({
        message: `The code you entered doesn't match the code we sent. Check your messages and try typing it in again.`,
      });
    } else {
      response.status(401).json({
        message: `You've reached the maximum login attempts we allow, please contact customer service.`,
      });
      const lockAccount = await db.query(
        `
        UPDATE th_users
        SET account_locked = TRUE 
        WHERE email = $1
        RETURNING email, account_locked;
        `,
        [email]
      );
    }
    //do something
    const resetAttempts = await db.query(
      `
        UPDATE th_users
        SET failed_attempts = 0 
        WHERE email = $1
        RETURNING email, failed_attempts;
        `,
      [email]
    );
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
      message: `That doesn't look like a valid email.`,
    });
  } else {
    response.status(401).json({
      message: `This user does not exist.`,
    });
  }
});

app.listen(port, () => console.log(`API running on port ${port} 🚀`));
