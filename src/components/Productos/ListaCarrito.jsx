import React from 'react';
import './ListaCarrito.css';

const carritoProductos = [
  { id: 1, name: 'Crocs Azul Unisex', price: '$44.990', quantity: 2 },
  { id: 2, name: 'Probnado1 Crocs Azul Unisex', price: '$3.990', quantity: 1 },
  { id: 3, name: 'Probnado Crocs Azul Unisex', price: '$2.990', quantity: 3 },
  // Agrega más productos según lo que el usuario seleccione
];

export const ListaCarrito = () => {
  const calcularTotal = () => {
    return carritoProductos.reduce((acc, producto) => {
      const precio = parseFloat(producto.price.replace('$', '').replace('.', ''));
      return acc + precio * producto.quantity;
    }, 0);
  };

  return (
    <div className="carrito-container">
      <h2>Tu Carrito</h2>
      <table className="carrito-tabla">
        <thead>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carritoProductos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>{producto.quantity}</td>
              <td>{producto.price}</td>
              <td>
                {/* Aquí puedes agregar botones de acciones como "Eliminar" o "Editar" */}
                <button className="accion-btn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="carrito-total">
        <h3>Total: ${calcularTotal()}</h3>
      </div>
      <button className="checkout-btn">Pagar</button>
    </div>
  );
};
