import React, { useState } from 'react';
import './Campañas.css';

const campañas = [
  { id: 1, name: 'Campaña de donación de sangre', goal: 'Recolección de 500 donaciones.', status: 'Activa' },
  { id: 2, name: 'Reforestación del club', goal: 'Plantación de 100 árboles.', status: 'Completada' },
  { id: 3, name: 'Reciclaje de plástico', goal: 'Reducir uso de plástico en eventos.', status: 'Activa' },
];

export const Campañas = () => {
  const [selectedStatus, setSelectedStatus] = useState('Todas');

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredCampañas = selectedStatus === 'Todas'
    ? campañas
    : campañas.filter(campaña => campaña.status === selectedStatus);

  return (
    <div className="campañas-container">
      <h2>Campañas</h2>
      <div className="campañas-filter">
        <label htmlFor="status-filter">Filtrar por estado:</label>
        <select id="status-filter" value={selectedStatus} onChange={handleStatusChange}>
          <option value="Todas">Todas</option>
          <option value="Activa">Activa</option>
          <option value="Completada">Completada</option>
        </select>
      </div>
      <div className="campañas-list">
        {filteredCampañas.map((campaña) => (
          <div key={campaña.id} className="campaña-card">
            <h3>{campaña.name}</h3>
            <p>Objetivo: {campaña.goal}</p>
            <p>Estado: {campaña.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
