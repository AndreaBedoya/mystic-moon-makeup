import React, { useState } from 'react';
import '../styles/ProductCard.css';

function ProductCard({ name, price, description, images, category }) {
  const [currentImage, setCurrentImage] = useState(0);

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
        {/* ✅ Aquí concatenamos la URL del backend */}
        <img
          src={`http://localhost:4000${images[currentImage]}`}
          alt={name}
        />
        <button onClick={nextImage}>&gt;</button>
      </div>
      <h3>{name}</h3>
      <p className="description">{description}</p>
      <p className="price">{price}</p>
      <p className="category">{category}</p>
      <button className="add-to-cart">Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;
