-- =====================================
-- USERS TABLE
-- =====================================
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(20) PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,

  role VARCHAR(20) NOT NULL DEFAULT 'user', -- admin, agency, host, user
  agency_id VARCHAR(40),

  -- LEVEL SYSTEM
  level INTEGER DEFAULT 1,
  exp INTEGER DEFAULT 0,
  vip_level INTEGER DEFAULT 0,

  -- BALANCE SYSTEM
  coins INTEGER DEFAULT 0,     -- viewer coins
  diamonds INTEGER DEFAULT 0,  -- host income

  avatar_url TEXT,
  bio TEXT,

  is_active BOOLEAN DEFAULT TRUE,
  refresh_token TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (agency_id) REFERENCES agencies(id) ON DELETE SET NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_agency ON users(agency_id);
CREATE INDEX idx_users_username ON users(username);



-- =====================================
-- AGENCIES TABLE
-- =====================================
CREATE TABLE IF NOT EXISTS agencies (
  id VARCHAR(40) PRIMARY KEY,
  agency_name VARCHAR(255) NOT NULL,
  description TEXT,

  owner_id VARCHAR(40) REFERENCES users(id) ON DELETE SET NULL,
  commission_rate DECIMAL(5,2) DEFAULT 20.00, -- 20% default

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =====================================
-- LIVE ROOMS TABLE
-- =====================================
CREATE TABLE IF NOT EXISTS live_rooms (
  id VARCHAR(40) PRIMARY KEY,
  host_id VARCHAR(40) REFERENCES users(id),

  title VARCHAR(255),
  category VARCHAR(50),

  agora_channel VARCHAR(255),
  agora_token TEXT,
  stream_key VARCHAR(255),
  thumbnail_url TEXT,

  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,
  total_viewers INTEGER DEFAULT 0,

  is_active BOOLEAN DEFAULT TRUE,
  is_banned BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_live_rooms_host ON live_rooms(host_id);
CREATE INDEX idx_live_rooms_active ON live_rooms(is_active);



-- =====================================
-- GIFTS TABLE
-- =====================================
CREATE TABLE IF NOT EXISTS gifts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,

  category VARCHAR(50), -- normal, lucky, j-lucky, luxury
  image_url TEXT,

  jp_multiplier INTEGER DEFAULT 0, -- untuk JP reward multiplier

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =====================================
-- GIFT TRANSACTIONS TABLE
-- (FULL JP SYSTEM + INCOME SPLIT)
-- =====================================
CREATE TABLE IF NOT EXISTS gift_transactions (
  id SERIAL PRIMARY KEY,

  sender_id VARCHAR(40) REFERENCES users(id),
  receiver_id VARCHAR(40) REFERENCES users(id), -- host
  gift_id INTEGER REFERENCES gifts(id),
  room_id VARCHAR(40) REFERENCES live_rooms(id),

  combo INTEGER DEFAULT 1,        -- total tap (x1,x2,x3,x50,x100)
  total_price INTEGER NOT NULL,   -- coins spent

  -- INCOME BREAKDOWN
  host_income INTEGER DEFAULT 0,
  agency_income INTEGER DEFAULT 0,
  platform_income INTEGER DEFAULT 0,

  -- JP SYSTEM (Lucky, J-Lucky)
  jp_trigger BOOLEAN DEFAULT FALSE,
  jp_milestone INTEGER,      -- contoh: 20, 50, 100, 200, 500
  jp_reward INTEGER,         -- reward coin ke spender

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gift_tx_sender ON gift_transactions(sender_id);
CREATE INDEX idx_gift_tx_receiver ON gift_transactions(receiver_id);
CREATE INDEX idx_gift_tx_room ON gift_transactions(room_id);
CREATE INDEX idx_gift_tx_date ON gift_transactions(created_at);



-- =====================================
-- USER FANS / FOLLOW SYSTEM
-- =====================================
CREATE TABLE IF NOT EXISTS user_fans (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(40) REFERENCES users(id),
  fan_id VARCHAR(40) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fans_user ON user_fans(user_id);
CREATE INDEX idx_fans_fan ON user_fans(fan_id);