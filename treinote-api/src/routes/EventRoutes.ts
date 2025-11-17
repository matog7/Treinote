import express from "express";
import { query } from "../lib/db";
const router = express.Router();

router.get("/all", async (req, res) => {
  const { rows } = await query("SELECT * FROM event");
  return res.json(rows);
});

router.get("/statByUser/:id", async (req, res) => {
  const userId = Number(req.params.id);
  const rowsEvents = (
    await query("SELECT * FROM event WHERE organizer_id = $1", [userId])
  ).rows;
  return res.json(rowsEvents);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await query("SELECT * FROM event WHERE event_id = $1", [id]);
  return res.json(rows[0]);
});

router.post("/create", async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    category,
    maxParticipants,
    price,
    difficulty,
    tags,
    image,
    status,
    organizer,
    organizer_id,
  } = req.body;
  const { rows } = await query(
    "INSERT INTO event (title, description, date, time, location, category, maxParticipants, price, difficulty, tags, image, status, organizer, organizer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
    [
      title,
      description,
      date,
      time,
      location,
      category,
      maxParticipants,
      price,
      difficulty,
      tags,
      image,
      status,
      organizer,
      organizer_id,
    ]
  );
  return res.json(rows[0]);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    date,
    time,
    location,
    category,
    maxParticipants,
    price,
    difficulty,
    tags,
    image,
    status,
  } = req.body;
  const { rows } = await query(
    "UPDATE event SET title = $1, description = $2, date = $3, time = $4, location = $5, category = $6, maxParticipants = $7, price = $8, difficulty = $9, tags = $10, image = $11, status = $12 WHERE event_id = $13 RETURNING *",
    [
      title,
      description,
      date,
      time,
      location,
      category,
      maxParticipants,
      price,
      difficulty,
      tags,
      image,
      status,
      id,
    ]
  );
  return res.json(rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await query(
    "DELETE FROM event WHERE event_id = $1 RETURNING *",
    [id]
  );
  return res.json(rows[0]);
});

module.exports = router;
