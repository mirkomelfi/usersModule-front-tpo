import './Noticias.css';

import React, { useEffect, useRef, useState } from 'react';
import foto from './CanchaSanLorenzo.jpg';
import foto2 from './ikerMunian.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ImagenOK } from '../Imagen/ImagenOK';
import { useSelector } from 'react-redux';

const noticiasData = [
    {
        id:1,
        titulo: 'Título',
        descripcion: 'Hola.',
        imagen: foto,
    },
    {
        id:1,
        titulo: 'Iker Munian',
        descripcion: 'ker Muniain fue presentado en San Lorenzo: el extraño número que va a usar, cuándo podrá jugar y la respuesta a Scaloni...',
        imagen: foto2,
    },
    {
        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        id:1,
        titulo: 'Título',
        descripcion: 'Es un placer estar aquí, estoy muy feliz de pertenecer a este gran club. El número no deja de ser anecdótico, es uno que me gusta y no quedaban muchos disponibles de los que solía llevar. Espero tener muchos éxitos con este”, señaló en sus primeras palabras, explicando la razón de por qué usará la camiseta con el número 80 en la espald...',
        imagen: foto,
    },
    {        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {        id:1,
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
];

export const Noticias = () => {
    const containerRef = useRef(null);
    const admin = useSelector((state) => state.usuarios.isAdmin);
    //const {id}= useParams();

    const [listaNoticias,setListaNoticias]= useState([]);
    const [mensaje,setMensaje]= useState(null);

    const navigate= useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const ejecutarFetch = async() =>{

      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/noticias`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
           // "Authorization": `Bearer ${getToken()}`
        }
        
      })
      /*
      const rol=validateRol(response)
      if (!rol){
        if (isRolUser(getToken())){
         
            setMensaje("No posee los permisos necesarios")
        }else{
          deleteToken()
          navigate("/login")
        }
      }else{*/
      const data = await response.json()
      if (data.msj){
        setMensaje(data.msj)
      }else{
        console.log(data)
        setListaNoticias(data)
      }
      }
   // }
  
  
    useEffect(() => { 
      ejecutarFetch()
      .catch(error => console.error(error))

    },[])


    const handleWheel = (event) => {
        const container = containerRef.current;
        container.scrollLeft += event.deltaY;
    };

    return (
        <>
            {/* Footer con botón Agregar Noticia */}
            {admin&&
                <div className="agregarNoticia">
                <Link to="/noticias/add" className="btn-agregar-noticia">
                    Agregar Noticia
                </Link>
            </div>
            }
            
            <div
                className="noticias-container"
                ref={containerRef}
                onWheel={handleWheel}
            >
                {listaNoticias.map((noticia, index) => (
                    <div key={index} className="noticia-card">
                        {//<img src={noticia.imagen} alt={noticia.titulo} className="noticia-imagen" />
                        }
                        <h2 className="noticia-titulo">{noticia.titulo}</h2>
                        <p className="noticia-descripcion">{noticia.descripcion}</p>
                        <Link to={`/noticias/${noticia.id}`} className="btn-agregar-noticia">
                            Ir a Noticia
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};
