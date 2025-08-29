CREATE TABLE IF NOT EXISTS training (
  training_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL,
  intensity INTEGER NOT NULL CHECK (intensity BETWEEN 0 AND 10),
  description TEXT,
  equipment TEXT,
  notes TEXT,
  CONSTRAINT fk_training_user
    FOREIGN KEY (user_id)
    REFERENCES "user"(user_id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_training_user_id ON training(user_id);

-- Données d'exemple (facultatif)
INSERT INTO training (user_id, title, date, time, duration, intensity, description, equipment, notes)
VALUES
  ((SELECT user_id FROM "user" WHERE email = 'test@mail.fr' LIMIT 1), 'Séance cardio', CURRENT_DATE, '18:00', 45, 6, 'Course sur tapis + rameur', 'Chaussures running', 'Échauffement 10min'),
  ((SELECT user_id FROM "user" WHERE email = 'test@mail.fr' LIMIT 1), 'Full body', CURRENT_DATE + INTERVAL '1 day', '19:00', 60, 7, 'Circuit full body', 'Haltères, tapis', 'Ne pas forcer sur les épaules')
ON CONFLICT DO NOTHING;


