import React, { useEffect, useState } from 'react';
import './Campañas.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Necesario para la navegación

const campañas = [
  {
    id: 1,
    titulo: 'Campaña de donación de sangre',
    descripcion: 'Recolección de 500 donaciones para la comunidad.',
    estado: 'Abierta',
    opcion: ['Aumentar promoción', 'Involucrar más empresas', 'Organizar eventos']
  },
  {
    id: 2,
    titulo: 'Reforestación del estadio',
    descripcion: 'Plantación de 100 árboles alrededor del club.',
    estado: 'Cerrada',
    opcion: ['Contratar más voluntarios', 'Hacer donaciones', 'Aumentar promoción']
  },
];

export const Campañas = () => {
  const [selectedStatus, setSelectedStatus] = useState('Todas');
  const [votos, setVotos] = useState({});
  const admin = useSelector((state) => state.usuarios.isAdmin);
  const [url, setUrl] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleVote = (campañaId, opcion) => {
    setVotos({
      ...votos,
      [campañaId]: opcion
    });
  };

  const handleNoVote = (campañaId) => {
    setVotos({
      ...votos,
      [campañaId]: 'No votar'
    });
  };

  const filteredCampañas = selectedStatus === 'Todas'
    ? campañas
    : selectedStatus === 'No votadas'
    ? campañas.filter(campaña => !votos[campaña.id])
    : campañas.filter(campaña => campaña.estado === selectedStatus);

  return (
    <div className="campañas-container">
      <h2>Campañas</h2>
      {admin && (
        <div>
          <button className="add-campaign-button">Lanzar Campaña</button>
          <button className="add-campaign-button">Cerrar Campaña</button>
        </div>
      )}
      <div className="campañas-filter">
        <label htmlFor="status-filter">Filtrar por estado:</label>
        <select id="status-filter" value={selectedStatus} onChange={handleStatusChange}>
          <option value="">Todas</option>
          <option value="Abiertas">Abierta</option>
          <option value="Cerradas">Cerrada</option>
        </select>
      </div>
      <div className="campañas-list">
        {filteredCampañas.map((campaña) => (
          <div key={campaña.id} className="campaña-card">
            <h3>{campaña.titulo}</h3>
            <p>Objetivo: {campaña.descripcion}</p>
            <p>Estado: {campaña.estado}</p>
            {/*  <button onClick={() => navigate(`/campaña/${campaña.id}`)} className="campaña-button"> */}
            <button onClick={() => navigate(`/campaña`)} className="campaña-button">
              Ir a Campaña
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
