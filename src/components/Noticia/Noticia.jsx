import React, { useEffect, useState } from 'react';
import './Noticia.css';
import foto from "./partido.jpg";

export const Noticia = () => {
  //const {id}= useParams();

  var id=1
  
  const [mensaje,setMensaje]=useState(null)
  const [noticia,setNoticia]=useState(null)

  const ejecutarFetch = async () => {
    var url = ``;
    
    url = `${process.env.REACT_APP_DOMINIO_BACK}/noticias/${id}`;
    

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await response.json();

    if (data.msj) {
      setMensaje(data.msj);
    } else {
      setNoticia(data);
    }
  }

    useEffect(() => {
      ejecutarFetch().catch((error) => console.error(error));
    }, []);



  return (
    
    <div className="noticia-container">
      <header className="noticia-header">
        <h1>Encabezado de la Noticia</h1>
      </header>

      <div className="clearfix">
        <div className="main-content">
          <div className="noticia-imagen">
            <img src={foto} alt="Descripción de la imagen" />
          </div>

          <div className="noticia-introduccion">
            <p>
              Esta es una breve introducción de la noticia que resume el contenido principal. Puede ser uno o dos párrafos que llamen la atención del lector para continuar leyendo.
            </p>
          </div>

          <div className="noticia-contenido">
            <p>
              Aquí va el contenido completo de la noticia. Es posible que quieras separar el contenido en diferentes párrafos o incluir subtítulos, citas, o cualquier otro elemento que consideres relevante.
            </p>
            <p>
              Otro párrafo adicional con más detalles o explicaciones de la noticia. Esto puede extenderse lo necesario para cubrir toda la información relevante.
            </p>
          </div>
        </div>

        <div className="sidebar">
          <h2>Artículos relacionados</h2>
          <p>Contenido adicional que puedes agregar aquí, como noticias relacionadas, publicidad o enlaces importantes.</p>
        </div>
      </div>
    </div>
  );
};
