const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Importar rutas
const productRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth"); 
// const webhookRoutes = require("./routes/webhook"); // opcional

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// --------------------------- Verificar carpeta "uploads" --------------------------
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ------------------------------ Servir carpeta "uploads" --------------------------
app.use("/uploads", express.static(uploadsDir));

// ------------------------------------------ Rutas ---------------------------------
app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", userRoutes);
app.use("/api", authRoutes); // ✅ login en /api/login

// ------------------------------------ Ruta base -----------------------------------
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// -------------------------------------------------- Iniciar servidor --------------
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
