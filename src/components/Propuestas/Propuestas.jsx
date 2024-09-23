import React, { useState } from 'react';
import './Propuestas.css';

const initialPropuestas = [
  { id: 1, title: 'Nueva cancha de fútbol 5', description: 'Construcción de una cancha de césped sintético para entrenamientos.', votes: 124 },
  { id: 2, title: 'Reforma del gimnasio', description: 'Renovación del gimnasio del club con nuevo equipamiento.', votes: 98 },
  { id: 3, title: 'Renovación de vestuarios', description: 'Mejorar las instalaciones del vestuario para el equipo y los socios.', votes: 76 },
  { id: 4, title: 'Instalación de paneles solares', description: 'Incorporar paneles solares para hacer el club más ecológico.', votes: 85 },
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
      <button className="add-campaign-button" onClick={handleAddProposal}>
        Eliminar Propuesta
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
