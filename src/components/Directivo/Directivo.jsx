import React from 'react';
import './Directivo.css';

import foto from "./persona.jpg";

export const Directivo = () => {
  const starLine = Array.from({ length: 50 }, (_, index) => (
    <span
      key={index}
      className={`star ${index % 2 === 0 ? 'red-star' : 'blue-star'}`}
    >
      ★
    </span>
  ));

  // Constantes para los directivos y vocales
  const directivos = [
    { nombre: 'Carlos Méndez', posicion: 'Director de Finanzas', imagen: foto },
    { nombre: 'Laura Navarro', posicion: 'Directora de Deportes', imagen: foto },
    { nombre: 'Ana Muñoz', posicion: 'Directora de Marketing', imagen: foto },
    { nombre: 'Tomás Martínez', posicion: 'Director de Relaciones Públicas', imagen: foto }
  ];

  const presidente = {
    nombre: 'Roberto Fernández',
    posicion: 'Presidente',
    imagen: foto
  };

  const vocalesTitulares = [
    'Javier González', 'Sandra López', 'Eduardo Torres', 
    'Patricia Flores', 'Rodrigo Ortiz', 'Marta Serrano', 'Federico Álvarez'
  ];

  const vocalesSuplentes = [
    'Claudia Rivas', 'Ignacio Díaz', 'Sara Vega',
    'Esteban Marín', 'Emilio Cabrera', 'Cristina Pérez'
  ];

  const secretario = [
    'Marcos Alarcón', 'Sofía Blanco', 'Jorge Herrera'
  ];

  const tesorero = [
    'Elena Ruiz', 'Raúl Sánchez', 'Luz Gutiérrez'
  ];

  const asesorLegal = [
    'Ricardo López', 'Andrés Cabrera', 'María Jiménez'
  ];

  const infraestructura = [
    'Joaquín Silva', 'Daniel García', 'Lucía Márquez'
  ];

  const comunicacion = [
    'Alberto Reyes', 'Carmen Salinas', 'Sergio Delgado'
  ];

  const eventos = [
    'Verónica Gómez', 'Felipe Ortega', 'Natalia Castro'
  ];

  return (
    <div className="directivo-page-container">
      {/* Sección de encabezado */}
      <div className="header-container">
        <p className="breadcrumb">El club</p>
        <h1 className="page-title">Autoridades</h1>
        <div className="star-line">
          {starLine}
        </div>
      </div>

      {/* Directivos */}
      <div className="directivos-section">
        {/* Primer grupo de directivos */}
        <div className="directivo-card">
          <img src={directivos[0].imagen} alt={directivos[0].posicion} className="directivo-imagen" />
          <p className="nombre">{directivos[0].nombre}</p>
          <p className="posicion">{directivos[0].posicion}</p>
        </div>
        <div className="directivo-card">
          <img src={directivos[1].imagen} alt={directivos[1].posicion} className="directivo-imagen" />
          <p className="nombre">{directivos[1].nombre}</p>
          <p className="posicion">{directivos[1].posicion}</p>
        </div>

        {/* Presidente al centro */}
        <div className="directivo-card presidente-card">
          <img src={presidente.imagen} alt="Presidente" className="directivo-imagen" />
          <p className="nombre">{presidente.nombre}</p>
          <p className="posicion">{presidente.posicion}</p>
        </div>

        {/* Segundo grupo de directivos */}
        <div className="directivo-card">
          <img src={directivos[2].imagen} alt={directivos[2].posicion} className="directivo-imagen" />
          <p className="nombre">{directivos[2].nombre}</p>
          <p className="posicion">{directivos[2].posicion}</p>
        </div>
        <div className="directivo-card">
          <img src={directivos[3].imagen} alt={directivos[3].posicion} className="directivo-imagen" />
          <p className="nombre">{directivos[3].nombre}</p>
          <p className="posicion">{directivos[3].posicion}</p>
        </div>
      </div>

      <div className="vocales-section">
        <div className="vocales-columns">

          <div className="vocales-group">
            <h3>Vocales Titulares</h3>
            <ul>
              {vocalesTitulares.map((vocal, index) => (
                <li key={index}>{vocal}</li>
              ))}
            </ul>
          </div>

          <div className="vocales-group">
            <h3>Vocales Suplentes</h3>
            <ul>
              {vocalesSuplentes.map((vocal, index) => (
                <li key={index}>{vocal}</li>
              ))}
            </ul>
          </div>

          <div className="vocales-group">
            <h3>Secretario</h3>
            <ul>
              {secretario.map((persona, index) => (
                <li key={index}>{persona}</li>
              ))}
            </ul>
            <h3>Tesorero</h3>
            <ul>
              {tesorero.map((persona, index) => (
                <li key={index}>{persona}</li>
              ))}
            </ul>
          </div>

          <div className="vocales-group">
            <h3>Asesor Legal</h3>
            <ul>
              {asesorLegal.map((persona, index) => (
                <li key={index}>{persona}</li>
              ))}
            </ul>
            <h3>Infraestructura</h3>
            <ul>
              {infraestructura.map((persona, index) => (
                <li key={index}>{persona}</li>
              ))}
            </ul>
          </div>

          <div className="vocales-group">
            <h3>Comunicación</h3>
            <ul>
              {comunicacion.map((persona, index) => (
                <li key={index}>{persona}</li>
              ))}
            </ul>
            <h3>Eventos</h3>
            <ul>
              {eventos.map((persona, index) => (
                <li key={index}>{persona}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

