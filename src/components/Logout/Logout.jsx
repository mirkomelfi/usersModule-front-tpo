import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Mensaje } from "../Mensaje/Mensaje"
import { Link } from "react-router-dom"
import { deleteToken, getToken, setToken } from "../../utils/auth-utils"
import { useDispatch } from "react-redux"
import { loginUsuario } from "../../store/actions/usuario.action"
export const Logout = () => {
    

    const [mensaje,setMensaje]=useState("No se encuentra loggeado")
    const navigate= useNavigate()

    const dispatch=useDispatch()

    const desloggear=async()=>{
        const token= getToken()
        if (token!=null){
            deleteToken()
            setMensaje("Sesion cerrada con exito")
        }
    }

    const navigateTo=(url)=>{
        navigate(url)
      }

    useEffect(() => { 
        dispatch((loginUsuario(null,null)))
        desloggear()
    },[])
    
    return (

        <div className="tarjetaListado">
            <Mensaje msj={mensaje} />
            <button class="button btnPrimary" onClick={()=>navigateTo(`/login`)}><span class="btnText">Inicio de Sesion</span></button>
        
        </div>
    )
}    