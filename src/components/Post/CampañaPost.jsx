import React, { useState } from 'react';
import './Post.css';

export const CampañaPost = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Abierta');
  const [opciones, setOpciones] = useState([]);
  const [nuevaOpcion, setNuevaOpcion] = useState('');

  // Función para agregar una nueva opción a la lista
  const agregarOpcion = () => {
    if (nuevaOpcion.trim()) {
      setOpciones([...opciones, nuevaOpcion]);
      setNuevaOpcion(''); // Limpiar el input después de agregar
    }
  };

  // Función para manejar el envío de la campaña
  const handlePost = () => {
    const nuevaCampaña = {
      id: Math.random(), // Generar un id único
      titulo,
      descripcion,
      estado,
      opcion: opciones,
    };
    console.log('Nueva campaña creada:', nuevaCampaña);
    // Aquí puedes enviar la campaña al backend o hacer otras acciones
    setTitulo('');
    setDescripcion('');
    setOpciones([]);
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Crear nueva campaña</h2>
        <div className="post-form">
          <input
            type="text"
            className="post-input"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            className="post-textarea"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <select
            className="post-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Abierta">Abierta</option>
            <option value="Cerrada">Cerrada</option>
          </select>
          <div className="post-opciones">
            <input
              type="text"
              className="post-input"
              placeholder="Nueva opción"
              value={nuevaOpcion}
              onChange={(e) => setNuevaOpcion(e.target.value)}
            />
            <button className="agregar-opciones-button " onClick={agregarOpcion}>
              Agregar opción
            </button>
          </div>
          <ul className="post-options">
            {opciones.map((opcion, index) => (
              <li key={index} className="post-option">{opcion}</li>
            ))}
          </ul>
          <button className="post-button" onClick={handlePost}>
            Subir campaña
          </button>
        </div>
      </div>
    </div>
  );
};
