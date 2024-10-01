import React, { useState, useEffect } from 'react';
import './PUT.css';
import { useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth-utils';

export const CampañaPut = () => {
  const [titulo, setTitulo] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [estado, setEstado] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [nuevaOpcion, setNuevaOpcion] = useState('');
  
  const {id}=useParams()

  const [mensaje, setMensaje] = useState(null);

  // Campañas hardcodeadas  
  const [campañaSeleccionada, setCampañaSeleccionada] = useState(null); // Campaña seleccionada para editar
  const [campañasHardcoded, setCampañasHardcoded] = useState([]); // Campañas hardcodeadas
  const campañas = [
    {
      id: 1,
      titulo: "Campaña Navidad",
      descripcion: "Campaña para Navidad 2024.",
      estado: "Abierta",
      opciones: [{ titulo: "Regalos" }, { titulo: "Descuentos" }]
    },
    {
      id: 2,
      titulo: "Campaña Verano",
      descripcion: "Promociones para el verano.",
      estado: "Abierta",
      opciones: [{ titulo: "Ropa" }, { titulo: "Accesorios" }]
    },
    {
      id: 3,
      titulo: "Campaña Black Friday",
      descripcion: "Descuentos para Black Friday.",
      estado: "Cerrada",  
      opciones: [{ titulo: "Electrónica" }, { titulo: "Hogar" }]
    },
  ];

  // Este efecto carga las campañas hardcodeadas al estado cuando se monta el componente
  useEffect(() => {
    setCampañasHardcoded(campañas);
  }, []);

  // Función para manejar la selección de campaña en el dropdown
  const handleCampañaChange = (e) => {
    const campañaId = parseInt(e.target.value);
    const campaña = campañasHardcoded.find(c => c.id === campañaId);
    setCampañaSeleccionada(campaña);

    // Actualizamos los valores del formulario con la campaña seleccionada
    setTitulo(campaña.titulo);
    setDescripcion(campaña.descripcion);
    setOpciones(campaña.opciones);
  };



  const ejecutarFetch = async() =>{

    const nuevaCampaña = {
      titulo,
      descripcion,
      opciones,
    };
    console.log(nuevaCampaña)

    const url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/campanas/${id}`


  const response= await fetch(url, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(nuevaCampaña)
  })
if (response.status==200){
  console.log('Nueva campaña creada:', nuevaCampaña);
  // Aquí puedes enviar la campaña al backend o hacer otras acciones

  setTitulo(null);
  setDescripcion(null);
  setOpciones([]);
}
      const data = await response.json()
      console.log(data.msj)
      setMensaje(data.msj)

}

  // Función para agregar una nueva opción a la lista
  const agregarOpcion = () => {
    
    
    const opcion={
      titulo:nuevaOpcion
    }
    const newArray= opciones
    newArray.push(opcion)
    setOpciones(newArray);
    setNuevaOpcion(''); // Limpiar el input después de agregar
    
    console.log(opciones)
  };



  return (
    <div className="put-container">
      <div className="put-card">
        <h2 className="put-title">Actualizar campaña</h2>

          <div className="put-form">
            <input
              type="text"
              className="put-input"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <textarea
              className="put-textarea"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {/* Dropdown para seleccionar el estado 
            <select
              className="put-select"
              value={estado} // Estado actual de la campaña
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Abierta">Abierta</option>
              <option value="Cerrada">Cerrada</option>
            </select>
*/}
            <div className="put-opciones">
              <input
                type="text"
                className="put-input"
                placeholder="Nueva opción"
                value={nuevaOpcion}
                onChange={(e) => setNuevaOpcion(e.target.value)}
              />
              <p>IMPORTANTE: Si agrega opciones se reiniciaran todos los votos.</p>
              <button className="put-agregar-opciones-button" onClick={agregarOpcion}>
                Agregar opción
              </button>
            </div>

            {opciones.length !== 0 && (
              <ul className="put-options">
                {opciones.map((opcion, index) => (
                  <li key={index} className="put-option">{opcion.titulo}</li>
                ))}
              </ul>
            )}

            <button className="put-button" onClick={ejecutarFetch}>
              Actualizar campaña
            </button>
          </div>

      </div>
    </div>
  );
};
