import React, { useEffect, useState } from 'react';
import './Deporte.css';
import foto from "./partido.jpg";
import { useParams } from 'react-router-dom';

export const Deporte = () => {

  const {id}= useParams();
  const dni=111
  
  const [mensaje,setMensaje]=useState(null)
  const [deporte,setDeporte]=useState(null)

  const inscribirse = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/actividades/${id}/inscripciones/${dni}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         // Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    const data = await response.json();
    console.log(data)
      if (data.msj) {
        setMensaje(data.msj);
      }
    return;
  };


  const ejecutarFetch = async () => {
    var url = ``;
    
    url = `${process.env.REACT_APP_DOMINIO_BACK}/actividades/${id}`;
    

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();
    console.log(data)
    if (data.msj) {
      setMensaje(data.msj);
    } else {
      setDeporte(data);
    }
  }

    useEffect(() => {
      ejecutarFetch().catch((error) => console.error(error));
    }, []);



  return (
    
    <div className="deporte-container">
      <header className="deporte-header">
        <h1>Encabezado del Deporte</h1>
      </header>
      <button className="perfil-btn perfil-btn-danger"  onClick={() => inscribirse()}>Inscribirse</button>

      <div className="clearfix">
        <div className="main-content">
          <div className="deporte-imagen">
            <img src={foto} alt="Descripción de la imagen" />
          </div>

          <div className="deporte-introduccion">
            <p>
              Esta es una breve introducción de la deporte que resume el contenido principal. Puede ser uno o dos párrafos que llamen la atención del lector para continuar leyendo.
            </p>
          </div>

          <div className="deporte-contenido">
            <p>
              Aquí va el contenido completo de la deporte. Es posible que quieras separar el contenido en diferentes párrafos o incluir subtítulos, citas, o cualquier otro elemento que consideres relevante.
            </p>
            <p>
              Otro párrafo adicional con más detalles o explicaciones de la deporte. Esto puede extenderse lo necesario para cubrir toda la información relevante.
            </p>
          </div>
        </div>

        <div className="sidebar">
          <h2>Artículos relacionados</h2>
          <p>Contenido adicional que puedes agregar aquí, como deportes relacionadas, publicidad o enlaces importantes.</p>
        </div>
      </div>
    </div>
  );
};
