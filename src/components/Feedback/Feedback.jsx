import React, { useEffect, useState, useRef } from 'react';
import './Feedback.css';
import { getToken } from '../../utils/auth-utils';
import { useSelector } from 'react-redux';

export const Feedback = () => {
  const dni = useSelector((state) => state.usuarios.dni);
  const admin = useSelector((state) => state.usuarios.isAdmin);

  const datForm = useRef();
  const [selectedRubro, setSelectedRubro] = useState('');
  const [comment, setComment] = useState('');


  const [listaRubros,setListaRubros]= useState([]);
  const [mensaje,setMensaje]= useState(null);

  const ejecutarFetch = async() =>{

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/rubros`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${getToken()}`
      }
      
    })

    const data = await response.json()
    console.log(data)
    if (data.msj){
      setMensaje(data.msj)
    }else{
      setListaRubros(data)
    }
  }

  const enviarFeedback = async(feedback) =>{

    const feedbackObject={descripcion:feedback}

    console.log(selectedRubro)

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/feedbacks/${dni}/rubro/${selectedRubro}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      },
      body:JSON.stringify(feedbackObject)
      
    })

    const data = await response.json()
    console.log(data)
    if (data.msj){
      setMensaje(data.msj)
    }else{
      setListaRubros(data)
    }
  }

  const addRubro = async(rubro) =>{
    console.log(rubro)

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/rubros`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      },
      body:JSON.stringify(rubro)
      
    })

    const data = await response.json()
    console.log(data)
    if (data.msj){
      setMensaje(data.msj)
    }
  }

  useEffect(() => { 
    if (!admin) ejecutarFetch()
    .catch(error => console.error(error))

  },[])


  const consultarFormRubro = async (e) => {
    e.preventDefault();
    console.log(e)
    const datosFormulario = new FormData(datForm.current);
    const rubro = Object.fromEntries(datosFormulario);
    console.log(rubro)
     addRubro(rubro)

    e.target.reset(); // Resetear el formulario
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío del feedback (como enviarlo a un backend)
    console.log('Asunto:', selectedRubro);
    console.log('Comentario:', comment);

    enviarFeedback(comment)

    // Reseteamos el formulario
    setSelectedRubro('');
    setComment('');


  };

  return (
    <div className="feedback-container">
  {admin?<div>
    
    {//<button className="perfil-btn perfil-btn-danger"  onClick={() => addRubro()}>Añadir nuevo rubro</button>
    }
    <form onSubmit={consultarFormRubro} ref={datForm}>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Asunto del nuevo rubro
          </label>
          <input type="text" className="form-control" name="descripcion" />
        </div>
      <button type="submit" className="submit-button">Añadir nuevo rubro</button>
    </form>
    </div>
:
    <div>
    
      <h2>Dejanos tu comentario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Selecciona el asunto:</label>
        <select
          id="subject"
          value={selectedRubro}
          onChange={(e) => setSelectedRubro(e.target.value)}
          required
        >
          <option value="" disabled>
            Elige un asunto
          </option>
          {listaRubros.map((subject, index) => (
            <option key={index} value={subject.id}>
              {subject.descripcion}
            </option>
          ))}
        </select>

        <label htmlFor="comment">Tu comentario:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="6"
          placeholder="Escribe tu comentario aquí"
          required
        ></textarea>

        <button type="submit" className="submit-button">Enviar Comentario</button>
      </form>
    </div>}
    </div>
  );
};
