const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

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

// Importar rutas
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
