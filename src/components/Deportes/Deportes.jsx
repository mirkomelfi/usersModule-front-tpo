import './Deportes.css';

import React, { useEffect, useRef, useState } from 'react';
import foto from './CanchaSanLorenzo.jpg';
import foto2 from './ikerMunian.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ImagenOK } from '../Imagen/ImagenOK';
import { useSelector } from 'react-redux';

const deportesData = [
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

export const Deportes = () => {
    const containerRef = useRef(null);
    const admin = useSelector((state) => state.usuarios.isAdmin);
    //const {id}= useParams();

    const [listaDeportes,setListaDeportes]= useState([]);
    const [mensaje,setMensaje]= useState(null);

    const navigate= useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const ejecutarFetch = async() =>{

      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/actividades`, {
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
        setListaDeportes(data)
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
            {/* Footer con botón Agregar Deporte */}
            
            {admin&&
                <div className="agregarDeporte">
                <Link to="/deportes/add" className="btn-agregar-deporte">
                    Agregar Deporte
                </Link>
            </div>
            }
            
            <div
                className="deportes-container"
                ref={containerRef}
                onWheel={handleWheel}
            >
                {listaDeportes.map((deporte, index) => (
                    <div key={index} className="deporte-card">
                        <img src={deporte.imagen} alt={deporte.titulo} className="deporte-imagen" />
                        <h2 className="deporte-titulo">{deporte.nombre}</h2>
                        <p className="deporte-descripcion">{deporte.descripcion}</p>
                        <p className="deporte-descripcion">Profesor a cargo: {deporte.profesor}</p>
                        <p className="deporte-descripcion">Valor mensual: {deporte.valor}</p>
                        <div >
                        <h2 className="deporte-descripcion">Dias</h2>
                        {deporte.dias.map((dia) => (<p className="deporte-descripcion">{dia}</p>))}
                        </div>
                       
                        <Link to={`/deportes/${deporte.id}`} className="btn-agregar-deporte">
                            Ir a Deporte
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};
