const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// ✅ Configuración de multer (carpeta donde se guardan las imágenes)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // carpeta uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // nombre único
  },
});

const upload = multer({ storage });

// ✅ Crear usuario con imagen
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
    res.status(400).json({ error: err.message });
  }
});

// ✅ Listar usuarios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Editar usuario
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
    } = req.body;

    const profile_picture = req.file ? req.file.filename : null;

    await pool.query(
      `UPDATE users SET 
       username=$1, email=$2, role=$3, profile_picture=$4, document_id=$5, phone_number=$6, birthdate=$7, address=$8, status=$9
       WHERE id=$10`,
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
        req.params.id,
      ]
    );

    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
