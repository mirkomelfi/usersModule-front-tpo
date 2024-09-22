import React from 'react';
import './ForoFeedback.css';

const feedbacks = [
  { id: 1, user: 'Juan Pérez', comment: 'Muy buen servicio, me encantó la atención.', date: '2024-09-01' },
  { id: 2, user: 'Ana Gómez', comment: 'Podrían mejorar los tiempos de respuesta.', date: '2024-09-02' },
  { id: 3, user: 'Carlos López', comment: 'Gran experiencia en general, lo recomiendo.', date: '2024-09-03' },
  { id: 4, user: 'María Fernández', comment: 'No pude acceder al sistema de compras, hubo un error.', date: '2024-09-04' },
  { id: 5, user: 'Pedro Sanchez', comment: 'Me gustaría ver más variedad de productos.', date: '2024-09-05' },
  // Añade más feedbacks según lo necesites
];

export const ForoFeedback = () => {
  return (
    <div className="foro-container">
      <h2 className="foro-title">Lista de Feedback</h2>
      <div className="foro-scroll">
        {feedbacks.map(feedback => (
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

