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

    const [paddingLeft, setPaddingLeft] = useState(20); // Valor inicial del padding

    const [loading, setLoading] = useState(true);

    const navigate= useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const ejecutarFetch = async() =>{
        try {
            const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/actividades`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                // "Authorization": `Bearer ${getToken()}`
                }
                
            })

            const data = await response.json()
            if (data.msj){
                setMensaje(data.msj)
            }else{
                console.log(data)
                setListaDeportes(data)
            }
        } catch (error) {
            console.error('Error al cargar deportes:', error);
        } finally {
            setLoading(false);
        }
      }

  
   useEffect(() => { 
    ejecutarFetch()
    .catch(error => console.error(error))

  },[])
  
    useEffect(() => { 

      const totalDeportes = listaDeportes.length;
        if (totalDeportes <= 5) {
            setPaddingLeft(50);  // Padding para 1-5 deportes
        } else if (totalDeportes <= 10) {
            setPaddingLeft(100 * totalDeportes);  // Padding para 6-10 deportes
        } else if (totalDeportes <= 15) {
            setPaddingLeft(150 * totalDeportes);  // Padding para 11-15 deportes
        } else if (totalDeportes <= 20) {
            setPaddingLeft(200 * totalDeportes);  // Padding para 16-20 deportes
        } else {
            setPaddingLeft(250 * totalDeportes);  // Padding por defecto si hay más de 20 deportes
        }


    },[listaDeportes])


    const handleWheel = (event) => {
        const container = containerRef.current;
        container.scrollLeft += event.deltaY * 2;
    };

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <>

         {/* Título principal */}
         <div className="deportes-header">
            <h1 className="deportes-titulo-pagina">Deportes</h1>
        </div>

            {admin &&
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
                style={{ paddingLeft: `${paddingLeft}px` }}  // Aplica padding dinámico
            >
                {listaDeportes.map((deporte, index) => (
                    <div key={index} className="deporte-card">
                        <img src={deporte.imagen} alt={deporte.titulo} className="deporte-imagen" />
                        <h2 className="deporte-titulo">{deporte.nombre}</h2>
                        <p className="deporte-descripcion">{deporte.descripcion}</p>
                        <p className="deporte-descripcion">Profesor a cargo: {deporte.profesor}</p>
                        <p className="deporte-descripcion">Valor mensual: {deporte.valor}</p>
                        <div>
                            <h2 className="deporte-descripcion">Días</h2>
                            {deporte.dias.map((dia, diaIndex) => (
                                <p key={diaIndex} className="deporte-descripcion">{dia}</p>
                            ))}
                        </div>
                        {/*<Link to={`/deportes/${deporte.id}`} className="btn-agregar-deporte">
                            Ir a Deporte
                        </Link>*/}
                    </div>
                ))}
            </div>
        </>
    );
};
