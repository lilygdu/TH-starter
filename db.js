import pg from "pg";

const pool = new pg.Pool();

pool.query(`
  CREATE TABLE IF NOT EXISTS th_users(                                       
    email VARCHAR(256) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL CHECK (length(password) >= 8),
    id uuid DEFAULT uuid_generate_v4(),
    PRIMARY KEY (id)
  );
`);

export default pool;
