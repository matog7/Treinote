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

module.exports = router;
