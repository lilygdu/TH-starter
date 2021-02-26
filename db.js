import pg from "pg";

const pool = new pg.Pool();

pool.query(`
  create or replace function shuffle(text)
  returns text language sql as $$
    select string_agg(ch, '')
    from (
      select substr($1, i, 1) ch
      from generate_series(1, length($1)) i
      order by random()
    ) s
  $$;

  CREATE TABLE IF NOT EXISTS th_users(                                       
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(256) UNIQUE NOT NULL,
    otp CHAR(6) NOT NULL,
    country VARCHAR(256) NOT NULL,
    name VARCHAR(256) NOT NULL,
    email_consent BOOLEAN NOT NULL,
    tos_consent BOOLEAN NOT NULL,
    dob DATE,
    failed_attempts INTEGER DEFAULT 0 NOT NULL,
    account_locked BOOLEAN DEFAULT FALSE NOT NULL
  );
`);

export default pool;
