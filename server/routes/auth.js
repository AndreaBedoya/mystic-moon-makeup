const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db.js");
const fs = require("fs");
const path = require("path");
const { sendEmail } = require("../utils/sendEmail.js"); // ✅ usamos tu función de envío

const router = express.Router();

// almacenamiento temporal de códigos
let codes = {};

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    if (!user.password_hash) {
      return res.status(500).json({ error: "El usuario no tiene contraseña válida en la base de datos" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Acceso denegado. Solo administradores pueden entrar." });
    }

    res.json({ user });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});


// ✅ Paso 1: enviar código
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = { code, expires: Date.now() + 10 * 60 * 1000 };

  // 📌 Leer plantilla HTML
  const plantillaPath = path.join(__dirname, "../templates/recuperacion.html");
  let html = fs.readFileSync(plantillaPath, "utf8");

  // 📌 Reemplazar marcador dinámico
  html = html.replace("{{codigo}}", code);

  // 📌 Enviar correo con tu función sendEmail
  await sendEmail(email, "Recuperación de contraseña", html);

  res.json({ message: "Código enviado a tu correo." });
});


// ✅ Paso 2: verificar código
router.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  const record = codes[email];
  if (record && record.code === code && record.expires > Date.now()) {
    res.json({ message: "Código válido." });
  } else {
    res.status(400).json({ message: "Código inválido o expirado." });
  }
});


// ✅ Paso 3: resetear contraseña
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);

  await pool.query("UPDATE users SET password_hash=$1 WHERE email=$2", [hashed, email]);

  res.json({ message: "Contraseña actualizada correctamente." });
});

module.exports = router;
