import express from "express";
import { query } from "../lib/db";
const router = express.Router();

// Récupérer les préférences d'un utilisateur
// GET /api/preferences/:userId
router.get("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  if (!userId || Number.isNaN(userId)) {
    return res.status(400).json({ message: "Paramètre userId invalide" });
  }

  try {
    const { rows } = await query(
      `SELECT 
         preference_id AS id,
         user_id,
         navbar_shortcuts,
         created_at,
         updated_at
       FROM preferences
       WHERE user_id = $1`,
      [userId]
    );

    if (rows.length === 0) {
      // Retourner les préférences par défaut si aucune n'existe
      return res.json({
        user_id: userId,
        navbar_shortcuts: [
          { id: "home", label: "Accueil", path: "/" },
          { id: "training", label: "Entrainement", path: "/training" },
          { id: "community", label: "Communauté", path: "/community" },
        ],
      });
    }

    return res.json({
      user_id: rows[0].user_id,
      navbar_shortcuts: rows[0].navbar_shortcuts,
    });
  } catch (err) {
    console.error("Erreur get preferences:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// Mettre à jour ou créer les préférences d'un utilisateur
// PUT /api/preferences/:userId
router.put("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  if (!userId || Number.isNaN(userId)) {
    return res.status(400).json({ message: "Paramètre userId invalide" });
  }

  const { navbar_shortcuts } = req.body;

  if (!navbar_shortcuts || !Array.isArray(navbar_shortcuts)) {
    return res.status(400).json({
      message: "navbar_shortcuts doit être un tableau",
    });
  }

  if (navbar_shortcuts.length !== 3) {
    return res.status(400).json({
      message: "navbar_shortcuts doit contenir exactement 3 éléments",
    });
  }

  try {
    // Vérifier si des préférences existent déjà
    const existing = await query(
      "SELECT preference_id FROM preferences WHERE user_id = $1",
      [userId]
    );

    if (existing.rows.length > 0) {
      // Mettre à jour les préférences existantes
      const { rows } = await query(
        `UPDATE preferences 
         SET navbar_shortcuts = $1, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $2
         RETURNING 
           preference_id AS id,
           user_id,
           navbar_shortcuts,
           updated_at`,
        [JSON.stringify(navbar_shortcuts), userId]
      );

      return res.json({
        user_id: rows[0].user_id,
        navbar_shortcuts: rows[0].navbar_shortcuts,
      });
    } else {
      // Créer de nouvelles préférences
      const { rows } = await query(
        `INSERT INTO preferences (user_id, navbar_shortcuts)
         VALUES ($1, $2)
         RETURNING 
           preference_id AS id,
           user_id,
           navbar_shortcuts,
           created_at,
           updated_at`,
        [userId, JSON.stringify(navbar_shortcuts)]
      );

      return res.json({
        user_id: rows[0].user_id,
        navbar_shortcuts: rows[0].navbar_shortcuts,
      });
    }
  } catch (err) {
    console.error("Erreur update preferences:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// Réinitialiser les préférences d'un utilisateur
// DELETE /api/preferences/:userId
router.delete("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  if (!userId || Number.isNaN(userId)) {
    return res.status(400).json({ message: "Paramètre userId invalide" });
  }

  try {
    await query("DELETE FROM preferences WHERE user_id = $1", [userId]);

    return res.json({
      message: "Préférences supprimées avec succès",
      user_id: userId,
    });
  } catch (err) {
    console.error("Erreur delete preferences:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;

