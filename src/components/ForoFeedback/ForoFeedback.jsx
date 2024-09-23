import React, { useState } from 'react';
import './ForoFeedback.css';

const feedbacks = [
  { id: 1, user: 'Juan Pérez', comment: 'Muy buena la atención en boletería. Rápido y eficiente.', date: '2024-09-01', subject: 'Atención' },
  { id: 2, user: 'Ana Gómez', comment: 'Los tiempos de espera para ingresar al estadio podrían mejorar.', date: '2024-09-02', subject: 'Tiempos de espera' },
  { id: 3, user: 'Carlos López', comment: 'La nueva tienda del club está increíble, ¡muy buena experiencia de compra!', date: '2024-09-03', subject: 'Tienda del club' },
  { id: 4, user: 'María Fernández', comment: 'Tuve problemas para acceder a mi cuenta de socio, espero puedan solucionarlo.', date: '2024-09-04', subject: 'Sistema de socios' },
  { id: 5, user: 'Pedro Sanchez', comment: 'Sería genial que incluyeran más productos de merch del equipo.', date: '2024-09-05', subject: 'Variedad de productos' },
];

export const ForoFeedback = () => {
  const [selectedSubject, setSelectedSubject] = useState('Todos');

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleAddFeedback = () => {
    alert('Abrir modal o redirigir para agregar un nuevo feedback');
  };

  const filteredFeedbacks = selectedSubject === 'Todos'
    ? feedbacks
    : feedbacks.filter(feedback => feedback.subject === selectedSubject);

  return (
    <div className="foro-container">
      <h2 className="foro-title">Lista de Feedback</h2>
      <button className="add-feedback-button" onClick={handleAddFeedback}>
        Agregar Feedback
      </button>
      <button className="add-feedback-button" onClick={handleAddFeedback}>
        Eliminar Feedback
      </button>
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
