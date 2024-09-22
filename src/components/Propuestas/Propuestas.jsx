import React, { useState } from 'react';
import './Propuestas.css';

const propuestas = [
  { id: 1, title: 'Nueva cancha de fútbol 5', description: 'Construcción de una cancha de césped sintético.', votes: 124 },
  { id: 2, title: 'Reforma del gimnasio', description: 'Mejoras en las máquinas y equipamiento.', votes: 98 },
  { id: 3, title: 'Renovación del vestuario', description: 'Reparaciones y cambios de infraestructura.', votes: 76 },
  // Añade más propuestas según necesites
];

export const Propuestas = () => {
  const [currentProposals, setCurrentProposals] = useState(propuestas);

  return (
    <div className="propuestas-container">
      <h2>Propuestas</h2>
      <div className="propuestas-grid">
        {currentProposals.map((propuesta) => (
          <div key={propuesta.id} className="propuesta-card">
            <h3>{propuesta.title}</h3>
            <p>{propuesta.description}</p>
            <p>Votos: {propuesta.votes}</p>
            <button className="vote-button">Votar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
