import React from 'react';
import './Noticias.css';
import foto from './CanchaSanLorenzo.jpg' 
import foto2 from './ikerMunian.jpg' 

const noticiasData = [
    {
        titulo: 'Título',
        descripcion: 'Hola.',
        imagen: foto,
    },
    {
        titulo: 'Iker Munian',
        descripcion: 'Con una sorisa, ilusión, la novia, sus padres, casi un centenar de acreditados entre periodistas, cámaras y fotógrafos y hasta el Bocha. Sí, Ricardo Bochini fue uno de los presentes en el Pedro Bidegain para darle la bienvenida a Iker Muniain, el refuerzo estrella que llegó a San Lorenzo convirtiéndose en una de las grandes bombas del libro de pases argentino. “Es un placer estar aquí, estoy muy feliz de pertenecer a este gran club. El número no deja de ser anecdótico, es uno que me gusta y no quedaban muchos disponibles de los que solía llevar. Espero tener muchos éxitos con este”, señaló en sus primeras palabras, explicando la razón de por qué usará la camiseta con el número 80 en la espalda',
        imagen: foto2,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco Iker Muniain, parecía respirarse otro aire en Boedo y Bajo Flores. Aunque los problemas de San Lorenzo no tardaron en aflorar. Más allá de las dos victorias en hilera en esta Liga Profesional, el clima interno no es el ideal y en las últimas horas hubo una reunión entre el plantel y la dirigencia.',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco Iker Muniain, parecía respirarse otro aire en Boedo y Bajo Flores. Aunque los problemas de San Lorenzo no tardaron en aflorar. Más allá de las dos victorias en hilera en esta Liga Profesional, el clima interno no es el ideal y en las últimas horas hubo una reunión entre el plantel y la dirigencia.',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco Iker Muniain, parecía respirarse otro aire en Boedo y Bajo Flores. Aunque los problemas de San Lorenzo no tardaron en aflorar. Más allá de las dos victorias en hilera en esta Liga Profesional, el clima interno no es el ideal y en las últimas horas hubo una reunión entre el plantel y la dirigencia.',
        imagen: foto,
    },
    {
        titulo: 'Título',
        descripcion: 'Con la llegada del vasco Iker Muniain, parecía respirarse otro aire en Boedo y Bajo Flores. Aunque los problemas de San Lorenzo no tardaron en aflorar. Más allá de las dos victorias en hilera en esta Liga Profesional, el clima interno no es el ideal y en las últimas horas hubo una reunión entre el plantel y la dirigencia.',
        imagen: foto,
    },
];

export const Noticias = () => {
    return (
        <div className="noticias-container">
            {noticiasData.map(noticia => (
                <div key={noticia.id} className="noticia-card">
                    <img src={noticia.imagen} alt={noticia.titulo} className="noticia-imagen" />
                    <h2 className="noticia-titulo">{noticia.titulo}</h2>
                    <p className="noticia-descripcion">{noticia.descripcion}</p>
                </div>
            ))}
        </div>
    );
}


