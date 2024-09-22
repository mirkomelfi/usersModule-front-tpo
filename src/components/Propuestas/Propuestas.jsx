import React, { useState } from 'react';
import './Propuestas.css';

const initialPropuestas = [
  { id: 1, title: 'Nueva cancha de fútbol 5', description: 'Construcción de una cancha de césped sintético.', votes: 124 },
  { id: 2, title: 'Reforma del gimnasio', description: 'Mejoras en las máquinas y equipamiento.', votes: 98 },
  { id: 3, title: 'Renovación del vestuario', description: 'Reparaciones y cambios de infraestructura.', votes: 76 },
];

export const Propuestas = () => {
  const [currentProposals, setCurrentProposals] = useState(initialPropuestas);
  const [searchTerm, setSearchTerm] = useState('');

  const handleVote = (id) => {
    setCurrentProposals((prevProposals) =>
      prevProposals.map((propuesta) =>
        propuesta.id === id ? { ...propuesta, votes: propuesta.votes + 1 } : propuesta
      )
    );
  };

  const handleAddProposal = () => {
    alert('Abrir modal o redirigir para agregar una propuesta nueva');
  };

  const filteredProposals = currentProposals.filter((propuesta) =>
    propuesta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    propuesta.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="propuestas-container">
      <h2>Propuestas</h2>
      <button className="add-proposal-button" onClick={handleAddProposal}>
        Agregar Propuesta
      </button>
      <input
        type="text"
        placeholder="Buscar propuesta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="propuestas-grid">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((propuesta) => (
            <div key={propuesta.id} className="propuesta-card">
              <h3>{propuesta.title}</h3>
              <p>{propuesta.description}</p>
              <p>Votos: {propuesta.votes}</p>
              <button className="vote-button" onClick={() => handleVote(propuesta.id)}>
                Votar
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron propuestas</p>
        )}
      </div>
    </div>
  );
};
