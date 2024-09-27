import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Campaña.css';

const campaña = {
  id: 1,
  titulo: 'Campaña de donación de sangre',
  descripcion: 'Recolección de 500 donaciones para la comunidad.',
  estado: 'Abierta',
  opcion: ['Aumentar promoción', 'Involucrar más empresas', 'Organizar eventos'],
};

export const Campaña = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const navigate = useNavigate();

  const handleOpcionClick = (opcion) => {
    setOpcionSeleccionada(opcion);
    setMostrarConfirmacion(true); // Muestra la confirmación inmediatamente
  };

  const handleDecision = (confirmar) => {
    if (confirmar) {
      alert(`Has confirmado tu voto por la opción: ${opcionSeleccionada} en la campaña: ${campaña.titulo}`);
      navigate('/campañas'); // Redirige a la página de campañas
    } else {
      setMostrarConfirmacion(false); // Cierra la confirmación
      setOpcionSeleccionada(null); // Reinicia la selección
    }
  };

  return (
    <div className={`campaña-detalle ${mostrarConfirmacion ? 'blur' : ''}`}>
      <div className="campaña-card-detalle">
        <h2>{campaña.titulo}</h2>
        <h3>Descripcion: {campaña.descripcion}</h3  >
        <div className="opciones-votacion">
          {campaña.opcion.slice(0, 3).map((opcion, index) => (
            <button
              key={index}
              className={`opcion-button ${opcion === opcionSeleccionada ? 'seleccionada' : ''}`}
              onClick={() => handleOpcionClick(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
      {mostrarConfirmacion && (
        <div className="confirmacion-alerta">
          <div className="alerta-tarjeta">
            <p>¿Confirmas tu voto por "{opcionSeleccionada}"?</p>
            <div className="alerta-opciones">
              <button className="alerta-button" onClick={() => handleDecision(true)}>Sí</button>
              <button className="alerta-button alerta-button-no" onClick={() => handleDecision(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
