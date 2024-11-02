import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Pedidos.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito
import foto from './Ojotas.jpg';
import { useSelector } from 'react-redux';

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
    const isUser = useSelector((state) => state.usuarios.dni);
    const username = useSelector((state) => state.usuarios.username);
    console.log("username",username)
    const navigate = useNavigate();
    
    const [listaPedidos, setlistaPedidos] = useState([]);
    const [mensaje, setMensaje] = useState(null);

    const getPedidos = async() =>{

        let url=`ventas?username=${username}`
      
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
          
        })
        
        const data = await response.json()
        console.log(data)
        if (data.msj){
          setlistaPedidos([])
          setMensaje(data.msj)
        }else{
          setlistaPedidos(data)
        }
      }
    
      const actualizarVentas = async() =>{
    
        let url=`misPedidos?username=${username}`
      
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
          
        })
        
    
        setTimeout(function(){
            getPedidos()
        }, 5000);
        
      }
    
    useEffect(() => { 
        actualizarVentas()
    },[])
    


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
              {listaPedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.idVenta}</td>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.montoTotal}</td>
                  <td>{pedido.productos.length}</td>
                  <td>{pedido.productos.join(", ")}</td>
                  <td>{pedido.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

