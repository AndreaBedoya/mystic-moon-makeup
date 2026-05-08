import React from 'react';
import { Link } from "react-router-dom";
import { IconSearch, IconShoppingCart } from '@tabler/icons-react';
import '../styles/Navbar.css';

function Navbar({ onCartClick }) {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <img src="/logo.png" alt="Mystic Moon Logo" className="logo-img" />
                <h1 className="brand-title">MYSTIC MOON <br/><strong>MAKEUP</strong></h1>
            </div>

            <div className="navbar-right">
                <div className="icons-row">
                    <IconSearch className="icon" />
                    {/* ✅ Al hacer clic abre el carrito */}
                    <IconShoppingCart className="icon" onClick={onCartClick} style={{cursor: "pointer"}} />
                </div>

                <div className="login-row">
                    <Link to="/login" className="login-link">Iniciar sesión o registrarse</Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
