import React from 'react';
import './Pedidos.css';

const pedidos = [
  {
    id: 1,
    nombreUsuario:"Manuel Jimenez",
    fecha: "22/01/2021",
    monto: "$160.00",
    cantidadProd: 3,
    productos: ["Producto A", "Producto B", "Producto C"],
    estado: "Completo",
  },
  {
    id: 2,
    nombreUsuario:"Manuel Jimenez",
    fecha: "23/01/2021",
    monto: "$250.00",
    cantidadProd: 2,
    productos: ["Producto X", "Producto Y"],
    estado: "Pendiente",
  },
  {
    id: 3,
    nombreUsuario:"Manuel Jimenez",
    fecha: "24/01/2021",
    monto: "$120.00",
    cantidadProd: 1,
    productos: ["Producto Z"],
    estado: "Completo",
  },
  // Agrega más pedidos según sea necesario
];

export const Pedidos = () => {
    return (
        <div className="pedidos-container">
          <h2 className="pedidos-titulo">Pedidos de Compras Realizadas en la Tienda</h2>
          <table className="pedidos-tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Cantidad</th>
                <th>Productos</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.monto}</td>
                  <td>{pedido.cantidadProd}</td>
                  <td>{pedido.productos.join(", ")}</td>
                  <td>{pedido.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

