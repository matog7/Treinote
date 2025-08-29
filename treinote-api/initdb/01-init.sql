-- Création du rôle et de la base si non existants
DO $$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE rolname = 'treinote'
   ) THEN
      CREATE ROLE treinote LOGIN PASSWORD 'treinote';
   END IF;
END $$;

DO $$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'treinote'
   ) THEN
      CREATE DATABASE treinote OWNER treinote;
   END IF;
END $$;

GRANT ALL PRIVILEGES ON DATABASE treinote TO treinote;


