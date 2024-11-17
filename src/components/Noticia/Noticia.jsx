import React, { useEffect, useState } from 'react';
import './Noticia.css';
import foto from "./partido.jpg";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Noticia = () => {

  const {id}= useParams();
  const admin = useSelector((state) => state.usuarios.isAdmin);
  
  const [mensaje,setMensaje]=useState(null)
  const [noticia,setNoticia]=useState(null)

  const [loading, setLoading] = useState(true);

  const eliminar = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/admin/noticias/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
         // Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    return;
  };


  const ejecutarFetch = async () => {
    try {
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
      console.log(data)
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setNoticia(data);
      }
    } catch (error) {
      console.error('Error al cargar noticias:', error);
  } finally {
      setLoading(false);
  }
  }

    useEffect(() => {
      ejecutarFetch().catch((error) => console.error(error));
    }, []);


  if (loading) {
      return (
          <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Cargando...</p>
          </div>
      );
  }

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
