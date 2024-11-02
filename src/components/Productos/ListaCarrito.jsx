import React, { useEffect, useState } from 'react';
import './ListaCarrito.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../store/actions/cart.action';

const initialCarritoProductos = [
  { id: 1, name: 'Crocs Azul Unisex', price: '$44.990', quantity: 2 },
  { id: 2, name: 'Probnado1 Crocs Azul Unisex', price: '$3.990', quantity: 1 },
  { id: 3, name: 'Probnado Crocs Azul Unisex', price: '$2.990', quantity: 3 },
  // Agrega más productos según lo que el usuario seleccione
];

export const ListaCarrito = () => {
  const dispatch=useDispatch()
  var carrito = useSelector((state) => state.cart.items);
  const [carritoProductos, setCarritoProductos] = useState(null);
  console.log("carrio: ",carrito)

  const calcularTotal = () => {
    return carrito.reduce((acc, producto) => {
      const precio = parseFloat(producto.precioVenta).toFixed(2);
      return acc + precio * 1;
    }, 0);
  };

  const eliminarProducto = (id) => {
    dispatch(deleteFromCart(carritoProductos.filter(producto => producto.idProducto !== id)));
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
            <tr key={producto.idProducto}>
              <td>{producto.idProducto}</td>
              <td>{producto.nombre}</td>
              <td>1</td>
              <td>$ {producto.precioVenta}</td>
              <td>
                <button className="accion-btn" onClick={eliminarProducto(producto.idProducto)}>Eliminar</button>
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
