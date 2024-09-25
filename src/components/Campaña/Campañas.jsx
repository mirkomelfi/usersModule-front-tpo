import React, { useState } from 'react';
import './Campañas.css';

const campañas = [
  {
    id: 1,
    name: 'Campaña de donación de sangre',
    goal: 'Recolección de 500 donaciones para la comunidad.',
    status: 'Abierta',
    opciones: ['Aumentar promoción', 'Involucrar más empresas', 'Organizar eventos']
  },
  {
    id: 2,
    name: 'Reforestación del estadio',
    goal: 'Plantación de 100 árboles alrededor del club.',
    status: 'Cerrada',
    opciones: ['Contratar más voluntarios', 'Hacer donaciones', 'Aumentar promoción']
  },
];

export const Campañas = () => {
  const [selectedStatus, setSelectedStatus] = useState('Todas');
  const [votos, setVotos] = useState({});

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleVote = (campañaId, opcion) => {
    setVotos({
      ...votos,
      [campañaId]: opcion
    });
  };

  const filteredCampañas = selectedStatus === 'Todas'
    ? campañas
    : selectedStatus === 'No votadas'
    ? campañas.filter(campaña => !votos[campaña.id]) // Muestra las que no tienen un voto registrado
    : campañas.filter(campaña => campaña.status === selectedStatus);

  return (
    <div className="campañas-container">
      <h2>Campañas</h2>
      <button className="add-campaign-button">Agregar Campaña</button>
      <button className="add-campaign-button">Eliminar Campaña</button>
      <div className="campañas-filter">
        <label htmlFor="status-filter">Filtrar por estado:</label>
        <select id="status-filter" value={selectedStatus} onChange={handleStatusChange}>
          <option value="Todas">Todas</option>
          <option value="Abierta">Abierta</option>
          <option value="Cerrada">Cerrada</option>
          <option value="No votadas">No votadas</option> {/* Nueva opción para filtrar por no votadas */}
        </select>
      </div>
      <div className="campañas-list">
        {filteredCampañas.map((campaña) => (
          <div key={campaña.id} className="campaña-card">
            <h3>{campaña.name}</h3>
            <p>Objetivo: {campaña.goal}</p>
            <p>Estado: {campaña.status}</p>
            <p>Opciones de votación:</p>
            <div className="opciones-votacion">
              {campaña.opciones.map((opcion) => (
                <button
                  key={opcion}
                  className={votos[campaña.id] === opcion ? 'voted' : ''}
                  onClick={() => handleVote(campaña.id, opcion)}
                >
                  {opcion}
                </button>
              ))}
            </div>
            {votos[campaña.id] && <p>Has votado por: {votos[campaña.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
