import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el navbar está visible
  const [openDropdown, setOpenDropdown] = useState(null); // Controla qué dropdown está abierto
  const admin = useSelector((state) => state.usuarios.isAdmin);
  // Función para manejar la visibilidad del dropdown
  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <header>
      {/* Hamburger icon for toggle */}
      <div
        className="hamburger"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        &#9776;
      </div>

      {/* Sidebar navbar */}
      <nav
        className={`navbar ${isOpen ? "open" : "closed"}`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="navbar-logo">
          <Link to="/">San Lorenzo</Link>
        </div>
        <ul className="navbar-menu">
          {admin&&<li><Link to="/usuarios">Listado Usuarios</Link></li>}
          {!admin&&<li><Link to="/perfilUsuario">Perfil Usuario</Link></li>}
          <li><Link to="/deportes">Deportes</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          {!admin&&<li><Link to="/productos">Productos</Link></li>}
          {!admin&&<li><Link to="/agenda">Mi agenda</Link></li>}


          <li className="dropdown">
            <button className="dropdown-btn" onClick={() => handleDropdownClick('Propuesta')}>
            Propuestas  
            </button>
            <ul className={`dropdown-content ${openDropdown === 'Propuesta' ? 'show' : ''}`}>
              <li><Link to="/propuestas">Listado</Link></li>
              {!admin&&<li><Link to="/propuestas/add">Envía una propuesta</Link></li>}
            </ul>
          </li>

          <li className="dropdown">
            <button className="dropdown-btn" onClick={() => handleDropdownClick('Camapaña')}>
              Campañas  
            </button>
            <ul className={`dropdown-content ${openDropdown === 'Camapaña' ? 'show' : ''}`}>
              <li><Link to="/campañas">Listado</Link></li>
              {admin&&<li><Link to="/campañas/add">Lanzar campaña</Link></li>}
            </ul>
          </li>
     
          <li className="dropdown">
            <button className="dropdown-btn" onClick={() => handleDropdownClick('Feedback')}>
              Feedback  
            </button>
            <ul className={`dropdown-content ${openDropdown === 'Feedback' ? 'show' : ''}`}>
              <li><Link to="/foroFeedback">Listado</Link></li>
              {!admin&&<li><Link to="/feedback">Deja tu Comentario</Link></li>}
            </ul>
          </li>

          <li className="dropdown">
            {admin&&<button className="dropdown-btn" onClick={() => handleDropdownClick('superAdmin')}>
              Super Admin
            </button>}
            <ul className={`dropdown-content ${openDropdown === 'superAdmin' ? 'show' : ''}`}>
              <li><Link to="/superAdmin">Registrar Usuarios</Link></li>
            </ul>
          </li>
        </ul>

        <a href="/asociarse" className="navbar-button">Asociate</a>
        <a href="/contactos" className="feedback-button">Ayuda</a>
      </nav>
    </header>
  );
};

export default Navbar;
