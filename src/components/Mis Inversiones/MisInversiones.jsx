import React, { useState, useEffect } from 'react';
import './MisInversiones.css';
import foto from './Ojotas.jpg';
import { useSelector } from 'react-redux';
import { getToken } from '../../utils/auth-utils';
// Datos de ejemplo para las inversiones realizadas
const inversionesData = [
  { id: 1, nombre: 'Inversión A', descripcion: 'Agrandar el Estadio', montoInvertido: 1000, rentabilidad: '8% anual', retornoActual: 1080, estado: 'positivo' },
  { id: 2, nombre: 'Inversión B', descripcion: 'Agrandar el Estadio', montoInvertido: 500, rentabilidad: '-5% anual', retornoActual: 475, estado: 'negativo' },
  { id: 3, nombre: 'Inversión C', descripcion: 'Agrandar el Estadio', montoInvertido: 2000, rentabilidad: '12% anual', retornoActual: 2240, estado: 'positivo' },
  { id: 4, nombre: 'Inversión D', descripcion: 'Proyecto de Renovación', montoInvertido: 1500, rentabilidad: '5% anual', retornoActual: 1575, estado: 'positivo' },
  { id: 5, nombre: 'Inversión E', descripcion: 'Nueva Infraestructura', montoInvertido: 1200, rentabilidad: '-2% anual', retornoActual: 1176, estado: 'negativo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
  { id: 6, nombre: 'Inversión F', descripcion: 'Expansión de Áreas Verdes', montoInvertido: 800, rentabilidad: '4% anual', retornoActual: 832, estado: 'positivo' },
];

export const MisInversiones = () => {
  const [inversiones, setInversiones] = useState([]);


  const username = useSelector((state) => state.usuarios.username);

  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Estado para manejar errores

    useEffect(() => {
        // Conectar al WebSocket en el endpoint /ws
        const socket = new WebSocket('ws://localhost:8080/ws');
        // Al abrir la conexión WebSocket
        socket.onopen = () => {
            console.log("Conexión WebSocket establecida.");
            // Enviar un mensaje al servidor si es necesario (por ejemplo, para pedir productos)
            socket.send(`USER:${username}`)
        };
        // Manejar el mensaje recibido del servidor
        socket.onmessage = (event) => {
            console.log("Mensaje recibido: ", event.data);
            try {
                // Deserializar el JSON de productos
                const misInversiones = JSON.parse(event.data);
                
                // Verificar que la respuesta sea un array de productos
                if (Array.isArray(misInversiones)) {
                  misInversiones.forEach(producto=>{
                    producto.image=foto
                  })
                    setInversiones(misInversiones);  // Actualizar el estado de productos
                } else {
                    throw new Error("Las inversiones no están en el formato esperado.");
                }

                setLoading(false);  // Marcar como "cargado" una vez que los productos llegan
            } catch (e) {
                console.error("Error al procesar las inversiones: ", e);
                setError("Error al recibir las inversiones .");  // Mostrar un mensaje de error
                setLoading(false);  // Cambiar el estado de carga
            }
        };

        // Manejar errores en la conexión WebSocket
        socket.onerror = (error) => {
            console.error("Error en WebSocket: ", error);
            setError("Error en la conexión WebSocket.");
            setLoading(false);  // Cambiar el estado de carga en caso de error
        };

        // Manejar el cierre de la conexión WebSocket
        socket.onclose = () => {
            console.log("Conexión WebSocket cerrada.");
        };

        // Limpiar al desmontar el componente
        return () => {
            socket.close();
        };
    }, []);  // Este efecto se ejecuta una sola vez cuando el componente se monta

    const actualizarInversiones = async() =>{
      try {
  
          let url=`misInversiones?username=${username}`
        
          const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`,
            }
            
          })
          console.log("sttatus:",response.status)
          
       } catch (error) {
          console.error('Error al cargar noticias:', error);
      } finally {
          setLoading(false);
      }        
    }
    
      useEffect(() => { 
        actualizarInversiones()
      },[])
  
  return (
    <div className="misInversiones-container">
      <h2 className="misInversiones-header">Mis Inversiones</h2>

      <div className="misInversiones-table-container">
        <table className="misInversiones-table">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Descripción</th>
              <th>Monto Invertido ($)</th>
              <th>Rentabilidad</th>
              <th>Retorno Actual ($)</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {inversiones.map((inversion) => (
              <tr key={inversion.id} className={`misInversiones-row ${inversion.estado === 'positivo' ? 'misInversiones-positivo' : 'misInversiones-negativo'}`}>
                <td>{inversion.nombre}</td>
                <td>{inversion.descripcion}</td>
                <td>{inversion.montoInvertido}</td>
                <td>{inversion.rentabilidad}</td>
                <td>{inversion.retornoActual}</td>
                <td className={`misInversiones-estado ${inversion.estado}`}>{inversion.estado === 'positivo' ? 'Positivo' : 'Negativo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
