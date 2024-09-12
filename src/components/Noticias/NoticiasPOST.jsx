import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useBlocker, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { validateRol,isRolUser,deleteToken,getToken } from "../../utils/auth-utils";
import ImagenPost from "../Imagen/ImagenPOST"

export const NoticiasPost = () => {

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
                    //"Authorization": `Bearer ${getToken()}`
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

        <div>
            {!mensaje?(
                
                <div id="divForm" className="container" >
                    <h2>Creación de Noticia</h2>
                    <h3>Rellene todos los campos</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="titulo" className="form-label">Título</label>
                            <input type="text" className="form-control" name="titulo" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <input type="text" className="form-control" name="descripcion" />
                        </div>

                        <button type="submit" className="button btnPrimary">Crear</button>
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