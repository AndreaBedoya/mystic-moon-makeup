// const express = require("express");
// const router = express.Router();
// const sendMessage = require("../utils/sendMessage");

// router.post("/", async (req, res) => {
//   const entry = req.body.entry?.[0];
//   const changes = entry?.changes?.[0];
//   const message = changes?.value?.messages?.[0];

//   if (message && message.text) {
//     const from = message.from; // número del cliente
//     const body = message.text.body;

//     // ✅ Respuesta automática con menú
//     if (body) {
//       await sendMessage(from, "Bienvenida a Mystic Moon Makeup 🌙\nElige una opción:\n1️⃣ Personaliza tu kit\n2️⃣ Métodos de pago\n3️⃣ Consulta a la administradora\n4️⃣ Soporte técnico");
//     }

//     // ✅ Opciones
//     if (body === "1") {
//       await sendMessage(from, "Perfecto 🌙, cuéntame cómo quieres personalizar tu kit.");
//     }
//     if (body === "2") {
//       await sendMessage(from, "Métodos de pago disponibles: Nequi, Daviplata, Bancolombia.");
//     }
//     if (body === "3") {
//       await sendMessage(from, "La administradora te atenderá en breve.");
//     }
//     if (body === "4") {
//       await sendMessage(from, "Nuestro soporte técnico está disponible, ¿qué problema tienes?");
//     }
//   }

//   res.sendStatus(200);
// });

// module.exports = router;
