import React, { useEffect, useState } from 'react';
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

  const [url, setUrl] = useState("");


  const dni=111


  const [listaCampañas,setListaCampañas]= useState([]);
  const [mensaje,setMensaje]= useState(null);
 

  const ejecutarFetch = async() =>{

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/campanas${url}`, { 
      method: "GET",
      headers: {
          "Content-Type": "application/json",
         // "Authorization": `Bearer ${getToken()}`
      }
      
    })
    /*
    const rol=validateRol(response)
    if (!rol){
      if (isRolUser(getToken())){
       
          setMensaje("No posee los permisos necesarios")
      }else{
        deleteToken()
        navigate("/login")
      }
    }else{*/
    const data = await response.json()
    if (data.msj){
      console.log(data.msj)

      setListaCampañas([])
      setMensaje(data.msj)
    //  alert("este usr no tiene campañas. msj temporal")
    }else{
      console.log(data)
      setListaCampañas(data)
    }
    }
 // }


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
          <option value="">Todas</option>
          <option value="Abiertas">Abierta</option>
          <option value="Cerradas">Cerrada</option>
         {// <option value="No votadas">No votadas</option>
         }
        </select>
      </div>
      <div className="campañas-list">
        {listaCampañas.map((campaña) => (
          <div key={campaña.id} className="campaña-card">
            <h3>{campaña.titulo}</h3>
            <p>Objetivo: {campaña.descripcion}</p>
            <p>Estado: {campaña.estado}</p>
            <p>Opciones de votación:</p>
            <div className="opciones-votacion">
              {campaña.opciones.map((opcion) => (
                <button
                  key={opcion.id}
                  className={`vote-button ${votos[campaña.id] === opcion ? 'voted' : ''}`}
                  onClick={() => handleVote(campaña.id, opcion)}
                >
                  {opcion.titulo}
                </button>
              ))}
              <button
                className={`vote-button ${votos[campaña.id] === 'No votar' ? 'voted' : ''}`}
                onClick={() => handleNoVote(campaña.id)}
              >
                No votar
              </button>
            </div>
            {votos[campaña.id] && <p>Has votado por: {votos[campaña.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
