import * as dotenv from "dotenv";
import pg from "pg";

// Load environment variables from .env
dotenv.config();

const { Pool } = pg;

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10), // Default to 5432
});

// Export the pool instance
export { pool };
