import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconTruckDelivery,
  IconDiscount2,
  IconRosetteDiscountCheck,
  IconHeadset,
  IconBrandPinterest,
  IconBrandFacebook,
  IconBrandTiktok,
  IconBrandInstagram,
} from "@tabler/icons-react";

import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const products = [
    {
      title: "Paleta de Sombras Lunar",
      price: "$24.350",
      image: "/prod-1.png",
    },
    { title: "Labial Eternal", price: "$16.900", image: "/prod-2.png" },
    { title: "Iluminador Moonlight", price: "$18.500", image: "/prod-3.png" },
    { title: "Set de Brochas", price: "$32.000", image: "/prod-4.png" },
  ];

  return (
    <div className="landing-container">
      {/* ------------------------------------------- */}
      {/* Header */}
      {/* ------------------------------------------- */}
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
          <span className="cta-icon">🛒</span>
          Comprar ahora →
        </button>
      </header>

      {/* ------------------------------------------- */}
      {/* Hero */}
      {/* ------------------------------------------- */}
      <section id="inicio" className="landing-hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              Maquillaje que{" "}
              <span className="hero-highlight">
                realza <br />{" "}
              </span>{" "}
              tu magia
            </h1>
            <p>
              En Mystic Moon creemos que el maquillaje no solo embellece:
              también te conecta con tu esencia más auténtica. Descubre
              productos diseñados para resaltar tu luz interior.
            </p>

            <button
              className="hero-primary-btn"
              onClick={() => navigate("/home")}
            >
              <span className="cta-icon">🛍️</span>
              Comprar ahora →
            </button>
          </div>

          {/* Imagen hero decorativa (si no la tienes, dejamos espacio) */}
          <div className="hero-visual" aria-hidden="true">
            <img src="../images/hero img.png" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* Nosotros (card grande) */}
      {/* ------------------------------------------- */}
      <section id="nosotros" className="landing-about-wrap">
        <div className="landing-about-card">
          <div className="about-left">
            <img src="../images/about.png" />
          </div>

          <div className="about-right">
            <div className="kicker">QUIÉNES SOMOS</div>
            <h2>
              Un sueño hecho <br /> realidad <span></span>
            </h2>
            <p>
              Mystic Moon nació de una pasión: la magia de la belleza y el poder
              de sentirte tú misma. Somos más que una tienda de maquillaje,
              somos una comunidad que cree en la autenticidad, la creatividad y
              el poder de brillar.
            </p>

            <button className="about-btn" onClick={() => navigate("/home")}>
              Conoce más sobre nosotros →
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* Productos */}
      {/* ------------------------------------------- */}
      <section id="productos" className="landing-products-wrap">
        <div className="title-products-row">
          <h2 className="title-products">Lo mejor para tu magia </h2>
          <button className="btn-products" onClick={() => navigate("/home")}>
            {" "}
            Ver todos los productos{" "}
          </button>
        </div>

        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} className="product-card">
              <div className="product-image">
                {/* Placeholder por si no tienes aún imágenes */}
                <img
                  src={p.image}
                  alt={p.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="product-meta">
                <div className="product-name">{p.title}</div>
                <div className="product-price">{p.price}</div>
                <div className="stars">★★★★★</div>
              </div>

              <button className="product-fav" title="Agregar a favoritos">
                ♡
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* Promociones / beneficios (card con 4 ítems) */}
      {/* ------------------------------------------- */}
      <section className="landing-benefits-wrap">
        <div className="benefits-card">
          <div className="benefits-left">
            <div className="kicker">PROMOCIONES Y BENEFICIOS</div>
            <h2>Más razones para brillar </h2>
            <p>
              En Mystic Moon siempre pensamos en ti. Por eso, queremos que
              disfrutes de nuestras promociones especiales y más beneficios.
            </p>

            <button className="about-btn" onClick={() => navigate("/home")}>
              Ver promociones →
            </button>
          </div>

          <div className="benefits-right">
            <div className="benefit-item">
              <div className="benefit-icon">
                <IconTruckDelivery />
              </div>
              <div className="benefit-title">Envíos a todo el país</div>
              <div className="benefit-desc">
                Recibe tu pedido rápido en la puerta de tu casa.
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <IconDiscount2 />
              </div>
              <div className="benefit-title">Descuentos especiales</div>
              <div className="benefit-desc">
                Aprovecha nuestras promociones exclusivas.
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <IconRosetteDiscountCheck />
              </div>
              <div className="benefit-title">Productos originales</div>
              <div className="benefit-desc">
                Calidad y confianza en cada compra.
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <IconHeadset />
              </div>
              <div className="benefit-title">Atención personalizada</div>
              <div className="benefit-desc">
                Estamos aquí para ayudarte siempre.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* Reseñas */}
      {/* ------------------------------------------- */}
      <section id="reseñas" className="landing-reviews-wrap">
        <div className="title-reviews-row">
          <h2 className="title-reviews">Lo que dicen de nosotras </h2>
          <button className="btn-reviews" onClick={() => navigate("/home")}>
            Ver más reseñas →
          </button>
        </div>

        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-author">
              <img
                src="/review-1.png"
                alt="Valentina"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <p>
              “La calidad de los productos es increíble, me encanta todo. El
              empaque es hermoso y se nota el amor en cada detalle.”
            </p>
            <div className="autor">Valentina R.</div>
          </div>

          <div className="review-card">
            <div className="review-author">
              <img
                src="/review-2.png"
                alt="Camila"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <p>
              “Desde que descubrí Mystic Moon, mi rutina de maquillaje es otra.
              Los tonos son perfectos y duran todo el día.”
            </p>
            <div>Camila T.</div>
          </div>

          <div className="review-card">
            <div className="review-author">
              <img
                src="/review-3.png"
                alt="Daniela"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <p>
              “Es mi tienda favorita, siempre encuentro productos únicos y el
              servicio es excelente. 100% recomendada.”
            </p>
            <div>Daniela M.</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* Footer */}
      {/* ------------------------------------------- */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logol.png" alt="Mystic Moon" className="footer-logo" />
            <img src="/Logoletras.png" alt="Letras" className="footer-nombre" />
          </div>
          <div>
            <div className="footer-brand-title">Tu belleza, tu magia</div>
            <div className="footer-brand-sub">
              Haz parte de nuestra comunidad y descubre todo lo que Mystic Moon
              tiene para ti.
            </div>
          </div>

          <button className="footer-cta" onClick={() => navigate("/home")}>
            🛒 Comprar ahora →
          </button>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#inicio">Inicio</a>
            <a href="#productos">Productos</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#reseñas">Reseñas</a>
          </div>
          <div className="row-link">
            <div className="author-mystic">
              <div>
                © 2026 Mystic Moon Makeup. Todos los derechos reservados.
              </div>
            </div>

            <img src="/images/Decoracion luna.png" alt="Mystic Moon" className="footer-decoracion" />

            <div className="social-links">
              <a
                href="https://pin.it/2sCgba90x"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <IconBrandPinterest />
              </a>

              <a
                href="https://www.facebook.com/share/1auxuXybct/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <IconBrandFacebook />
              </a>

              <a
                href="https://www.tiktok.com/@mysticmoonmakeup?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <IconBrandTiktok />
              </a>

              <a
                href="https://www.instagram.com/mysticmoonmakeup?rpxt=MWFtd3hteTZ5ZzFpcw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <IconBrandInstagram />
              </a>
            </div>
          </div>  
        </div>
        
      </footer>
    </div>
  );
};

export default LandingPage;
