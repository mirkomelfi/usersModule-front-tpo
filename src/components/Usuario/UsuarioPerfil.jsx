import "./Usuario.css";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";

const UsuarioPerfil =()=>{

    const [usuario,setUsuario]= useState([]);

    const [loading,setLoading]= useState(true);

    const [mensaje,setMensaje]=useState(null)

    const ejecutarFetch=async () =>{ 
    
        const response= await  fetch(`${process.env.REACT_APP_DOMINIO_BACK}/usuarios/miperfil`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
            
          })
        
        const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login",{state:{from:actualLocation}} )
            
        }else{
            const data = await response.json()
            setRol(isRolUser(getToken()))
            if(data.msj){
                setMensaje(data.msj)
            }else{
                setUsuario(data)
            }
        }
    }

    useEffect(() => { 
        ejecutarFetch()
        .catch(error => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
      },[])



    return(
        <>
            <h1>Mi perfil</h1>
            {!mensaje?(<div className="tarjetaProducto">
            <h1>DNI: {usuario.dni}</h1>
                <h2>Username: {usuario.username}</h2>
                <h2>Nombre: {usuario.nombre}</h2>
                <h2>Apellido: {usuario.apellido}</h2>
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUsuario`)}><span class="btnText">Modificar</span></button>
            </div>):(<Mensaje msj={mensaje} />)}
            <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>
        </>
    )
}

export {UsuarioPerfil}