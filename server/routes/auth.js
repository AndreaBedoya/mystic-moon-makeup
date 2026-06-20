const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db.js");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // Depuración
    console.log("Password recibido:", password);
    console.log("Password en DB:", user.password_hash);

    if (!user.password_hash) {
      return res.status(500).json({ error: "El usuario no tiene contraseña válida en la base de datos" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Validar rol
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Acceso denegado. Solo administradores pueden entrar." });
    }

    res.json({ user });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
