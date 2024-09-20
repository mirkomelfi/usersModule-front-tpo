import React, { useState } from 'react';
import './Feedback.css';

export const Feedback = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [comment, setComment] = useState('');

  const subjects = [
    'Sugerencias para el club',
    'Problemas con el pago',
    'Información sobre membresías',
    'Reclamo por productos',
    'Consulta sobre eventos',
    'Reserva de instalaciones',
    'Acceso a beneficios',
    'Consulta sobre actividades deportivas',
    'Soporte técnico en la web',
    'Otros temas',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío del feedback (como enviarlo a un backend)
    console.log('Asunto:', selectedSubject);
    console.log('Comentario:', comment);
    // Reseteamos el formulario
    setSelectedSubject('');
    setComment('');
  };

  return (
    <div className="feedback-container">
      <h2>Dejanos tu comentario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Selecciona el asunto:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          required
        >
          <option value="" disabled>
            Elige un asunto
          </option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <label htmlFor="comment">Tu comentario:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="6"
          placeholder="Escribe tu comentario aquí"
          required
        ></textarea>

        <button type="submit" className="submit-button">Enviar Comentario</button>
      </form>
    </div>
  );
};
