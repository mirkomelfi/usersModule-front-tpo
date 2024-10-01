import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useBlocker, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { validateRol,isRolUser,deleteToken,getToken } from "../../utils/auth-utils";
import ImagenPost from "../Imagen/ImagenPOST"

import './Post.css'; 

export const ProductoPost = () => {

    const [mensaje,setMensaje]=useState(null)
    const [idNoticia,setIdNoticia]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const noticia = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (noticia.titulo==""){noticia.titulo=null;}
        if (noticia.descripcion==""){noticia.descripcion=null;}
        
        if (!noticia.titulo&&!noticia.descripcion){ setMensaje("No se ingresaron valores")}
        else{
            var url=``;

            console.log(noticia)
 
            url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/noticias`

            console.log(url)

            const response= await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(noticia)
            })
            if (response.status==200){
                const data = await response.json()
                setIdNoticia(data.id)
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
                <h2 className="post-title">Crear nuevo producto</h2> {/* Reutilizando clase de título */}
                <form onSubmit={consultarForm} ref={datForm} className="post-form">
                    <input
                        type="text"
                        className="post-input"
                        placeholder="Nombre"
                        name="nombre"
                    />
                    <input
                        type="number"
                        className="post-input"
                        placeholder="Precio"
                        name="precio"
                    />
                    <button type="submit" className="post-button">Crear Producto</button>
                </form>
            </div>
                ):   
                <div>  
                <Mensaje msj={mensaje} />
                <ImagenPost noticia={true} id={idNoticia} />
               
                </div>  
                    
        }
       
        </div>
        
    )
}