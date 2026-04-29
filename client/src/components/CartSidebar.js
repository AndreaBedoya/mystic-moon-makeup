import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartSidebar.css";

function CartSidebar({ onClose }) {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const envioGratis = 100000; // ✅ umbral para envío gratis

  return (
    <div className="cart-sidebar">
      <button className="close-btn" onClick={onClose}>✖</button>
      <h3>TU CARRITO</h3>

      {/* Barra de progreso para envío gratis */}
      {total < envioGratis && (
        <p className="envio-msg">
          Te faltan {new Intl.NumberFormat("es-CO").format(envioGratis - total)} COP para tu envío gratis
        </p>
      )}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${Math.min((total/envioGratis)*100,100)}%` }}></div>
      </div>

      {/* Lista de productos */}
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="item-name">{item.name}</span>
            <span className="item-qty">x{item.quantity}</span>
            <span className="item-price">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(item.price * item.quantity)}
            </span>
            <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
          </div>
        ))
      )}

      {/* Subtotal */}
      <h4 className="subtotal">
        SUBTOTAL {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(total)}
      </h4>

      {/* Botones */}
      <button className="checkout-btn">Realizar compra</button>
      <button className="clear-btn" onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default CartSidebar;
