import express from "express";
const router = express.Router();

const { pool } = require("../lib/db");

// Authentification simple: POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ message: "email et password sont requis" });
  }

  try {
    // Table "user" (email, password)
    const result = await pool.query(
      'SELECT * FROM "user" WHERE email = $1 LIMIT 1',
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const user = result.rows[0];

    // NOTE: Comparaison de mot de passe à adapter (bcrypt recommandé)
    const isValid = user.password === password; // Remplacer par bcrypt.compare(pwd, user.password_hash)
    if (!isValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    return res.json({
      id: user.user_id,
      pseudo: user.pseudo,
      email: user.email,
    });
  } catch (err) {
    console.error("Erreur login:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
