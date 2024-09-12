
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,deleteToken } from "../../utils/auth-utils";

const ImagenOK =({id})=>{
    //const {id}= useParams();
    const [loading,setLoading]= useState(true);
    const [mensaje,setMensaje]=useState(null)
    const [bytes,setBytes]=useState(null)
    let [num,setNum]=useState(1)
    const [rol,setRol]=useState(undefined);    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }


  const eliminarImg=async()=>{
    
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/reclamos/${id}/imagenes/${num}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    })


  }


  const ejecutarFetch=async () =>{ 
    
      const response= await  fetch(`${process.env.REACT_APP_DOMINIO_BACK}/noticias/${id}/imagenes/1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
        
      })
      
        const data = await response.json()
        
        if(data.msj){
            setMensaje(data.msj)
        }else{
            setBytes(data.datosImagen)
        }
      
    }

    useEffect(() => { 
        ejecutarFetch()

    },[])

    return( 
        <>
            {!mensaje? <>
            (<div>
                <div className="tarjetaListado">
                <img src={`data:image/jpeg;base64,${bytes}`} alt="" />
                </div>
            </div>)
            </>
            
            :<Mensaje msj={mensaje} />
            }
           
           
        </>
    )
}

export {ImagenOK}