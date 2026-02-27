// One-time migration script to create team_user_jersey table in pucknorris-postgres
// Run with: node scripts/migrate-jerseys.mjs
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: 'pucknorris-postgres.cax2fpxeuink.us-west-2.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: 'euYP8xsVV9uUKbonyycc',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
});

const sql = `
CREATE TABLE IF NOT EXISTS team_user_jersey (
    id             UUID        NOT NULL DEFAULT gen_random_uuid()
    , team_user_id UUID        NOT NULL
    , team_id      UUID        NOT NULL
    , user_id      UUID        NOT NULL
    , size         VARCHAR(50)
    , number       VARCHAR(50)
    , color        VARCHAR(50)
    , name         VARCHAR(255)
    , is_loaned    BOOLEAN     NOT NULL DEFAULT FALSE
    , is_paid      BOOLEAN     NOT NULL DEFAULT FALSE
    , jersey_type  VARCHAR(50)
    , created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    , updated_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    , PRIMARY KEY (id)
);
`;

try {
  const client = await pool.connect();
  console.log('Connected to database');
  await client.query(sql);
  console.log('team_user_jersey table created (or already exists)');
  client.release();
} catch (err) {
  console.error('Migration failed:', err.message);
} finally {
  await pool.end();
}
