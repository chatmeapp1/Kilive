
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(20) PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  agency_id VARCHAR(20),
  diamonds INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 0,
  live_hours_today DECIMAL(10,2) DEFAULT 0,
  total_income INTEGER DEFAULT 0,
  refresh_token TEXT,
  is_active BOOLEAN DEFAULT true,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agencies table
CREATE TABLE IF NOT EXISTS agencies (
  id VARCHAR(20) PRIMARY KEY,
  agency_name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id VARCHAR(20) REFERENCES users(id),
  commission_rate DECIMAL(5,2) DEFAULT 20.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live rooms table
CREATE TABLE IF NOT EXISTS live_rooms (
  id VARCHAR(20) PRIMARY KEY,
  host_id VARCHAR(20) REFERENCES users(id),
  title VARCHAR(255),
  category VARCHAR(50),
  agora_channel VARCHAR(255),
  agora_token TEXT,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,
  total_viewers INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50),
  image_url TEXT,
  is_luxury BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gift transactions table
CREATE TABLE IF NOT EXISTS gift_transactions (
  id SERIAL PRIMARY KEY,
  sender_id VARCHAR(20) REFERENCES users(id),
  receiver_id VARCHAR(20) REFERENCES users(id),
  gift_id INTEGER REFERENCES gifts(id),
  room_id VARCHAR(20) REFERENCES live_rooms(id),
  combo INTEGER DEFAULT 1,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_live_rooms_host ON live_rooms(host_id);
CREATE INDEX IF NOT EXISTS idx_live_rooms_active ON live_rooms(is_active);
CREATE INDEX IF NOT EXISTS idx_gift_transactions_sender ON gift_transactions(sender_id);
CREATE INDEX IF NOT EXISTS idx_gift_transactions_receiver ON gift_transactions(receiver_id);
