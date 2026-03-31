const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend Mystic Moon Makeup funcionando ✨');
});

// Puerto
app.listen(4000, () => {
  console.log('Servidor corriendo en http://localhost:4000');
});
