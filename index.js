import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "./db.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static("public"));

const emailRegex = new RegExp(/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/);

app.post("/signup", async (request, response) => {
  const { email, password } = request.body;

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

  if (!password || password.length < 8) {
    response
      .status(400)
      .json({ message: `Password must be at least 8 characters.` });
    return;
  }

  const insertResult = await db.query(
    `INSERT INTO th_users (email, password) VALUES($1, $2) RETURNING * `,
    [email, password]
  );
  response.json(insertResult.rows[0]);
});

app.listen(port, () => console.log(`API running on port ${port} 🚀`));
