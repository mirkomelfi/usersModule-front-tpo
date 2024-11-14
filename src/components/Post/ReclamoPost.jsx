import React, { useState } from 'react';
import './Post.css';

export const ReclamosPost = () => {
  const usuarioActual = "A"; // Usuario logueado, en este caso "A"
  
  const [tipoReclamo, setTipoReclamo] = useState('');
  const [premisa, setPremisa] = useState('');
  const [comentario, setComentario] = useState('');

  // Lista de tipos de reclamo (puedes agregar más tipos)
  const tiposDeReclamo = ['Problema Técnico', 'Consulta', 'Queja', 'Sugerencia'];

  // Manejar cambios en los inputs
  const handleTipoReclamoChange = (e) => setTipoReclamo(e.target.value);
  const handlePremisaChange = (e) => setPremisa(e.target.value);
  const handleComentarioChange = (e) => setComentario(e.target.value);

  // Enviar el reclamo
  const handleSubmit = () => {
    if (!tipoReclamo || !premisa || !comentario) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevoReclamo = {
      usuario: usuarioActual,
      tipoReclamo,
      premisa,
      comentario
    };

    console.log('Reclamo enviado:', nuevoReclamo);
    // Aquí podrías agregar la lógica para guardar el reclamo, como una llamada a la API.
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Crear Nuevo Reclamo</h2>
        
        {/* Campo Tipo de Reclamo (Dropdown) */}
        <select
          className="post-select"
          value={tipoReclamo}
          onChange={handleTipoReclamoChange}
        >
          <option value="">Selecciona un tipo de reclamo</option>
          {tiposDeReclamo.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        {/* Campo Premisa */}
        <input
          type="text"
          className="post-input"
          placeholder="Premisa del Reclamo"
          value={premisa}
          onChange={handlePremisaChange}
        />

        {/* Campo Comentario */}
        <textarea
          className="post-textarea"
          placeholder="Comentario"
          value={comentario}
          onChange={handleComentarioChange}
        />

        {/* Botón de Enviar Reclamo */}
        <button className="post-button" onClick={handleSubmit}>
          Enviar Reclamo
        </button>
      </div>
    </div>
  );
};
