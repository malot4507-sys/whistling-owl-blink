-- EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- WALLET (CUSTODIAL)
-- =========================
CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  balance NUMERIC(18,8) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TRANSACTIONS
-- =========================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  amount NUMERIC(18,8),
  type TEXT, -- deposit, bet, win, withdraw
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- PROVABLY FAIR SEEDS
-- =========================
CREATE TABLE provably_fair (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  server_seed TEXT NOT NULL,
  server_seed_hash TEXT NOT NULL,
  client_seed TEXT NOT NULL,
  nonce INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- GAMES
-- =========================
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  house_edge NUMERIC(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- BETS
-- =========================
CREATE TABLE bets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  game_id UUID REFERENCES games(id),
  amount NUMERIC(18,8),
  result TEXT,
  payout NUMERIC(18,8),
  nonce INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- AUDIT LOG
-- =========================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
