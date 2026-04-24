const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("../db"); // conexión a PostgreSQL

// Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // nombre único
  }
});

const upload = multer({ storage });

// ✅ Crear producto con imágenes (POST /api/products)
router.post("/", upload.array("images", 5), async (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Nombre y precio son obligatorios" });
  }

  const imagePaths = req.files && req.files.length > 0
    ? req.files.map(file => `/uploads/${file.filename}`)
    : [];

  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, description, category, images) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, price, description, category, imagePaths]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar producto en la base de datos" });
  }
});

// ✅ Listar productos (GET /api/products)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// ✅ Eliminar producto (DELETE /api/products/:id)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado ❌" });
    }

    res.json({ message: "Producto eliminado ✅", product: result.rows[0] });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error interno del servidor ❌" });
  }
});


// Actualizar producto (PUT /api/products/:id)
router.put("/:id", upload.array("images", 5), async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;

  // Si se suben nuevas imágenes, reemplazarlas
  const imagePaths = req.files && req.files.length > 0
    ? req.files.map(file => `/uploads/${file.filename}`)
    : null;

  try {
    const result = await pool.query(
      `UPDATE products 
       SET name = COALESCE($1, name), 
           price = COALESCE($2, price), 
           description = COALESCE($3, description), 
           category = COALESCE($4, category), 
           images = COALESCE($5, images) 
       WHERE id = $6 
       RETURNING *`,
      [name, price, description, category, imagePaths, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

module.exports = router;
