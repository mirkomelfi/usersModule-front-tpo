import React from "react";
import {Link} from "react-router-dom";

const Navbar = () =>{
    return (
        <header>
            <Link to="/logout">Logout</Link>
            <Link to="/"><h1>Sistema de Reclamos</h1></Link>
            <Link to="/login">Login</Link> 
        </header>
    );
  }
  
  export default Navbar;
  