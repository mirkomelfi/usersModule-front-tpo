import React, { useState } from 'react';
import './Producto.css';

import producto from "./Ojotas.jpg"

export const Producto = () => {
  const [cantidad, setCantidad] = useState(1);

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleComprar = () => {
    alert(`Has comprado ${cantidad} unidades del producto.`);
  };

  return (
    <div className="producto-container">
      {/* Imagen del producto */}
      <div className="producto-imagen">
        <img src={producto} alt="Producto" />
      </div>

      {/* Detalles del producto */}
      <div className="producto-detalles">
        <h1 className="producto-titulo">Camiseta</h1>
        <p className="producto-precio">$29.500</p>
        <p className="producto-descripcion">
          Camiseta del Club
        </p>

        {/* Cantidad y botón de comprar */}
        <div className="producto-compra">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            value={cantidad}
            onChange={handleCantidadChange}
          />

          <button className="btn-comprar" onClick={handleComprar}>
            Agregar Al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};
