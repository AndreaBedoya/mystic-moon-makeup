import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Encabezado con navegación */}
      <header className="landing-header">
        <div className="logo">
            <img src="/logol.png" alt="Mystic Moon Logo" className="logo-img" />
            <img src="/Logoletras.png" alt="Letras" className="nombre-img" />
        </div>
        <nav className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#reseñas">Reseñas</a>
        </nav>
        <button className="cta-button" onClick={() => navigate("/home")}>
          Comprar ahora
        </button>
      </header>

      {/* Hero principal */}
      <section id="inicio" className="landing-hero">
        <h1>Maquillaje que realza tu magia</h1>
        <p>
          En Mystic Moon creemos que el maquillaje no solo embellece, también te
          conecta con tu esencia más auténtica. Descubre productos diseñados
          para resaltar tu luz interior.
        </p>
        <button className="cta-button" onClick={() => navigate("/home")}>
          Ir a comprar
        </button>
      </section>

      {/* Quiénes somos */}
      <section id="nosotros" className="landing-about section-white">
        <h2>Un sueño hecho realidad</h2>
        <p>
          Mystic Moon nació de una pasión: la magia de la belleza y el poder de
          sentirte tú misma. Somos más que una tienda de maquillaje, somos una
          comunidad que cree en la autenticidad, la creatividad y el poder de
          brillar.
        </p>
      </section>

      {/* Productos */}
      <section id="productos" className="landing-products section-white">
        <h2>Lo mejor para tu magia</h2>
        <div className="products-grid">
          <div className="product-card">Paleta de Sombras Lunar – $24.350</div>
          <div className="product-card">Labial Eternal – $16.900</div>
          <div className="product-card">Iluminador Moonlight – $18.500</div>
          <div className="product-card">Set de Brochas – $32.000</div>
        </div>
      </section>

      {/* Promociones */}
      <section className="landing-promos section-white">
        <h2>Más razones para brillar</h2>
        <ul>
          <li>✨ Envíos a todo el país</li>
          <li>💜 Descuentos especiales</li>
          <li>🌙 Productos originales</li>
          <li>🤝 Atención personalizada</li>
        </ul>
      </section>

      {/* Reseñas */}
      <section id="reseñas" className="landing-reviews section-white">
        <h2>Lo que dicen de nosotras</h2>
        <div className="review-card">
          <p>
            Valentina R. – “La calidad de los productos es increíble. Me encanta
            todo.”
          </p>
        </div>
        <div className="review-card">
          <p>
            Camila T. – “Desde que descubrí Mystic Moon, mi rutina de maquillaje
            es otra.”
          </p>
        </div>
        <div className="review-card">
          <p>
            Daniela M. – “Es mi tienda favorita, siempre encuentro productos
            únicos.”
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 Mystic Moon Makeup · Bogotá, Colombia</p>
        <p>
          <a href="#">Política de privacidad</a> ·{" "}
          <a href="#">Términos y condiciones</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
