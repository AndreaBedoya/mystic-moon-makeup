const express = require("express");
const router = express.Router();
const pool = require("../db"); // ✅ importa tu conexión

// 🔹 Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// 🔹 Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]); // devuelve la categoría creada
  } catch (error) {
    res.status(500).json({ error: "Error al crear categoría" });
  }
});

// 🔹 Editar categoría
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query(
      "UPDATE categories SET name=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
      [name, id]
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
