import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Reclamos.css';

import foto from './CanchaSanLorenzo.jpg';
import { getToken } from '../../utils/auth-utils';

const reclamos = [
  { 
    id: 1, 
    usuario: 'A', 
    tipoReclamo: 'Mantenimiento', 
    fecha: '2024-09-10T08:30:00Z', 
    premisa: 'Problemas de mantenimiento en el club', 
    comentario: 'Hay muchas áreas en el club que necesitan mantenimiento.', 
    imagen: foto,
    estado: 'Pendiente' 
  },
  { 
    id: 2, 
    usuario: 'B', 
    tipoReclamo: 'Precios', 
    fecha: '2024-09-11T10:00:00Z', 
    premisa: 'Precios altos en la cafetería', 
    comentario: 'Los precios en la cafetería son muy altos.', 
    imagen: foto,
    estado: 'En revisión' 
  },
  { 
    id: 3, 
    usuario: 'C', 
    tipoReclamo: 'Entrenadores', 
    fecha: '2024-09-12T11:15:00Z', 
    premisa: 'Calidad de entrenadores', 
    comentario: 'La calidad de los entrenadores es baja.', 
    imagen: foto,
    estado: 'Resuelto' 
  },
  { 
    id: 4, 
    usuario: 'D', 
    tipoReclamo: 'Iluminación', 
    fecha: '2024-09-13T18:45:00Z', 
    premisa: 'Iluminación insuficiente en estacionamiento', 
    comentario: 'La iluminación en el estacionamiento es insuficiente.', 
    imagen: foto,
    estado: 'Pendiente' 
  },
  { 
    id: 5, 
    usuario: 'E', 
    tipoReclamo: 'Estacionamiento', 
    fecha: '2024-09-14T20:00:00Z', 
    premisa: 'Falta de espacio de estacionamiento durante eventos', 
    comentario: 'Es difícil encontrar estacionamiento durante los eventos.', 
    imagen: foto,
    estado: 'En revisión' 
  },
];

export const Reclamos = () => {
  const [selectedRubro, setSelectedRubro] = useState('Todos');
  const [reclamos, setReclamos] = useState(false);
  //const usuarioActual = useSelector((state) => state.usuarios.usuarioActual); // Usuario actual
  const isAdmin = useSelector((state) => state.usuarios.admin);
  const username = useSelector((state) => state.usuarios.username);
  const usuarioActual = "A"; // Usuario actual
  const admin = useSelector((state) => state.usuarios.isAdmin); // Verifica si es admin
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const handleAddReclamo = () => {
    navigate('/reclamos/add');
  };

  const handleRubroChange = (e) => {
    setSelectedRubro(e.target.value);
  };

  // Filtrar reclamos por usuario actual y por rubro
 /*const filteredReclamos = reclamos.filter(reclamo => {
    if (admin) {
      // Si es admin, muestra todos los reclamos filtrados por el rubro seleccionado
      const esRubroValido = selectedRubro === 'Todos' || reclamo.tipoReclamo === selectedRubro;
      return esRubroValido;
    } else {
      // Si no es admin, muestra solo los reclamos del usuario actual filtrados por el rubro seleccionado
      const esMiReclamo = reclamo.usuario === usuarioActual; // Solo reclamos del usuario actual
      const esRubroValido = selectedRubro === 'Todos' || reclamo.tipoReclamo === selectedRubro;
      return esMiReclamo && esRubroValido;
    }
  });*/
  const [error, setError] = useState(null);  // Estado para manejar errores

  const actualizarReclamos = async() =>{
    try {

        let url=`misReclamos?username=${username}`
      
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
          }
          
        })
        const data= await response.json()
        console.log(data)
        
     } catch (error) {
        console.error('Error al cargar reclamos:', error);
    } finally {
        setLoading(false);
    }        
  }
  
    useEffect(() => { 
      actualizarReclamos()
    },[])

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
              if (event.data.includes("Error.")){throw new Error()}
              // Deserializar el JSON de productos
              const misReclamos = JSON.parse(event.data);
              console.log(misReclamos)
              // Verificar que la respuesta sea un array de productos
              if (Array.isArray(misReclamos)) {
                misReclamos.forEach((rec)=>{
                const date=""+new Date(rec.fecha)
                rec.fecha=date//.substr(date.indexOf("GMT"))
              })
                  setReclamos(misReclamos);  // Actualizar el estado de productos
              } 
              if (misReclamos.length==0)alert(`${event.data}`)
              setLoading(false);  // Marcar como "cargado" una vez que los productos llegan
          } catch (e) {
              console.error("Error al procesar las Reclamos: ", e);
          
            //  alert(`${event.data}`)
            
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

  if (loading) {
    return (
        <div className="reclamos-loading-overlay">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
}

  return (
    <div className="reclamo-container">
      <h2 className="reclamos-header">{isAdmin ? "Lista de Reclamos" : "Mis Reclamos"}</h2>
      
      {!admin && (
        <button className="reclamo-add-button" onClick={handleAddReclamo}>
          Agregar Reclamo
        </button>
      )}
      
      <div className="reclamo-filter">
        <label htmlFor="rubro">Selecciona el reclamo:</label>
        <select
          id="rubro"
          value={selectedRubro}
          onChange={handleRubroChange}
        >
          <option value="Todos">Mostrar todos</option>
          <option value="Mantenimiento">Llegó menos mercadería de la comprada</option>
          <option value="Precios">Llegaron productos rotos </option>
          <option value="Entrenadores">Producto agotado no repuesto a tiempo</option>
          <option value="Iluminación">Error en la actualización del stock tras la venta</option>
          <option value="Estacionamiento">Cargo erroneo en mi tarjeta</option>
          <option value="Estacionamiento">Compras no aparecen en mi listado</option>
          

        </select>
        
        
      </div>

      <div className="reclamo-scroll">
        {//filteredReclamos.length !== 0 ? (
          //filteredReclamos.map(reclamo => (
            reclamos&&reclamos.map(reclamo => (
            <div key={reclamo.id} className="reclamo-item">
              <p className="reclamo-user">Usuario: {reclamo.usuario}</p>
              <div className="reclamo-tipo">Tipo: {reclamo.tipoReclamo}</div>
              <p className="reclamo-premisa">Estado: {reclamo.estado}</p>
              <p className="reclamo-premisa">{reclamo.fecha}</p>
              <p className="reclamo-premisa">Premisa: {reclamo.premisa}</p>
              <p className="reclamo-comentario">Comentario: {reclamo.comentario}</p>
              {//<img src={reclamo.imagen} alt="Reclamo" className="reclamo-imagen" />
              }
            </div>
          ))
        //) 
        /*: (
          <div className="reclamo-item">
            <div className="reclamo-user">No hay reclamos para el filtro seleccionado</div>
            <p className="reclamo-comment">¡Prueba con otro filtro!</p>
          </div>
        )*/
          }
      </div>
    </div>
  );
};
