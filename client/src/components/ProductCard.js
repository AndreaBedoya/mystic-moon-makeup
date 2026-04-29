import React, { useState, useContext } from 'react';
import '../styles/ProductCard.css';
import { CartContext } from '../context/CartContext';

function ProductCard({ id, name, price, description, images, category, onAddToCart }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useContext(CartContext);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="product-card">
      <div className="image-carousel">
        <button onClick={prevImage}>&lt;</button>
        <img
          src={`http://localhost:4000${images[currentImage]}`}
          alt={name}
        />
        <button onClick={nextImage}>&gt;</button>
      </div>
      <h3>{name}</h3>
      <p className="description">{description}</p>
      <p className="price">
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price)}
      </p>
      <p className="category">{category}</p>
      <button
        className="add-to-cart"
        onClick={() => {
          addToCart({ id, name, price, images, category });
          if (onAddToCart) onAddToCart(); // ✅ abre carrito
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
