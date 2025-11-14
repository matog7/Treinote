CREATE TABLE IF NOT EXISTS event (
  event_id SERIAL PRIMARY KEY,
  organizer_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  currentParticipants INTEGER NOT NULL DEFAULT 0,
  maxParticipants INTEGER NOT NULL,
  price INTEGER NOT NULL,
  difficulty VARCHAR(255) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  tags VARCHAR(255)[] NOT NULL,
  image VARCHAR(255),
  status VARCHAR(255) NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  CONSTRAINT fk_event_organizer_user
    FOREIGN KEY (organizer_id)
    REFERENCES "user"(user_id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_event_organizer_id ON event(organizer_id);

-- Données d'exemple (facultatif)
INSERT INTO event (organizer_id, title, description, date, time, location, category, maxParticipants, price, difficulty, tags, image, status)
VALUES
  ((SELECT user_id FROM "user" WHERE email = 'test@mail.fr' LIMIT 1), 'Tennis', 'Tennis', CURRENT_DATE, '18:00', 'Paris', 'Sport', 10, 100, 'beginner', '{Tennis}', 'https://example.com/image.jpg', 'upcoming'),
  ((SELECT user_id FROM "user" WHERE email = 'test@mail.fr' LIMIT 1), 'Football', 'Football', CURRENT_DATE, '18:00', 'Paris', 'Sport', 10, 100, 'beginner', '{Football}', 'https://example.com/image.jpg', 'upcoming');


