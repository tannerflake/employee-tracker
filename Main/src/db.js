const dotenv = require('dotenv'); // Use require for CommonJS
const { Pool } = require('pg'); // Import Pool from pg

// Load environment variables
dotenv.config();

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10), // Default to 5432
});

// Export the pool
module.exports = { pool };