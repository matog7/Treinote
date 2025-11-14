// src/app.ts
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8888;

// Importation des routes
const loginRoutes = require("./routes/LoginRoutes");
const trainingRoutes = require("./routes/TrainingRoutes");
const eventRoutes = require("./routes/EventRoutes");

// Middleware pour parser le JSON
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

// Routes API
app.use("/api/auth", loginRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/events", eventRoutes);

// Route de test
app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Bienvenue sur l'API Treinote!");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
