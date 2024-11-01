import React, { useState } from 'react';
import './Producto.css';

import producto from "./Ojotas.jpg";

export const Producto = () => {
  const [cantidad, setCantidad] = useState(1);

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleComprar = () => {
    alert(`Has comprado ${cantidad} unidades del producto.`);
  };

  // Datos del producto
  const productoInfo = {
    nombre: "Camiseta del Club",
    descripcion: "Camiseta oficial del club con tela de alta calidad.",
    precioVenta: 29500,
    stockActual: 50,
    descuentoEfectivo: "10%",
    descuentoSocios: "15%",
    descuentoNoSocios: "5%",
    categoria: "Ropa deportiva",
    caracteristicas: ["Tela transpirable", "Diseño original del club"],
    talles: ["S", "M", "L", "XL"]
  };

  return (
    <div className="producto-container">
      {/* Imagen del producto */}
      <div className="producto-imagen">
        <img src={producto} alt="Producto" />
      </div>

      {/* Detalles del producto */}
      <div className="producto-detalles">
        <h1 className="producto-titulo">{productoInfo.nombre}</h1>
        <p className="producto-precio">${productoInfo.precioVenta.toLocaleString()}</p>
        <p className="producto-descripcion">{productoInfo.descripcion}</p>
        <p className="producto-stock">Stock actual: {productoInfo.stockActual} unidades</p>
        <p className="producto-categoria">Categoría: {productoInfo.categoria}</p>

        {/* Descuentos */}
        <div className="producto-descuentos">
          <p>Descuento efectivo: {productoInfo.descuentoEfectivo}</p>
          <p>Descuento para socios: {productoInfo.descuentoSocios}</p>
          <p>Descuento para no socios: {productoInfo.descuentoNoSocios}</p>
        </div>

        {/* Características */}
        <div className="producto-caracteristicas">
          <h3>Características:</h3>
          <ul>
            {productoInfo.caracteristicas.map((caracteristica, index) => (
              <li key={index}>{caracteristica}</li>
            ))}
          </ul>
        </div>

        {/* Talles disponibles */}
        <div className="producto-talles">
          <h3>Talles disponibles:</h3>
          <ul>
            {productoInfo.talles.map((talle, index) => (
              <li key={index}>{talle}</li>
            ))}
          </ul>
        </div>

        {/* Cantidad y botón de comprar */}
        <div className="producto-compra">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            max={productoInfo.stockActual}
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
