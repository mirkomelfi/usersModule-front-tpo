import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Asegúrate de tener el archivo CSS

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            San Lorenzo
          </Link>
        </div>
        <ul className="navbar-menu">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
            <li><Link to="/olvidoContraseña">Olvido Contraseña</Link></li>
            <li><Link to="/superAdmin">Super Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
