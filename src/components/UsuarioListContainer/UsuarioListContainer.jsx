import React from "react";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { UsuarioList } from "../UsuarioList/UsuarioList";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const UsuarioListContainer = ({greeting}) =>{

    const {id}= useParams();

    const [listaUsuarios,setListaUsuarios]= useState([]);
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]= useState(null);
    const navigate= useNavigate()

    const ejecutarFetch = async() =>{

      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
      const rol=validateRol(response)
      if (!rol){
        if (isRolUser(getToken())){
         
            setMensaje("No posee los permisos necesarios")
        }else{
          deleteToken()
          navigate("/login")
        }
      }else{
      const data = await response.json()
      if (data.msj){
        setMensaje(data.msj)
      }else{
        setListaUsuarios(data)
      }
      }
    }
  
    const navigateTo=(url)=>{
      navigate(url)
    }
  
    useEffect(() => { 
      ejecutarFetch()
      .catch(error => console.error(error))
      .finally(()=>{
        setLoading(false)
      })
    },[])


    return (
        <>{!mensaje
          ?
          <>
          <h1 className="greeting">{greeting}</h1>
          <button class="button btnPrimary" onClick={()=>navigateTo(`/register`)}><span class="btnText">Register</span></button>
          {loading ? <p>Cargando...</p> : <UsuarioList pid={id} listaUsuarios={listaUsuarios}/>}
          <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>
          </>
          : <Mensaje msj={mensaje}/>
        }
        </>
    );
  } 
  
export default UsuarioListContainer;