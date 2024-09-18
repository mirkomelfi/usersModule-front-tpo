import { useRef } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { validateRol,isRolUser,deleteToken,getToken } from "../../utils/auth-utils";

export const UsuarioPut = ({fromPerfil}) => {

    const {dni}= useParams();

    const [mensaje,setMensaje]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form
    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (cliente.nombre==""){cliente.nombre=null;}
        if (cliente.apellido==""){cliente.apellido=null;}
        if (cliente.username==""){cliente.username=null;}
        if (cliente.password==""){cliente.password=null;}
        if (!cliente.nombre&&!cliente.apellido&&!cliente.username&&!cliente.password){ setMensaje("No se ingresaron valores para actualizar")}
        else{
            var url=``;
            if (dni){
                url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`
            }else{
                url=`${process.env.REACT_APP_DOMINIO_BACK}/cambiarPerfil`
            }
            const response= await fetch(url, {
                method: "PUT",
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
            if (fromPerfil&&isRolUser(getToken())){
                if (cliente.username!=null){

                    alert("Se modificó el username. Debe volver a iniciar sesion")
                    deleteToken()
                    navigate("/login")
                }}
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
                
                <div id="divForm" className="container" >
                    <h2>Cambio en los datos del Usuario</h2>
                    <h3>Ingrese solo los campos que desea modificar</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="nombre" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" name="apellido" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" name="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" />
                        </div>

                        <button type="submit" className="button btnPrimary">Actualizar</button>
                        </form>

                    </div>
                ):    <Mensaje msj={mensaje} />
                    
        }
        {dni?
        <button class="button btnPrimary" onClick={()=>navigateTo(`/usuarios/${dni}`)}><span class="btnText">Volver</span></button>
        
        :
        <button class="button btnPrimary" onClick={()=>navigateTo(`/`)}><span class="btnText">Volver</span></button>
       
        }
        </div>
        
    )
}