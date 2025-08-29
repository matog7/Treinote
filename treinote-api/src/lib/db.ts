// Chargement des variables d'environnement
require("dotenv").config();

const { Pool } = require("pg");

// Préférence à DATABASE_URL si présente, sinon variables séparées
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      database: process.env.DB_BASE,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
    });

module.exports = { pool };
