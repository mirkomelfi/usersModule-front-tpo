import { useRef } from "react"
import { useState,useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Mensaje } from "../Mensaje/Mensaje"
import { Link } from "react-router-dom"
import { deleteToken, getToken, setToken } from "../../utils/auth-utils"
export const Login = () => {
    
    const[ loggeado,setLoggeado]=useState(false)
    const [mensaje,setMensaje]=useState(null)
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const datForm = useRef()

    const consultarLoggeo=async()=>{
        const token= getToken();

        if (token){
            setLoggeado(true);
        }

    }

    useEffect(() => { 
        consultarLoggeo()
    },[])



    const desloggear=async()=>{

        deleteToken()
        setLoggeado(false);

    }


    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
    
        const response =  await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        })

        const data=await response.json();
        
        if(!data.msj) {
            setLoggeado(true)
            navigate("/")
            setToken(data.token)
    
        } else {

            setMensaje(data.msj)
            setLoggeado(false)
            

        }

        e.target.reset() //Reset form
    }
    
    return (

        <div>
            {!mensaje?(
        <>
            <div id="divForm" className="container" >
                <h3>Formulario de Inicio de Sesion</h3>
                <form onSubmit={consultarForm} ref={datForm}>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                        <input type="username" className="form-control" name="username" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" />
                    </div>

                    {!loggeado&&<button type="submit"  class="button btnPrimary" ><span class="btnText">Iniciar Sesion</span></button>}
                </form>
                {loggeado&&<button onClick={()=>desloggear()}  class="button btnPrimary"><span class="btnText">Cerrar Sesion</span></button>}
                {loggeado&&
                <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver a Inicio</span></button>
                }
               
            </div>
        </>):
        <>
        <Mensaje msj={mensaje} />
        <button class="button btnPrimary"  onClick={()=>navigateTo(`/`)}><span class="btnText">Volver a Login</span></button> 
        </>
        }
        </div>
    )
}