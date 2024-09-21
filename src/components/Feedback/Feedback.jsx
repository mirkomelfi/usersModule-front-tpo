import React, { useEffect, useState } from 'react';
import './Feedback.css';

export const Feedback = () => {

const dni=111

  const [selectedRubro, setSelectedRubro] = useState('');
  const [comment, setComment] = useState('');


  const [listaRubros,setListaRubros]= useState([]);
  const [mensaje,setMensaje]= useState(null);

  const ejecutarFetch = async() =>{

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/rubros`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${getToken()}`
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

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/feedbacks/${dni}/rubro/${selectedRubro}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${getToken()}`
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

  useEffect(() => { 
    ejecutarFetch()
    .catch(error => console.error(error))

  },[])
  useEffect(() => { 
   console.log(selectedRubro)

  },[selectedRubro])

/*
  const subjects = [
    'Sugerencias para el club',
    'Problemas con el pago',
    'Información sobre membresías',
    'Reclamo por productos',
    'Consulta sobre eventos',
    'Reserva de instalaciones',
    'Acceso a beneficios',
    'Consulta sobre actividades deportivas',
    'Soporte técnico en la web',
    'Otros temas',
  ];
*/

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
            <option key={index} value={subject.idRubro}>
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
    </div>
  );
};
