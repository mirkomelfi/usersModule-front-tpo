import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useBlocker, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { validateRol,isRolUser,deleteToken,getToken } from "../../utils/auth-utils";
import ImagenPost from "../Imagen/ImagenPOST"

export const PropuestasPost = () => {

    const dni=111;// obtener del usr loggeado

    const [mensaje,setMensaje]=useState(null)
    const [idPropuesta,setIdPropuesta]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const propuesta = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (propuesta.titulo==""){propuesta.titulo=null;}
        if (propuesta.descripcion==""){propuesta.descripcion=null;}
        
        if (!propuesta.titulo&&!propuesta.descripcion){ setMensaje("No se ingresaron valores")}
        else{
            var url=``;

            console.log(propuesta)
 
            url=`${process.env.REACT_APP_DOMINIO_BACK}/propuestas/${dni}`

            console.log(url)

            const response= await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(propuesta)
            })
            if (response.status==200){
                const data = await response.json()
                setIdPropuesta(data.id)
                setMensaje(data.msj+" Puede agregar imagenes si lo desea")
            }else{
                
                const data = await response.json()
                setMensaje(data.msj)
            }

            
                
            e.target.reset() //Reset form
                
            }
        }

    return (

        <div className="post-container"> 
            {!mensaje?(
                
                <div className="post-card"> {/* Reutilizando clase de tarjeta */}
                <h2 className="post-title">Crear nueva propuesta</h2> {/* Reutilizando clase de título */}
                <form onSubmit={consultarForm} ref={datForm} className="post-form">
                    <input
                        type="text"
                        className="post-input"
                        placeholder="Titulo"
                        name="titulo"
                    />
                    <input
                        type="text"
                        className="post-input"
                        placeholder="Descripcion"
                        name="descripcion"
                    />
                    <button type="submit" className="post-button">Crear Propuesta</button>
                </form>
            </div>
                ):   
                <div>  
                <Mensaje msj={mensaje} />
                <ImagenPost propuesta={true} id={idPropuesta} />
               
                </div>  
                    
        }
       
        </div>
        
    )
}