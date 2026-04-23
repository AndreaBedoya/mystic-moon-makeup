const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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

// Array en memoria para guardar productos
let products = [];

// ✅ Crear producto con imágenes (POST /api/products)
router.post("/", upload.array("images", 5), (req, res) => {
    // Los campos de texto vienen en req.body gracias a multer
    const { name, price, description, category } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Nombre y precio son obligatorios" });
    }

    // Si hay imágenes subidas, generar rutas públicas
    const imagePaths = req.files && req.files.length > 0
        ? req.files.map(file => `/uploads/${file.filename}`)
        : [];

    const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
        category,
        images: imagePaths
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// ✅ Listar productos (GET /api/products)
router.get("/", (req, res) => {
    res.json(products);
});

// ✅ Eliminar producto (DELETE /api/products/:id)
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    const deleted = products.splice(index, 1);
    res.json({ message: "Producto eliminado", product: deleted[0] });
});

// ✅ Actualizar producto (PUT /api/products/:id)
router.put("/:id", upload.array("images", 5), (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    const product = products.find(p => p.id == id);
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Si se subieron nuevas imágenes, reemplazarlas
    if (req.files && req.files.length > 0) {
        product.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Actualizar campos
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    res.json(product);
});

module.exports = router;
