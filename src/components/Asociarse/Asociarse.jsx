import React from 'react';
import './Asociarse.css';

import foto from "./socio1.png"
import foto2 from "./socio2.png"
import foto3 from "./socio3.png"
import foto4 from "./socio4.png"

export const Asociarse = () => {
  const planSubscripcion = [
    {
      type: 'Socio/a Simple',
      price: '$20.500',
      cadetPrice: '$17.000',
      description: 'En este momento tan especial, San Lorenzo nos necesita a todos; y la mejor forma de mostrar tu sentimiento es asociándote.',
      extra: '(*) Valor para mayor de 18 años',
      imagen: foto,
    },
    {
      type: 'Socio/a Patrimonial',
      price: '$30.000',
      cadetPrice: '$20.000',
      description: 'Para aquellos que han apoyado al club incondicionalmente, el carnet de socio honorario ofrece los máximos beneficios.',
      extra: '(*) Valor para mayor de 18 años',
      imagen: foto4,
    },
  ];

  return (
    <div className="asociarse-container">
      <h1>ASOCIATE</h1>
      <p>El club que queremos lo hacemos con vos</p>
      <div className="plans-container">
        {planSubscripcion.map((plan, index) => (
          <div key={index} className="plan-card">
            <img src={plan.imagen} alt={plan.type} />
            <h3>{plan.type}</h3>
            <p className="plan-price">{plan.price} /MES</p>
            <p className="plan-cadet-price">Cadete e infantil: {plan.cadetPrice} /mes</p>
            <p className="plan-description">{plan.description}</p>
            <button className="subscribe-button">ASOCIATE →</button>
            <p className="plan-extra">{plan.extra}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
