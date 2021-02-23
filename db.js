import pg from "pg";

const pool = new pg.Pool();

pool.query(`
  CREATE TABLE IF NOT EXISTS th_users(                                       
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(256) UNIQUE NOT NULL,
    otp CHAR(6) NOT NULL,
    country VARCHAR(256) NOT NULL,
    name VARCHAR(256) NOT NULL,
    email_consent BOOLEAN NOT NULL,
    tos_consent BOOLEAN NOT NULL,
    dob DATE
  );
`);

export default pool;
