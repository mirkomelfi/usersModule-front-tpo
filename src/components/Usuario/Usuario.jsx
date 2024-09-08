
import {Link, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import imgUsuario from '../../img/user.png'
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const Usuario =({fromPerfil})=>{
    const {dni}= useParams();

    const [usuario,setUsuario]= useState([]);

    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    
    const [rol,setRol]=useState(undefined);

    const navigate=useNavigate()

    const ejecutarFetch=async () =>{ 
    
        var url=``;
        if (dni){
            url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`
        }else{
            url=`${process.env.REACT_APP_DOMINIO_BACK}/miPerfil`
        }

        const response= await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
        
      })
        
        const rol=validateRol(response)
        if (!rol){
            deleteToken()
            navigate("/login" )
            
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


    const eliminar=async()=>{
        
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`, {
            method: "DELETE",
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
            }
        }
        return;
        
    }

    const navigateTo=(url)=>{
        navigate(url)
      }

    useEffect(() => { 
        ejecutarFetch()
        .catch(error => console.error(error))
        .finally(()=>{
        })
    },[])

    return(
        <>
            {!mensaje?
            (<div className="tarjetaProducto">
                  <div className="imgContenedor"  > <img className = "imagenesCard" src={imgUsuario} alt="imgUsuario" /></div>
                <div>
                <h1 id ="tituloGrande">DNI: {usuario.dni}</h1>
                <h2>Username: {usuario.username}</h2>
                <h2>Nombre: {usuario.nombre}</h2>
                <h2>Apellido: {usuario.apellido}</h2>
                </div>
                <div class="button-view" >
                {dni?
                 <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUsuario/${dni}`)}><span class="btnText">Modificar</span></button>
                :
                <button class="button btnPrimary" onClick={()=>navigateTo(`/updateUsuario`)}><span class="btnText">Modificar</span></button>
                }
                {dni&&<button class="button btnPrimary" onClick={()=>eliminar()}><span class="btnText">Eliminar</span></button>}
                </div>
            </div>):(<Mensaje msj={mensaje} />)}
            {dni?
             <button class="button btnPrimary" onClick={()=>navigateTo(`/usuarios`)}><span class="btnText">Volver</span></button>
            
            :
            <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>
          
            }
        </>
    )
}

export {Usuario}