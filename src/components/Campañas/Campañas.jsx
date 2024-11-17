import React, { useEffect, useState } from 'react';
import './Campañas.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Necesario para la navegación
import { deleteToken, getToken, isTokenExpired } from '../../utils/auth-utils';

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
  const [selectedStatus, setSelectedStatus] = useState('');

  const admin = useSelector((state) => state.usuarios.isAdmin);
  const [url, setUrl] = useState("");
  const navigate = useNavigate(); // Hook para navegar

  const [listaCampañas,setListaCampañas]= useState([]);
  const [mensaje,setMensaje]= useState(null);

  const [loading, setLoading] = useState(true);

  const ejecutarFetch = async() =>{
    try {
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/campanas${url}`, { 
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`
          }
          
        })

        if (response.status==403){
          if (isTokenExpired(getToken())) {
            alert("Venció su sesión. Vuelva a logguearse")
            navigate("/logout")
          }
        }

        const data = await response.json()

        if (data.msj){
          console.log(data.msj)
          setListaCampañas([])
          setMensaje(data.msj)
        }else{
          console.log(data)
          setListaCampañas(data)
        }
      } catch (error) {
          console.error('Error al cargar camapañas:', error);
      } finally {
          setLoading(false);
      }
    }

  
  useEffect(() => { 
    ejecutarFetch()
    .catch(error => console.error(error))
  },[url])

  useEffect(() => { 
    setUrl(selectedStatus)
  },[selectedStatus])

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleAdd = () => {
    navigate("/campañas/add")
  };

if (loading) {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
}


  return (
    <div className="campañas-container">
      <h2>Campañas</h2>
      {admin && (
        <div>
          <button className="add-campaign-button" onClick={handleAdd}>Lanzar Campaña</button>
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
        {listaCampañas.map((campaña) => (
          <div key={campaña.id} className="campaña-card">
            <h3>{campaña.titulo}</h3>
            <p>Objetivo: {campaña.descripcion}</p>
            <p>Estado: {campaña.estado}</p>
            {/*  <button onClick={() => navigate(`/campaña/${campaña.id}`)} className="campaña-button"> */}

              <button onClick={() => navigate(`/campañas/${campaña.id}`)} className="campaña-button">
              Ir a Campaña
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};
