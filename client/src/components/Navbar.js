import React from 'react';
import { Link } from "react-router-dom";
import { IconSearch, IconUser, IconShoppingCart } from '@tabler/icons-react';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <header className="navbar">
            {/* Columna izquierda */}
            <div className="navbar-left">
                <img src="/logo.png" alt="Mystic Moon Logo" className="logo-img" />
                <h1 className="brand-title">MYSTIC MOON <br/><strong>MAKEUP</strong></h1>
            </div>

            {/* Columna derecha */}
            <div className="navbar-right">
                {/* Fila superior: íconos */}
                <div className="icons-row">
                    <IconSearch className="icon" />
                    <IconUser className="icon" />
                    <IconShoppingCart className="icon" />
                </div>

                {/* Fila inferior: link de sesión */}
                <div className="login-row">
                    <Link to="/login" className="login-link">Iniciar sesión o registrarse</Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
