import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && { rejectUnauthorized: false },
});

pool.query(`
  create extension if not exists "uuid-ossp";

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

  CREATE TABLE IF NOT EXISTS purchases(
    id SERIAL NOT NULL PRIMARY KEY,
    stripe_id VARCHAR(256) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    customer_id uuid NOT NULL,
    CONSTRAINT fk_th_user
    FOREIGN KEY (customer_id) REFERENCES th_users (id)
  );

  CREATE TABLE IF NOT EXISTS purchased_items(
    id SERIAL NOT NULL PRIMARY KEY,
    purchase_id INTEGER NOT NULL,
    sanity_item_id VARCHAR(256) NOT NULL,
    price INTEGER NOT NULL,
    name VARCHAR(256) NOT NULL,
    quantity INTEGER NOT NULL,
    CONSTRAINT fk_purchase
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)
  );

  CREATE TABLE IF NOT EXISTS sessions(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_tracking_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    logged_in_user_id uuid REFERENCES th_users (id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_known_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip_address cidr NOT NULL
  );

`);

export default pool;
