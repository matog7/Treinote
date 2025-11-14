import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_BASE,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
});

export const query = (text: string, params?: unknown[]) =>
  pool.query(text, params);
export default pool;
