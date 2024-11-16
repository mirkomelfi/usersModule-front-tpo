import React, { useEffect, useState } from 'react';
import './Asociarse.css';

import foto from "./socio1.png"
import foto2 from "./socio2.png"
import foto3 from "./socio3.png"
import foto4 from "./socio4.png"
import { extractRol, getToken, isTokenExpired } from '../../utils/auth-utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Asociarse = () => {

  const [tipo,setTipo]=useState(null)
  const navigate=useNavigate()
  const [mensaje,setMensaje]=useState(null)
  const [error,setError]=useState(null)
  const dni = useSelector((state) => state.usuarios.dni);
  

  const planSubscripcion = [
    {
      tipo: 'Socio/a Simple',
      tipoBDD:"Activo",
      precio: '$20.500',
      precioInfantil: '$17.000',
      descripcion: 'En este momento tan especial, San Lorenzo nos necesita a todos; y la mejor forma de mostrar tu sentimiento es asociándote.',
      extra: '(*) Valor para mayor de 18 años',
      imagen: foto,
    },
    {
      tipo: 'Socio/a Patrimonial',      
      tipoBDD:"Patrimonial",
      precio: '$30.000',
      precioInfantil: '$20.000',
      descripcion: 'Para aquellos que han apoyado al club incondicionalmente, el carnet de socio honorario ofrece los máximos beneficios.',
      extra: '(*) Valor para mayor de 18 años',
      imagen: foto4,
    },
  ];

  // Función para manejar la suscripción
  const handleSubscribe = (tipo) => {
    setTipo(tipo)
    console.log(tipo)
    alert(`Te asociaste como ${tipo}`);
  };

  const handleAsociar = async() => {
    const newUser={
      nombre:null,
      apellido:null,
      direccion:{
          calle:null,
          numero:null,
          codPostal:null,
          ciudad:null,
      },
      telefono:null,
      rol:tipo
    }
    console.log(newUser)

    //var url = `${process.env.REACT_APP_DOMINIO_BACK}/cambiarPerfil/${dni}`;
    var url = `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}/rol`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(newUser),
    });
    if (response.status==403){
      if (isTokenExpired(getToken())) {
        alert("Venció su sesión. Vuelva a logguearse")
        navigate("/logout")
      }
    }
    if (response.status === 200) {
      const data = await response.json();
      console.log(data.msj)
      setMensaje(data.msj);
    } else {
      const data = await response.json();
      setError(true);
      console.log(data.msj)
      setMensaje(data.msj);
    }
  }


    useEffect(()=>{
      if (tipo){ 
        handleAsociar()
      }
    },[tipo])


  return (
    <div className="asociarse-container">
           { extractRol(getToken())=="Cliente"&& <><h1>ASOCIATE</h1>
            <p>El club que queremos lo hacemos con vos</p></>}
                       { extractRol(getToken())=="Socio"&&<> <h1>CAMBIO DE PLAN</h1>
            <p>El club que queremos lo hacemos con vos</p></>}
      {
        extractRol(getToken())=="Cliente"&&

      <div className="plans-container">
        {planSubscripcion.map((plan, index) => (
          <div key={index} className="plan-card">
            <img src={plan.imagen} alt={plan.tipo} />
            <h3>{plan.tipo}</h3>
            <p className="plan-price">{plan.precio} /MES</p>
            <p className="plan-cadet-price">Cadete e infantil: {plan.precioInfantil} /mes</p>
            <p className="plan-description">{plan.descripcion}</p>
            <button 
              className="subscribe-button" 
              onClick={() => handleSubscribe(plan.tipoBDD)} // Llama a la función al hacer clic
            >
              ASOCIATE →
            </button>
            <p className="plan-extra">{plan.extra}</p>
          </div>
        ))}
      </div>
       }
       {extractRol(getToken())=="Socio"&&
      <div className="plans-container">
       <div className="plan-card">
            <img src={planSubscripcion[1].imagen} alt={planSubscripcion[1].tipo} />
            <h3>{planSubscripcion[1].tipo}</h3>
            <p className="plan-price">{planSubscripcion[1].precio} /MES</p>
            <p className="plan-cadet-price">Cadete e infantil: {planSubscripcion[1].precioInfantil} /mes</p>
            <p className="plan-description">{planSubscripcion[1].descripcion}</p>
            <button 
              className="subscribe-button" 
              onClick={() => handleSubscribe(planSubscripcion[1].tipoBDD)} // Llama a la función al hacer clic
            >
              ASOCIATE →
            </button>
            <p className="plan-extra">{planSubscripcion[1].extra}</p>
          </div>
      </div>
      }
      {extractRol(getToken())=="Patrimonial"&&
      <div className="plans-container">
        <div className="plan-card">
            <img src={planSubscripcion[0].imagen} alt={planSubscripcion[0].tipo} />
            <h3>{planSubscripcion[0].tipo}</h3>
            <p className="plan-price">{planSubscripcion[0].precio} /MES</p>
            <p className="plan-cadet-price">Cadete e infantil: {planSubscripcion[0].precioInfantil} /mes</p>
            <p className="plan-description">{planSubscripcion[0].descripcion}</p>
            <button 
              className="subscribe-button" 
              onClick={() => handleSubscribe(planSubscripcion[0].tipoBDD)} // Llama a la función al hacer clic
            >
              ASOCIATE →
            </button>
            <p className="plan-extra">{planSubscripcion[0].extra}</p>
          </div>
      </div>
      }
    </div>
  );
};
