-- Création table user et insertion d'un utilisateur test
CREATE TABLE IF NOT EXISTS "user" (
  user_id SERIAL PRIMARY KEY,
  pseudo VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO "user" (pseudo, email, password)
VALUES ('exemple', 'test@example.com', 'treinote')
ON CONFLICT (email) DO NOTHING;

INSERT INTO "user" (pseudo, email, password)
VALUES ('treinotest', 'test@mail.fr', 'test')
ON CONFLICT (email) DO NOTHING;


