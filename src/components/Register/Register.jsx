import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { validateRol,isRolUser,deleteToken,getToken } from "../../utils/auth-utils";

export const Register = () => {

    const [mensaje,setMensaje]=useState(null)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        if (!cliente.username||!cliente.password){

            setMensaje("faltan datos")
        }
       
        else{

            const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(cliente)
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
                
                
            e.target.reset() //Reset form
        }
    }
    return (
        <div>
            {!mensaje?(
        <>
        <div id="divForm" className="container" >
            <h3>Formulario de registro</h3>
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="apellido" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input type="text" className="form-control" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="number" className="form-control" name="dni" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="button btnPrimary">Registrar</button>
                </form>

            </div>
        </>):<><Mensaje msj={mensaje} />
        </>
        }
        <button class="button btnPrimary" onClick={()=>navigateTo(`/usuarios`)}><span class="btnText">Volver</span></button>
        </div>
    )
}