import React from 'react';
import './PerfilUsuario.css';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { validateRol, isRolUser, deleteToken } from "../../utils/auth-utils";
import avatar from './Messi.jpeg'; // Imagen de ejemplo para el avatar

export const PerfilUsuario = () => {

  //var { dni } = useParams();
  var dni=111
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [rol, setRol] = useState(undefined);

  const navigate = useNavigate();

  const ejecutarFetch = async () => {
    var url = ``;
    if (dni) {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`;
    } else {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/miPerfil`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    if (data.msj) {
      setMensaje(data.msj);
    } else {
      setUsuario(data);
      setLoading(null)
      console.log(data)
    }

    /*const rol = validateRol(response);
    if (!rol) {
      deleteToken();
      navigate("/login");
    } else {
      const data = await response.json();
      setRol(isRolUser(getToken()));
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setUsuario(data);
      }
    }
      */
  };

  const eliminar = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
         // Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
   /* const rol = validateRol(response);
    if (!rol) {
      if (isRolUser(getToken())) {
        setMensaje("No posee los permisos necesarios");
      } else {
        deleteToken();
        navigate("/login");
      }
    } else {
      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    }*/
    return;
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch()
    .catch((error) => console.error(error));
  }, []);


  return (
    <div className="perfil-container">
    {
    !loading?(
    !mensaje ? (
    <div>
      <div className="perfil-header">
        <img src={avatar} alt="Avatar del usuario" className="perfil-avatar" />
        <h2 className="perfil-nombre">{usuario.nombre} {usuario.apellido}</h2>
        <p className="perfil-rol">Rol: {usuario.rol}</p>
        <p className="perfil-membresia">Membresía: Activa</p>
      </div>

      <div className="perfil-info">
        <h3>Detalles del Usuario</h3>
        <p><strong>Email:</strong> usuario@clubdefutbol.com</p>
        <p><strong>Teléfono:</strong>{usuario.telefono}</p>
        <p><strong>Fecha de Membresía:</strong> 01/01/2022</p>
      </div>

      <div className="perfil-acciones">
        <button className="perfil-btn" onClick={() => navigateTo(`/updateUsuario/${dni}`)}>Editar Perfil</button>
        <button className="perfil-btn perfil-btn-danger"  onClick={() => eliminar()}>Eliminar Cuenta</button>
      </div>
    </div>
      ): 
      (
        <Mensaje msj={mensaje} />
      ))
      :<p>Cargando...</p>
      }
      
       </div>

  );
}
