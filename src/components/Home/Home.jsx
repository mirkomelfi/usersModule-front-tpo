import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { validateRol,isRolUser,getToken,deleteToken } from "../../utils/auth-utils";
import { useState,useEffect } from "react";

export const Home = () =>{
  const [rolUser,setRolUser]=useState(undefined)
  const navigate=useNavigate()

const ejecutarFetch = async () =>{
  let url=`${process.env.REACT_APP_DOMINIO_BACK}/miPerfil`
  const response= await  fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    }  
  })

  const rol=validateRol(response)
  if (!rol){
    navigate("/login")
  }else{
    setRolUser(isRolUser(getToken()))
  }

}
const navigateTo=(url)=>{
  navigate(url)
}
  useEffect(()=>{
    ejecutarFetch()
    .catch(error => console.error(error))
  },[])
    return (
      <div className="home">
      {!rolUser?
         <>
        <button class="button button-home  btnPrimary" onClick={()=>navigateTo(`reclamos`)}><span class="btnText">Reclamos</span></button>
        <button class="button button-home  btnPrimary" onClick={()=>navigateTo(`edificios`)}><span class="btnText">Edificios</span></button>
        <button class="button button-home btnPrimary" onClick={()=>navigateTo(`usuarios`)}><span class="btnText">Usuarios</span></button>
        <button class="button button-home btnPrimary" onClick={()=>navigateTo(`usuario/current`)}><span class="btnText">Mi perfil</span></button>

        </>
        : 

        <>
        <button class="button button-home btnPrimary" onClick={()=>navigateTo(`usuario/reclamos`)}><span class="btnText">Mis Reclamos</span></button>
        <button class="button button-home btnPrimary" onClick={()=>navigateTo(`usuario/unidades`)}><span class="btnText">Mis unidades</span></button>
        <button class="button button-home btnPrimary" onClick={()=>navigateTo(`usuario/areas`)}><span class="btnText">Mis areas</span></button>
        <button class="button button-home btnPrimary" onClick={()=>navigateTo(`usuario/current`)}><span class="btnText">Mi perfil</span></button>

        </>
      }
       </div> 
        
    );
  }
  