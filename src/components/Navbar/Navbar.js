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
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
          <li className="dropdown">
              <Link to="/olvidoContraseña">Olvido Contraseña</Link>
              <ul className="dropdown-content">
                <li><Link to="/otro">Otro</Link></li>
                <li><Link to="/otro2">Otro 2</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/superAdmin">Super Admin</Link>
            <ul className="dropdown-content">
              <li><Link to="/otro">Otro</Link></li>
              <li><Link to="/otro2">Otro 2</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
