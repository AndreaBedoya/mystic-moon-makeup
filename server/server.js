const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Importar rutas
const productRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const webhookRoutes = require("./routes/webhook"); // ✅ nuevo

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ✅ Verificar que la carpeta "uploads" exista, si no crearla
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Servir carpeta "uploads" como pública
app.use("/uploads", express.static(uploadsDir));

// 🔹 Rutas de productos
app.use("/api/products", productRoutes);

// 🔹 Rutas de categorías
app.use("/api/categories", categoriesRoutes);

// 🔹 Ruta del webhook de WhatsApp
app.use("/webhook", webhookRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
