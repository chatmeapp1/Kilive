const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');

// Neon requires WebSocket mode
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing in .env");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,                    // limit concurrency - recommended for serverless
  idleTimeoutMillis: 10000,  // close idle connections
  connectionTimeoutMillis: 5000
});

// Standard query wrapper
const query = async (text, params = []) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error("❌ Database Query Error");
    console.error("Query:", text);
    console.error("Params:", params);
    console.error("Error:", err);
    throw err;
  }
};

// For manual client transactions
const getClient = async () => {
  const client = await pool.connect();
  return client;
};

module.exports = {
  query,
  pool,
  getClient
};