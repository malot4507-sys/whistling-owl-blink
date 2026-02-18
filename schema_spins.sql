CREATE TABLE IF NOT EXISTS spins (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  bet NUMERIC,
  win NUMERIC,
  reels TEXT,
  server_seed TEXT,
  client_seed TEXT,
  nonce INTEGER,
  hash TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
