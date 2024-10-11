import React, { useState } from 'react';
import './ListaCarrito.css';

const initialCarritoProductos = [
  { id: 1, name: 'Crocs Azul Unisex', price: '$44.990', quantity: 2 },
  { id: 2, name: 'Probnado1 Crocs Azul Unisex', price: '$3.990', quantity: 1 },
  { id: 3, name: 'Probnado Crocs Azul Unisex', price: '$2.990', quantity: 3 },
  // Agrega más productos según lo que el usuario seleccione
];

export const ListaCarrito = () => {
  const [carritoProductos, setCarritoProductos] = useState(initialCarritoProductos);

  const calcularTotal = () => {
    return carritoProductos.reduce((acc, producto) => {
      const precio = parseFloat(producto.price.replace('$', '').replace('.', ''));
      return acc + precio * producto.quantity;
    }, 0);
  };

  const eliminarProducto = (id) => {
    setCarritoProductos(carritoProductos.filter(producto => producto.id !== id));
  };

  const manejarPago = () => {
    if (carritoProductos.length === 0) {
      alert('No has agregado nada al carrito.');
      return; // Salimos de la función si el carrito está vacío
    }

    const total = calcularTotal();
    alert(`Realizaste el pago con un monto total de $${total}`);
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
                <button className="accion-btn" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="carrito-total">
        <h3>Total: ${calcularTotal()}</h3>
      </div>
      <button className="checkout-btn" onClick={manejarPago}>Pagar</button>
    </div>
  );
};
