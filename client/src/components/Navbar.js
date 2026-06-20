import React from 'react';
import { Link } from "react-router-dom";
import { IconSearch, IconShoppingCart, IconLogin2 } from '@tabler/icons-react';
import '../styles/Navbar.css';

function Navbar({ onCartClick }) {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <img src="/logol.png" alt="Mystic Moon Logo" className="logo-img" />
                <img src="/mystic moon.png" alt="Mystic Moon Logo" className="nombre-img" />
            </div>

            <div className="navbar-right">
                <div className="icons-row">
                    <IconSearch className="icon" />
                    
                    {/* Al hacer clic abre el carrito */}
                    <IconShoppingCart 
                        className="icon" 
                        onClick={onCartClick} 
                        style={{cursor: "pointer"}} 
                    />

                    {/* Al hacer clic lleva al login */}
                    <Link to="/login">
                        <IconLogin2 className="icon" style={{cursor: "pointer"}} />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
