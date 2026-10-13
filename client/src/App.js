import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./components/ForgotPassword";
import CrudProduct from "./components/CrudProduct";
import Dashboard from "./pages/Dashboard";
import { CartProvider } from "./context/CartContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/crud-product" element={<CrudProduct />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;