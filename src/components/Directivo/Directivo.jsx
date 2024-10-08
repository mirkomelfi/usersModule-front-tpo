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
        <div className="directivo-card">
          <img src={foto} alt="Directivo 3" className="directivo-imagen" />
          <p className="nombre">Directivo 3</p>
          <p className="posicion">Posición</p>
        </div>
        <div className="directivo-card">
          <img src={foto} alt="Directivo 2" className="directivo-imagen" />
          <p className="nombre">Directivo 2</p>
          <p className="posicion">Posición</p>
        </div>

        {/* Presidente */}
        <div className="directivo-card presidente-card">
          <img src={foto} alt="Presidente" className="directivo-imagen" />
          <p className="nombre">Presidente</p>
          <p className="posicion">Posición Principal</p>
        </div>

        {/* Otros Directivos */}
        <div className="directivo-card">
          <img src={foto} alt="Directivo 2" className="directivo-imagen" />
          <p className="nombre">Directivo 2</p>
          <p className="posicion">Posición</p>
        </div>
        <div className="directivo-card">
          <img src={foto} alt="Directivo 3" className="directivo-imagen" />
          <p className="nombre">Directivo 3</p>
          <p className="posicion">Posición</p>
        </div>
      </div>

      {/* Vocales */}
    <div className="vocales-section">
        <div className="vocales-column">
            <h3>Vocales Titulares</h3>
            <ul>
            <li>María López</li>
            <li>Juan Pérez</li>
            <li>Sofía Rodríguez</li>
            <li>Martín García</li>
            <li>Laura Fernández</li>
            <li>Carlos Ramírez</li>
            <li>Ana González</li>
            <li>Lucas Martínez</li>
            <li>Jorge Torres</li>
            <li>Paula Vázquez</li>
            <li>Tomás Núñez</li>
            </ul>
        </div>

        <div className="vocales-column">
            <h3>Vocales Suplentes</h3>
            <ul>
            <li>Gabriela Díaz</li>
            <li>Pedro Suárez</li>
            <li>Valeria Silva</li>
            <li>Diego Ruiz</li>
            <li>Raúl Castro</li>
            <li>Elena Figueroa</li>
            <li>Manuel Ortega</li>
            <li>Marta Rivas</li>
            <li>Javier Paredes</li>
            <li>Patricia Herrera</li>
            <li>Andrés Sosa</li>
            <li>Julieta Maldonado</li>
            </ul>
        </div>

        <div className="vocales-column">
            <h3>Vocales Suplentes</h3>
            <ul>
            <li>Clara Álvarez</li>
            <li>Ricardo Domínguez</li>
            <li>Sandra Morales</li>
            <li>Francisco Varela</li>
            <li>Esteban Cabrera</li>
            <li>Daniela Miranda</li>
            <li>Gonzalo Gil</li>
            <li>Isabel Flores</li>
            <li>Nicolás Méndez</li>
            <li>Lucía Sánchez</li>
            <li>Fabián Bustos</li>
            <li>Emilia Aguirre</li>
            </ul>
        </div>

        <div className="vocales-column">
            <h3>Vocales Suplentes</h3>
            <ul>
            <li>Inés Romero</li>
            <li>Santiago Vargas</li>
            <li>Miguel Rojas</li>
            <li>Florencia Peña</li>
            <li>Cristian Navarro</li>
            <li>Liliana Ponce</li>
            <li>Rodrigo Salinas</li>
            <li>Verónica Cortés</li>
            <li>Germán Aguayo</li>
            <li>Camila Ojeda</li>
            <li>Federico Benítez</li>
            <li>Silvana Arias</li>
            </ul>
        </div>
    </div>
    </div>
  );
};
