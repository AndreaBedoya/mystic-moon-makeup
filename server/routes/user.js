const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Crear usuario
router.post("/", upload.single("profile_picture"), async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      document_id,
      phone_number,
      birthdate,
      address,
      status,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const profile_picture = req.file ? req.file.filename : null;

    const result = await pool.query(
      `INSERT INTO users 
       (username, email, password_hash, role, profile_picture, document_id, phone_number, birthdate, address, status) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [
        username,
        email,
        hashedPassword,
        role,
        profile_picture,
        document_id,
        phone_number,
        birthdate,
        address,
        status,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear usuario:", err.message);
    if (err.code === "23505") {
      return res.status(400).json({
        error: `El usuario o correo ya ha sido registrado anteriormente.`,
      });
    }
    res.status(500).json({ error: "Error interno al crear usuario" });
  }
});

// Listar usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al listar usuarios:", err.message);
    res.status(500).json({ error: "Error interno al listar usuarios" });
  }
});

// Editar usuario
router.put("/:id", upload.single("profile_picture"), async (req, res) => {
  try {
    const {
      username,
      email,
      role,
      document_id,
      phone_number,
      birthdate,
      address,
      status,
      password,
    } = req.body;

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const profile_picture = req.file ? req.file.filename : undefined;

    const result = await pool.query(
      `UPDATE users SET 
       username=$1, email=$2, role=$3, 
       profile_picture=COALESCE($4, profile_picture), 
       document_id=$5, phone_number=$6, birthdate=$7, address=$8, status=$9,
       password_hash=COALESCE($10, password_hash)
       WHERE id=$11 RETURNING *`,
      [
        username,
        email,
        role,
        profile_picture,
        document_id,
        phone_number,
        birthdate,
        address,
        status,
        hashedPassword,
        req.params.id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar usuario:", err.message);
    if (err.code === "23505") {
      return res.status(400).json({
        error: `El correo o usuario '${req.body.username}' ya existe.`,
      });
    }
    res.status(500).json({ error: "Error interno al actualizar usuario" });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err.message);
    res.status(500).json({ error: "Error interno al eliminar usuario" });
  }
});

module.exports = router;
