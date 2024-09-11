import React, { useRef, useState } from 'react';
import './Noticias.css';
import foto from './CanchaSanLorenzo.jpg';
import foto2 from './ikerMunian.jpg';

const noticiasData = [
    {
        titulo: 'Título',
        descripcion: 'Hola.',
        imagen: foto,
    },
    {
        titulo: 'Iker Munian',
        descripcion: 'ker Muniain fue presentado en San Lorenzo: el extraño número que va a usar, cuándo podrá jugar y la respuesta a Scaloni...',
        imagen: foto2,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Es un placer estar aquí, estoy muy feliz de pertenecer a este gran club. El número no deja de ser anecdótico, es uno que me gusta y no quedaban muchos disponibles de los que solía llevar. Espero tener muchos éxitos con este”, señaló en sus primeras palabras, explicando la razón de por qué usará la camiseta con el número 80 en la espald...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco...',
        imagen: foto,
    },
];

export const Noticias = () => {
    const containerRef = useRef(null);

    const handleWheel = (event) => {
        const container = containerRef.current;
        container.scrollLeft += event.deltaY; // Desplaza en función del movimiento del mouse
    };

    return (
        <div
            className="noticias-container"
            ref={containerRef}
            onWheel={handleWheel}  // Añadido desplazamiento con la rueda del mouse
        >
            {noticiasData.map((noticia, index) => (
                <div key={index} className="noticia-card">
                    <img src={noticia.imagen} alt={noticia.titulo} className="noticia-imagen" />
                    <h2 className="noticia-titulo">{noticia.titulo}</h2>
                    <p className="noticia-descripcion">{noticia.descripcion}</p>
                </div>
            ))}
        </div>
    );
};

