import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Pedidos.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito
import foto from './Ojotas.jpg';


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
    const navigate = useNavigate();
    
    const [listaPedidos, setlistaPedidos] = useState([]);
    const [mensaje, setMensaje] = useState(null);

    const [loading, setLoading] = useState(true);
/*
    const getPedidos = async() =>{

      try {
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

      } catch (error) {
        console.error('Error al cargar pedidos:', error);
    } finally {
        setLoading(false);
    }
      }
    */
      const actualizarVentas = async() =>{
    
        let url=`misPedidos?username=${username}`
      
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
          
        })
      }
    /*
        setTimeout(function(){
            getPedidos()
        }, 5000);
        
      }
    */
    useEffect(() => { 
        actualizarVentas()
    },[])



    const [sales, setSales] = useState([]);  
    
    // Conectar al WebSocket
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws');
    
        socket.onopen = () => {
            console.log("Conexión WebSocket establecida.");
            // Enviar el ID de usuario para identificarlo en el backend
            socket.send(`USER:${username}`);  // Por ejemplo, 123 es el userId del usuario
        };
    
        socket.onmessage = (event) => {
            console.log("Mensaje recibido: ", event.data);
            if (Array.isArray(event.data)){
              var arraySales=JSON.parse(event.data)
              console.log(arraySales)
              arraySales.forEach((sale)=>{
                const date=""+new Date(sale.fecha)
                sale.fecha=date//.substr(date.indexOf("GMT"))
              })
              setSales(arraySales);
            }else{
              alert(`${event.data}`)
            }
            setLoading(null);  // Cuando lleguen las ventas, cambiamos el estado de carga
        };
    
        socket.onerror = (error) => {
            console.error("Error en WebSocket: ", error);
        };
    
        socket.onclose = () => {
            console.log("Conexión WebSocket cerrada.");
        };
    
        // Limpiar la conexión al desmontar el componente
        return () => {
            socket.close();
        };
    }, []);


    if (loading) {
      return (
          <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Cargando...</p>
          </div>
      );
  }

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
              {sales&&sales.length!=0&&sales.map((pedido) => (
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

