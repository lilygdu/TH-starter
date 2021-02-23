import express from "express";
import { v4 as uuidv4 } from "uuid";
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

  const queryResult = await db.query(
    `SELECT * FROM th_users WHERE email = $1;`,
    [email]
  );

  if (queryResult.rows.length > 0) {
    response
      .status(401)
      .json({ message: `A user with the email ${email} already exists.` });
    return;
  }

  if (!email || !emailRegex.test(email)) {
    response
      .status(400)
      .json({ message: `That doesn't look like a valid email.` });
    return;
  }

  if (!country) {
    response.status(400).json({ message: `country is required.` });
    return;
  }

  if (!name) {
    response.status(400).json({ message: `name is required.` });
    return;
  }

  if (!tos_consent) {
    response.status(400).json({ message: `tos consent is required.` });
    return;
  }

  const insertResult = await db.query(
    `INSERT INTO th_users (email, name, country, dob, tos_consent, email_consent, otp) 
    VALUES(
      $1, $2, $3, $4, $5, $6, 
      (SELECT string_agg(shuffle('0123456789')::char, '')
      FROM generate_series(1, 6)) 
    ) 
    RETURNING *;`,
    [email, name, country, dob, !!tos_consent, !!email_consent]
  );

  response.json(insertResult.rows[0]);
});

app.listen(port, () => console.log(`API running on port ${port} 🚀`));
