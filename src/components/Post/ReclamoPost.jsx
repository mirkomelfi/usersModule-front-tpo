import React, { useEffect, useState } from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth-utils';
import { useSelector } from 'react-redux';

export const ReclamosPost = () => {
  const usuarioActual = "A"; // Usuario logueado, en este caso "A"
  
  const [tipoReclamo, setTipoReclamo] = useState('');
  const [premisa, setPremisa] = useState('');
  const [comentario, setComentario] = useState('');
  const [idPedido, setIdPedido] = useState(0);
  var username= useSelector((state) => state.usuarios.username)
  const [tiposReclamo, setTiposReclamo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lista de tipos de reclamo (puedes agregar más tipos)
  const tiposDeReclamo = [
    "Llegó menos mercadería de la comprada",
    "Llegaron productos rotos",
    "Producto agotado no repuesto a tiempo",
    "Error en la actualización del stock tras la venta",
    "Cargo erróneo en mi tarjeta",
    "Compras no aparecen en mi listado",
  ];

  // Manejar cambios en los inputs
  const handleTipoReclamoChange = (e) => setTipoReclamo(e.target.value);
  const handlePremisaChange = (e) => setPremisa(e.target.value);
  const handleComentarioChange = (e) => setComentario(e.target.value);
  const handlePedidoChange = (e) => setIdPedido(e.target.value);

  // Función para reiniciar el formulario
const resetFormulario = () => {
  setTipoReclamo('');
  setPremisa('');
  setComentario('');
  setIdPedido(0);
};

  // Enviar el reclamo
  const handleSubmit = () => {
    if (!tipoReclamo || !premisa || !comentario) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const nuevoReclamo = {
      usuario: username,
      tipoReclamo,
      premisa,
      comentario,
      idPedido
    };

    enviarReclamo(nuevoReclamo)

    console.log('Reclamo enviado:', nuevoReclamo);
    // Aquí podrías agregar la lógica para guardar el reclamo, como una llamada a la API.

    // Vaciar el formulario
    resetFormulario();
  };

  const enviarReclamo = async(reclamo) =>{
    try {

        let url=`finalizarReclamo`
      
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
          },
          body:JSON.stringify(reclamo)
          
        })
        const data= await response.json()
        console.log(data)
        
     } catch (error) {
        console.error('Error al cargar noticias:', error);
    } finally {
        //setLoading(false);
    }        
  }


  useEffect(() => {
    // Conectar al WebSocket en el endpoint /ws
    const socket = new WebSocket('ws://localhost:8080/ws');
    console.log(socket)
    // Al abrir la conexión WebSocket
    socket.onopen = () => {
        console.log("Conexión WebSocket establecida.");
        // Enviar un mensaje al servidor si es necesario (por ejemplo, para pedir productos)
        socket.send("Solicitar tipos de reclamo ");
    };
   console.log(socket)
    // Manejar el mensaje recibido del servidor
    socket.onmessage = (event) => {
        console.log("Mensaje recibido: ", event.data);
        try {
            // Deserializar el JSON de productos
            const tipoReclamoList = JSON.parse(event.data);
            
            // Verificar que la respuesta sea un array de productos
            if (Array.isArray(tipoReclamoList)) {
              setTiposReclamo(tipoReclamoList);  // Actualizar el estado de productos
            } else {
                throw new Error("Los tipos de reclamo no están en el formato esperado.");
            }

            setLoading(false);  // Marcar como "cargado" una vez que los productos llegan
        } catch (e) {
            console.error("Error al procesar los tipos de reclamo: ", e);
            setError("Error al recibir los  tipos de reclamo.");  // Mostrar un mensaje de error
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






  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Crear Nuevo Reclamo</h2>
        
        {/* Campo Tipo de Reclamo (Dropdown) */}
        <select
          className="post-select"
          value={tipoReclamo}
          onChange={handleTipoReclamoChange}
        >
          <option value="">Selecciona un tipo de reclamo</option>
          {tiposDeReclamo.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        {/* Campo Premisa */}
        <input
          type="text"
          className="post-input"
          placeholder="Premisa del Reclamo"
          value={premisa}
          onChange={handlePremisaChange}
        />

        {/* Campo Comentario */}
        <textarea
          className="post-textarea"
          placeholder="Comentario"
          value={comentario}
          onChange={handleComentarioChange}
        />
        {/* Campo Premisa */}
        <input
          type="number"
          className="post-input"
          placeholder="ID del Pedido (si lo hubiere)"
          value={idPedido}
          onChange={handlePedidoChange}
        />

        {/* Botón de Enviar Reclamo */}
        <button className="post-button" onClick={handleSubmit}>
          Enviar Reclamo
        </button>
      </div>
    </div>
  );
};
