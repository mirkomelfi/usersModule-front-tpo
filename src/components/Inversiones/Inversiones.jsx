import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Inversiones.css';
import { getToken } from '../../utils/auth-utils';

const proyectosData = [
  { id: 1, nombre: 'Proyecto A', descripcion: 'Inversión en energías renovables', rentabilidad: '7% anual' },
  { id: 2, nombre: 'Proyecto B', descripcion: 'Desarrollo de tecnología agrícola', rentabilidad: '10% anual' },
  { id: 3, nombre: 'Proyecto C', descripcion: 'Construcción de viviendas sostenibles', rentabilidad: '5% anual' },
];

export const Inversiones = () => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [montoInversion, setMontoInversion] = useState(0);
  const [nota, setNota] = useState("");

  const username = useSelector((state) => state.usuarios.username);


  const handleProyectoChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    setProyectoSeleccionado(proyectosData.find(proyecto => proyecto.id === selectedId));
  };

  const handleMontoChange = (event) => {
    setMontoInversion(event.target.value);
  };
  const handleNotaChange = (event) => {
    setNota(event.target.value);
  };

  const handleInvertir =async () => {
      const inversion={
        amount:montoInversion,
        usuario:username,
        note:nota
      }
      let url=`finalizarInversion`
      console.log(inversion)
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
        body:JSON.stringify(inversion)
        
      })
      
      const data = await response.json()
      console.log(data)
      if (data.msj){
        //setMensaje(data.msj)
        console.log(data.msj)
      }
      alert(`Has invertido €${montoInversion}`);
   /* if (proyectoSeleccionado && montoInversion) {
      alert(`Has invertido €${montoInversion} en ${proyectoSeleccionado.nombre}`);
    } else {
      alert('Por favor, selecciona un proyecto y un monto de inversión');
    }*/
  };

 

  return (
    <div className="inversiones-container">
      <h2 className="inversiones-header">Invertir</h2>
      
      <div className="inversiones-form">
        <label htmlFor="proyecto" className="inversiones-label">Selecciona un Proyecto:</label>
        <select id="proyecto" className="inversiones-select" onChange={handleProyectoChange}>
          <option value="">-- Seleccionar Proyecto --</option>
          {proyectosData.map(proyecto => (
            <option key={proyecto.id} value={proyecto.id}>
              {proyecto.nombre} - {proyecto.rentabilidad}
            </option>
          ))}
        </select>

        {proyectoSeleccionado && (
          <div className="inversiones-detalle">
            <p><strong>Descripción:</strong> {proyectoSeleccionado.descripcion}</p>
            <p><strong>Rentabilidad:</strong> {proyectoSeleccionado.rentabilidad}</p>
          </div>
        )}
        <label htmlFor="monto" className="inversiones-label">Nota de la Inversión:</label>
        <input
          type="text"
          id="nota"
          className="inversiones-input"
          value={nota}
          onChange={handleNotaChange}
          placeholder="Ingresa la nota"
        />
        <label htmlFor="monto" className="inversiones-label">Monto de Inversión ($):</label>
        <input
          type="number"
          id="monto"
          className="inversiones-input"
          value={montoInversion}
          onChange={handleMontoChange}
          placeholder="Ingresa el monto"
        />

        <button className="inversiones-button" onClick={handleInvertir}>Invertir</button>
      </div>
    </div>
  );
};
