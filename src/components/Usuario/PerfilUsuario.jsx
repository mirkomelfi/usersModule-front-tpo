import React from 'react';
import './PerfilUsuario.css';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, isTokenExpired } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { validateRol, isRolUser, deleteToken } from "../../utils/auth-utils";
import avatar from './Messi.jpeg'; // Imagen de ejemplo para el avatar
import { useSelector } from 'react-redux';

export const PerfilUsuario = () => {

  var dniLogged = useSelector((state) => state.usuarios.dni);
  var admin = useSelector((state) => state.usuarios.isAdmin);
  console.log("dniLogged",dniLogged)
  console.log("adm",admin)

  var { dni } = useParams();


  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [rol, setRol] = useState(undefined);

  const navigate = useNavigate();

  const ejecutarFetch = async () => {

    if (!admin){
      dni= dniLogged
    }
    var url = ``;

    url = `${process.env.REACT_APP_DOMINIO_BACK}/usuarios/${dni}`;
 

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.status==403){
      if (isTokenExpired(getToken())) {
        alert("Venció su sesión. Vuelva a logguearse")
        navigate("/logout")
      }
    }
    const data = await response.json();

    if (data.msj) {
      setMensaje(data.msj);
    } else {
      console.log("data: ", data)
      setUsuario(data);
      setLoading(null)
    }

  };

  const eliminar = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
      }
    );
    if (response.status==403){
      if (isTokenExpired(getToken())) {
        alert("Venció su sesión. Vuelva a logguearse")
        navigate("/logout")
      }
    }
    const data = await response.json();
  
      if (data.msj) {
        setMensaje(data.msj);
      }
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
        {usuario.dni&&<p><strong>Documento: </strong>{usuario.dni}</p>}
        <p><strong>Email:</strong> usuario@clubdefutbol.com</p>
        {usuario.telefono!=0?<p><strong>Teléfono: </strong>{usuario.telefono}</p>:<p><strong>Teléfono: </strong>No asociado</p>}
        <p><strong>Fecha de Membresía:</strong> 01/01/2022</p>
        {usuario.direccion&&<p><strong>Dirección: </strong>{usuario.direccion.calle} {usuario.direccion.numero}</p>}
        {usuario.direccion&&<p><strong>Ciudad: </strong>{usuario.direccion.ciudad} - <strong>CP: </strong> {usuario.direccion.codPostal}</p>}
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
