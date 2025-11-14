import express from "express";
import { query } from "../lib/db";
const router = express.Router();

// Récupérer les entraînements d'un utilisateur
// GET /api/trainings/:id
router.get("/trainings/:id", async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId || Number.isNaN(userId)) {
    return res.status(400).json({ message: "Paramètre id invalide" });
  }

  try {
    const { rows } = await query(
      `SELECT 
         training_id AS id,
         title,
         to_char(date, 'YYYY-MM-DD') AS date,
         to_char(time, 'HH24:MI') AS time,
         duration,
         intensity,
         description,
         equipment,
         notes
       FROM training
       WHERE user_id = $1
       ORDER BY date DESC, time DESC`,
      [userId]
    );
    return res.json(rows);
  } catch (err) {
    console.error("Erreur get trainings:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/latest/:id", async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId || Number.isNaN(userId)) {
    return res.status(400).json({ message: "Paramètre id invalide" });
  }

  try {
    const { rows } = await query(
      `SELECT 
         training_id AS id,
         title,
         to_char(date, 'YYYY-MM-DD') AS date,
         to_char(time, 'HH24:MI') AS time,
         duration,
         intensity,
         description,
         equipment,
         notes
       FROM training
       WHERE user_id = $1
       ORDER BY date DESC, time DESC
       LIMIT 1`,
      [userId]
    );
    return res.json(rows.length > 0 ? rows[0] : null);
  } catch (err) {
    console.error("Erreur get last training:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
