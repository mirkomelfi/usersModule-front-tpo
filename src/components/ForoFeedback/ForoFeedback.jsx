import React, { useState } from 'react';
import './ForoFeedback.css';

const feedbacks = [
  { id: 1, user: 'Juan Pérez', comment: 'Muy buen servicio, me encantó la atención.', date: '2024-09-01', subject: 'Atención' },
  { id: 2, user: 'Ana Gómez', comment: 'Podrían mejorar los tiempos de respuesta.', date: '2024-09-02', subject: 'Tiempo de respuesta' },
  { id: 3, user: 'Carlos López', comment: 'Gran experiencia en general, lo recomiendo.', date: '2024-09-03', subject: 'Experiencia' },
  { id: 4, user: 'María Fernández', comment: 'No pude acceder al sistema de compras, hubo un error.', date: '2024-09-04', subject: 'Errores del sistema' },
  { id: 5, user: 'Pedro Sanchez', comment: 'Me gustaría ver más variedad de productos.', date: '2024-09-05', subject: 'Variedad de productos' },
  // Añade más feedbacks según lo necesites
];

export const ForoFeedback = () => {
  const [selectedSubject, setSelectedSubject] = useState('Todos');

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredFeedbacks = selectedSubject === 'Todos'
    ? feedbacks
    : feedbacks.filter(feedback => feedback.subject === selectedSubject);

  return (
    <div className="foro-container">
      <h2 className="foro-title">Lista de Feedback</h2>
      <div className="foro-filter">
        <label htmlFor="subject-filter">Filtrar por asunto:</label>
        <select id="subject-filter" value={selectedSubject} onChange={handleSubjectChange}>
          <option value="Todos">Todos</option>
          <option value="Atención">Atención</option>
          <option value="Tiempo de respuesta">Tiempo de respuesta</option>
          <option value="Experiencia">Experiencia</option>
          <option value="Errores del sistema">Errores del sistema</option>
          <option value="Variedad de productos">Variedad de productos</option>
        </select>
      </div>
      <div className="foro-scroll">
        {filteredFeedbacks.map(feedback => (
          <div key={feedback.id} className="foro-item">
            <div className="foro-user">{feedback.user}</div>
            <div className="foro-date">{feedback.date}</div>
            <p className="foro-comment">{feedback.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
