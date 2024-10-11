import React from 'react';
import './Asociarse.css';

import foto from "./socio1.png"
import foto2 from "./socio2.png"
import foto3 from "./socio3.png"
import foto4 from "./socio4.png"

export const Asociarse = () => {
  const planSubscripcion = [
    {
      tipo: 'Socio/a Simple',
      precio: '$20.500',
      precioInfantil: '$17.000',
      descripcion: 'En este momento tan especial, San Lorenzo nos necesita a todos; y la mejor forma de mostrar tu sentimiento es asociándote.',
      extra: '(*) Valor para mayor de 18 años',
      imagen: foto,
    },
    {
      tipo: 'Socio/a Patrimonial',
      precio: '$30.000',
      precioInfantil: '$20.000',
      descripcion: 'Para aquellos que han apoyado al club incondicionalmente, el carnet de socio honorario ofrece los máximos beneficios.',
      extra: '(*) Valor para mayor de 18 años',
      imagen: foto4,
    },
  ];

  // Función para manejar la suscripción
  const handleSubscribe = (tipo) => {
    alert(`Te asociaste como ${tipo}`);
  };

  return (
    <div className="asociarse-container">
      <h1>ASOCIATE</h1>
      <p>El club que queremos lo hacemos con vos</p>
      <div className="plans-container">
        {planSubscripcion.map((plan, index) => (
          <div key={index} className="plan-card">
            <img src={plan.imagen} alt={plan.tipo} />
            <h3>{plan.tipo}</h3>
            <p className="plan-price">{plan.precio} /MES</p>
            <p className="plan-cadet-price">Cadete e infantil: {plan.precioInfantil} /mes</p>
            <p className="plan-description">{plan.descripcion}</p>
            <button 
              className="subscribe-button" 
              onClick={() => handleSubscribe(plan.tipo)} // Llama a la función al hacer clic
            >
              ASOCIATE →
            </button>
            <p className="plan-extra">{plan.extra}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
