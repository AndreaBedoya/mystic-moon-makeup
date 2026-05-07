import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartSidebar.css";
import { IconTrash, IconMinus, IconPlus, IconX, IconShoppingCartFilled } from "@tabler/icons-react";

function CartSidebar({ onClose }) {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const envioGratis = 100000;

  return (
    <div className="cart-sidebar">
      {/* ✅ Encabezado con título y botón cerrar */}
      <div className="cart-header">
        <h3>TU CARRITO</h3>
        <button className="close-btn" onClick={onClose}>
          <IconX size={40} stroke={3} />
        </button>
      </div>

      {total < envioGratis ? (
        <p className="envio-msg">
          Te faltan {new Intl.NumberFormat("es-CO").format(envioGratis - total)} COP para tu envío gratis
        </p>
      ) : (
        <p className="envio-msg felicidades">
          ¡Felicidades! Tu envío ahora es gratis
        </p>
      )}


      {/* ✅ Barra de progreso con ícono de carrito */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${Math.min((total / envioGratis) * 100, 100)}%` }}
        ></div>
        <div className="progress-icon">
          <IconShoppingCartFilled size={40} stroke={2} />
        </div>
      </div>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="cart-items-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />

              <div className="cart-item-info">
                <span className="item-name">{item.name}</span>

                <div className="item-qty-control">
                  <button onClick={() => decreaseQty(item.id)} className="qty-btn">
                    <IconMinus />
                  </button>
                  <span className="item-qty">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="qty-btn">
                    <IconPlus />
                  </button>
                </div>

                <span className="item-price">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(item.price * item.quantity)}
                </span>
              </div>

              <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                <IconTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <h4 className="subtotal">
        SUBTOTAL{" "}
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(total)}
      </h4>

      <button className="checkout-btn">Realizar compra</button>
      <button className="clear-btn" onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default CartSidebar;
