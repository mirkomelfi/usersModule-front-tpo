import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { extractRol, getToken } from "../../utils/auth-utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el navbar está visible
  const [openDropdown, setOpenDropdown] = useState(null); // Controla qué dropdown está abierto
  const admin = useSelector((state) => state.usuarios.isAdmin);
  const isUser = useSelector((state) => state.usuarios.dni);
  const userLogged = useSelector((state) => state.usuarios.logged);
  const [rol,setRol]=useState(null)
  console.log(userLogged)
  // Función para manejar la visibilidad del dropdown
  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
   
    console.log(userLogged)
    if (userLogged){
      setRol(extractRol(getToken()))
    }
  }, [userLogged]);

  useEffect(() => {
    if (userLogged){
      setRol(extractRol(getToken()))
    }
    console.log(userLogged)
  }, []);

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
        {isUser?<ul className="navbar-menu">
          {<li><Link to="/logout">Logout</Link></li>}
          {admin&&<li><Link to="/usuarios">Listado Usuarios</Link></li>}
          {!admin&&<li><Link to="/perfilUsuario">Perfil Usuario</Link></li>}
          <li><Link to="/deportes">Deportes</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          
          {!admin&&isUser&&<li><Link to="/pedidos">Mis Pedidos</Link></li>}
          {!admin&&<li><Link to="/productos">Productos</Link></li>}
          {!admin&&rol!="Cliente"&&rol!="Activo"&&<li><Link to="/agenda">Mi agenda</Link></li>}


          <li className="dropdown">
           {rol!="Cliente"&& <button className="dropdown-btn" onClick={() => handleDropdownClick('Propuesta')}>
            Propuestas  
            </button>}
            <ul className={`dropdown-content ${openDropdown === 'Propuesta' ? 'show' : ''}`}>
              <li><Link to="/propuestas">Listado</Link></li>
              {!admin&&<li><Link to="/propuestas/add">Envía una propuesta</Link></li>}
            </ul>
          </li>

          <li className="dropdown">
          {rol!="Cliente"&&<button className="dropdown-btn" onClick={() => handleDropdownClick('Camapaña')}>
              Campañas  
            </button>}
            <ul className={`dropdown-content ${openDropdown === 'Camapaña' ? 'show' : ''}`}>
              <li><Link to="/campañas">Listado</Link></li>
              {admin&&<li><Link to="/campañas/add">Lanzar campaña</Link></li>}
            </ul>
          </li>

          {(rol=="Inversor"||rol=="Directivo")&&<li className="dropdown">
            <button className="dropdown-btn" onClick={() => handleDropdownClick('Finanzas')}>
            Finanzas 
            </button>
            <ul className={`dropdown-content ${openDropdown === 'Finanzas' ? 'show' : ''}`}>
              <li><Link to="/misInversiones">Mis Inversiones</Link></li>
            </ul>
           {rol=="Directivo"&&<ul className={`dropdown-content ${openDropdown === 'Finanzas' ? 'show' : ''}`}>
              <li><Link to="/balance">Balance del Club</Link></li>
            </ul>
            }
            <ul className={`dropdown-content ${openDropdown === 'Finanzas' ? 'show' : ''}`}>
              <li><Link to="/inversiones">Invertir</Link></li>
            </ul>
          </li>}
          
          <li className="dropdown">
            <button className="dropdown-btn" onClick={() => handleDropdownClick('Reclamos')}>
            Reclamos 
            </button>
            <ul className={`dropdown-content ${openDropdown === 'Reclamos' ? 'show' : ''}`}>
              {admin&&<li><Link to="/reclamos">Listado</Link></li>}
              {!admin&&<li><Link to="/reclamos">Mis Reclamos</Link></li>}
              {<li><Link to="/reclamos/add">Crear Reclamo</Link></li>}
            </ul>
          </li>
      
     
          <li className="dropdown">
            <button className="dropdown-btn" onClick={() => handleDropdownClick('Feedback')}>
              Feedback  
            </button>
            <ul className={`dropdown-content ${openDropdown === 'Feedback' ? 'show' : ''}`}>
              <li><Link to="/foroFeedback">Listado</Link></li>
              {!admin&&<li><Link to="/feedback">Deja tu Comentario</Link></li>}
              {admin&&<li><Link to="/feedback">Agregar rubro</Link></li>}
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
          <li><Link to="/autoridades">Autoridades</Link></li>
          <li><Link to="/historia">Historia</Link></li>
        </ul>
        
      :


// Not user
        <ul className="navbar-menu">
          <li><Link to="/deportes">Deportes</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/autoridades">Autoridades</Link></li>
          <li><Link to="/historia">Historia</Link></li>


{          /*<li className="dropdown">
            <button className="dropdown-btn" onClick={() => handleDropdownClick('Reclamos')}>
            Reclamos 
            </button>
            <ul className={`dropdown-content ${openDropdown === 'Reclamos' ? 'show' : ''}`}>
              {admin&&<li><Link to="/reclamos">Listado</Link></li>}
              {!admin&&<li><Link to="/reclamos">Mis Reclamos</Link></li>}
              {<li><Link to="/reclamosPost">Crear Reclamo</Link></li>}
            </ul>
          </li>
*/}
          </ul>
          //<li><Link to="/login">Login</Link></li>
          //<li><Link to="/register">Registrarse</Link></li>
        

        

      }
        {userLogged&&
          <div className="navbar-bottom-links">
        {rol=="Cliente"&&<a href="/asociarse" className="navbar-button">Asociate</a>}
        {(rol=="Activo"||rol=="Patrimonial")&&<a href="/asociarse" className="navbar-button">Cambia de Plan</a>}
        <a href="/contactos" className="ayuda-button">Ayuda</a>
        </div>
        }
         {!userLogged&&
          <div className="navbar-bottom-links">
          <a href="/contactos" className="ayuda-button">Ayuda</a>
          <Link to="/register" className="create-account">Registrate</Link>
          <Link to="/login" className="login-link">¿Tenés una cuenta? Inicia sesión</Link>
        </div>
        }
      </nav>
    </header>
  );
};

export default Navbar;
