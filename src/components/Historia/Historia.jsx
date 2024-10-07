import React, { useState } from 'react';
import './Historia.css';

import foto from './historia.jpg'; // Asegúrate de tener las imágenes en tu carpeta

// Datos de eventos con una lista de ítems en la descripción
const eventos = [
  { año: '1940', descripcion: ['Primer campeonato nacional', 'Inauguración del nuevo estadio'], imagen: foto, ganados: 18, empatados: 3, perdidos: 2, posicion: 1 },
  { año: '1950', descripcion: ['Renovación de la plantilla', 'Nuevo patrocinador'], imagen: foto, ganados: 12, empatados: 5, perdidos: 6, posicion: 3 },
  { año: '1970', descripcion: ['Tercer título internacional', 'Estrella del equipo ganó premio MVP'], imagen: foto, ganados: 20, empatados: 2, perdidos: 1, posicion: 1 },
  { año: '1980', descripcion: ['Cuartos de final en Copa Libertadores'], imagen: foto, ganados: 10, empatados: 8, perdidos: 5, posicion: 5 },
  { año: '1990', descripcion: ['Nuevo director técnico'], imagen: foto, ganados: 15, empatados: 4, perdidos: 7, posicion: 2 },
  { año: '2000', descripcion: ['Nuevas instalaciones de entrenamiento'], imagen: foto, ganados: 17, empatados: 6, perdidos: 3, posicion: 1 },
  { año: '2001', descripcion: ['Nuevas instalaciones de entrenamiento'], imagen: foto, ganados: 16, empatados: 4, perdidos: 4, posicion: 2 },
  { año: '2002', descripcion: ['Nuevas instalaciones de entrenamiento'], imagen: foto, ganados: 14, empatados: 7, perdidos: 3, posicion: 3 },
  { año: '2003', descripcion: ['Nuevas instalaciones de entrenamiento'], imagen: foto, ganados: 18, empatados: 3, perdidos: 2, posicion: 1 },
];

// Lista de colores para los ítems
const coloresItems = ['#FF5733', '#33FF57', '#3357FF', '#F5B041', '#9B59B6', '#5DADE2'];

// Número máximo de eventos visibles en la línea de tiempo
const maxEventosVisibles = 7;

export const Historia = () => {
  const [indiceEvento, setIndiceEvento] = useState(0);
  const [rangoInicio, setRangoInicio] = useState(0); // Índice del primer evento visible

  const eventoSeleccionado = eventos[indiceEvento];

  // Función para avanzar de un evento a otro
  const avanzarEvento = () => {
    if (indiceEvento < eventos.length - 1) {
      setIndiceEvento(indiceEvento + 1);
      if (indiceEvento + 1 >= rangoInicio + maxEventosVisibles) {
        setRangoInicio(rangoInicio + 1); // Mover el rango hacia adelante
      }
    }
  };

  // Función para retroceder de un evento a otro
  const retrocederEvento = () => {
    if (indiceEvento > 0) {
      setIndiceEvento(indiceEvento - 1);
      if (indiceEvento - 1 < rangoInicio) {
        setRangoInicio(rangoInicio - 1); // Mover el rango hacia atrás
      }
    }
  };

  // Función para seleccionar un evento específico con el mouse
  const seleccionarEvento = (index) => {
    setIndiceEvento(index);
  };

  // Obtener el rango de eventos visibles
  const eventosVisibles = eventos.slice(rangoInicio, rangoInicio + maxEventosVisibles);

  return (
    <div className="historia-container">
      <h1 className="historia-h1">Historia del Club</h1>

      {/* Controles de flechas para navegar entre eventos */}
      <div className="historia-timeline-nav">
        <button className="historia-arrow historia-left" onClick={retrocederEvento} disabled={rangoInicio === 0}>
          &lt;
        </button>
        
        <div className="historia-timeline-container">
          {eventosVisibles.map((evento, index) => (
            <div className="historia-timeline-segment" key={index}>
              <div
                className={`historia-timeline-item ${eventoSeleccionado.año === evento.año ? 'active' : ''}`}
                onClick={() => seleccionarEvento(rangoInicio + index)} // Permitir seleccionar con clic
              >
                <div className="historia-circle"></div>
                <span>{evento.año}</span>
              </div>
              {/* Conexión entre los años */}
              {index < eventosVisibles.length - 1 && (
                <div className="historia-timeline-line"></div>
              )}
            </div>
          ))}
        </div>

        <button className="historia-arrow historia-right" onClick={avanzarEvento} disabled={rangoInicio + maxEventosVisibles >= eventos.length}>
          &gt;
        </button>
      </div>

      <div className="historia-evento-detalle">
        <h2 className="historia-evento-fecha">{eventoSeleccionado.año}</h2>

        {/* Sección de partidos ganados, empatados, perdidos y posición */}
        <div className="historia-partidos-info">
          <div className="historia-partido-item">
            <p><strong>Posición:</strong> {eventoSeleccionado.posicion}º</p>
          </div>
          <div className="historia-partido-item">
            <p><strong>Ganados:</strong> {eventoSeleccionado.ganados}</p>
          </div>
          <div className="historia-partido-item">
            <p><strong>Empatados:</strong> {eventoSeleccionado.empatados}</p>
          </div>
          <div className="historia-partido-item">
            <p><strong>Perdidos:</strong> {eventoSeleccionado.perdidos}</p>
          </div>
        </div>

        <ul className="historia-evento-descripcion">
          {eventoSeleccionado.descripcion.map((item, index) => (
            <li key={index} style={{ color: coloresItems[index % coloresItems.length] }}>{item}</li>
          ))}
        </ul>

        <img src={eventoSeleccionado.imagen} alt={`Evento ${eventoSeleccionado.año}`} />
      </div>
    </div>
  );
};


