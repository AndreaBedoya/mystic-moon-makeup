const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Importar rutas
const productRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const userRoutes = require("./routes/user"); // ✅ debe llamarse igual que el archivo
// const webhookRoutes = require("./routes/webhook"); // opcional, comenta si no lo usas

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

// ✅ Rutas de productos
app.use("/api/products", productRoutes);

// ✅ Rutas de categorías
app.use("/api/categories", categoriesRoutes);

// ✅ Rutas de usuarios
app.use("/api/users", userRoutes); // 🔹 consistente con las demás rutas

// 🔹 Ruta del webhook de WhatsApp (solo si ya tienes el archivo creado)
// app.use("/api/webhook", webhookRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
