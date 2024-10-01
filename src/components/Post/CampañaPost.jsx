import React, { useState } from 'react';
import './Post.css';
import { getToken } from '../../utils/auth-utils';

export const CampañaPost = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Abierta');
  const [opciones, setOpciones] = useState([]);
  const [nuevaOpcion, setNuevaOpcion] = useState('');
  
  const [mensaje, setMensaje] = useState(null);

  const ejecutarFetch = async() =>{

    const nuevaCampaña = {
      titulo,
      descripcion,
      opciones,
    };
    console.log(nuevaCampaña)

    const url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/campanas`


  const response= await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(nuevaCampaña)
  })
if (response.status==200){
  console.log('Nueva campaña creada:', nuevaCampaña);
  
 alert('Nueva campaña creada');
  // Aquí puedes enviar la campaña al backend o hacer otras acciones

  setTitulo('');
  setDescripcion('');
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
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Crear nueva campaña</h2>
        <div className="post-form">
          <input
            type="text"
            className="post-input"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            className="post-textarea"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <select
            className="post-select"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Abierta">Abierta</option>
          </select>
          <div className="post-opciones">
            <input
              type="text"
              className="post-input"
              placeholder="Nueva opción"
              value={nuevaOpcion}
              onChange={(e) => setNuevaOpcion(e.target.value)}
            />
            <button className="agregar-opciones-button " onClick={agregarOpcion}>
              Agregar opción
            </button>
          </div>
          {opciones.length!=0&&<ul className="post-options">
            {opciones.map((opcion, index) => (
              <li key={index} className="post-option">{opcion.titulo}</li>
            ))}
          </ul>}
          <button className="post-button" onClick={ejecutarFetch}>
            Subir campaña
          </button>
        </div>
      </div>
    </div>
  );
};
