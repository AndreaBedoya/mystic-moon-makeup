import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CrudProduct from "./components/CrudProduct";
import Dashboard from "./pages/Dashboard";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    // Envuelve toda la app con CartProvider para poder usar los datos del carrito en cualquier parte de la aplicación
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crud-product" element={<CrudProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
