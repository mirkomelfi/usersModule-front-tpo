import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import '../Global.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del navbar

  return (
    <header>
      {/* Hamburger icon to toggle the sidebar */}
      <div className="hamburger" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        &#9776;
      </div>

      {/* Sidebar navbar */}
      <nav className={`navbar ${isOpen ? "open" : "closed"}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <div className="navbar-logo">
          <Link to="/">
            San Lorenzo
          </Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/contactos">Contactos</Link></li>
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