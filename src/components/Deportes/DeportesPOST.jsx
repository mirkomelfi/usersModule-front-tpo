import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useBlocker, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { validateRol,isRolUser,deleteToken,getToken } from "../../utils/auth-utils";
import ImagenPost from "../Imagen/ImagenPOST"

export const DeportesPost = () => {

    const [mensaje,setMensaje]=useState(null)
    const [error,setError]=useState(null)
    const [idDeporte,setIdDeporte]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const deporte = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (deporte.nombre==""){deporte.nombre=null;}
        if (deporte.descripcion==""){deporte.descripcion=null;}
        if (deporte.valor==""){deporte.valor=null;}
        if (deporte.profesor==""){deporte.profesor=null;}
        
        //Hay que ver como cargar los dias List<String> dias;

        if (!deporte.titulo&&!deporte.descripcion){ setMensaje("No se ingresaron valores")}
        else{
            var url=``;

            console.log(deporte)
 
            url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/actividades`

            console.log(url)

            const response= await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(deporte)
            })
            
            if (response.status==200){
                const data = await response.json()
                console.log(data)
                setIdDeporte(data.id)
                setMensaje(data.msj+" Puede agregar imagenes si lo desea")
            }else{
                
                const data = await response.json()
                console.log(data)
                setError(true)
                setMensaje(data.msj)
            }

            
                
            e.target.reset() //Reset form
                
            }
        }

    return (

        <div>
            {!mensaje?(
                
                <div id="divForm" className="container" >
                    <h2>Creación de Deporte</h2>
                    <h3>Rellene todos los campos</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="nombre" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <input type="text" className="form-control" name="descripcion" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="valor" className="form-label">Valor mensual</label>
                            <input type="text" className="form-control" name="valor" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profesor" className="form-label">Profesor a cargo</label>
                            <input type="text" className="form-control" name="profesor" />
                        </div>

                        <button type="submit" className="button btnPrimary">Crear</button>
                        </form>

                    </div>
                ):   
                
               (!error? <div>  
                <Mensaje msj={mensaje} />
                <ImagenPost actividad={true} id={idDeporte} />
               
                </div>
                :
                <Mensaje msj={mensaje} />
              )
                    
        }
       
        </div>
        
    )
}