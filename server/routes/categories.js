const express = require("express");
const router = express.Router();
const pool = require("../db"); 
const multer = require("multer");
const path = require("path");

// 📂 Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/categories")); // carpeta donde guardar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nombre único
  }
});

const upload = multer({ storage });

// 🔹 Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// 🔹 Crear nueva categoría con imagen
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const image_url = req.file ? `/uploads/categories/${req.file.filename}` : null;

    const result = await pool.query(
      "INSERT INTO categories (name, image_url) VALUES ($1, $2) RETURNING *",
      [name, image_url]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear categoría" });
  }
});


// 🔹 Editar categoría (nombre e imagen opcional)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const image_url = req.file ? `/uploads/categories/${req.file.filename}` : null;

    const result = await pool.query(
      "UPDATE categories SET name=$1, image_url=$2, updated_at=NOW() WHERE id=$3 RETURNING *",
      [name, image_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
});

// 🔹 Eliminar categoría
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM categories WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json({ message: "Categoría eliminada", category: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
});

module.exports = router;
