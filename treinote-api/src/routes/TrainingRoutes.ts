import express from "express";
const router = express.Router();

const { pool } = require("../lib/db");

// Récupérer les entraînements d'un utilisateur
// GET /api/trainings/:id
router.get("/trainings/:id", async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId || Number.isNaN(userId)) {
    return res.status(400).json({ message: "Paramètre id invalide" });
  }

  try {
    const { rows } = await pool.query(
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

module.exports = router;
