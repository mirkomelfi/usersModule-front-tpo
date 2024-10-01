import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import './ForoFeedback.css';
import { getToken } from '../../utils/auth-utils';
import { useNavigate } from 'react-router-dom';

const feedbacks = [
  { id: 1, user: 'Juan Pérez', comment: 'Muy buena la atención en boletería. Rápido y eficiente.', date: '2024-09-01', subject: 'Atención' },
  { id: 2, user: 'Ana Gómez', comment: 'Los tiempos de espera para ingresar al estadio podrían mejorar.', date: '2024-09-02', subject: 'Tiempos de espera' },
  { id: 3, user: 'Carlos López', comment: 'La nueva tienda del club está increíble, ¡muy buena experiencia de compra!', date: '2024-09-03', subject: 'Tienda del club' },
  { id: 4, user: 'María Fernández', comment: 'Tuve problemas para acceder a mi cuenta de socio, espero puedan solucionarlo.', date: '2024-09-04', subject: 'Sistema de socios' },
  { id: 5, user: 'Pedro Sanchez', comment: 'Sería genial que incluyeran más productos de merch del equipo.', date: '2024-09-05', subject: 'Variedad de productos' },
];

export const ForoFeedback = () => {
  const [selectedSubject, setSelectedSubject] = useState('Todos');

  const dni = useSelector((state) => state.usuarios.dni);

  const admin = useSelector((state) => state.usuarios.isAdmin);

  const [listaFeedback,setListaFeedback]= useState([]);
  const [mensaje,setMensaje]= useState(null);
  const navigate = useNavigate(); // Hook para navegar
  const [selectedRubro, setSelectedRubro] = useState(0);

  const [listaRubros,setListaRubros]= useState([]);

  //falta desarrollar filtros en el back
  const getRubros = async() =>{

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

  const ejecutarFetch = async() =>{

    let url;
    if (!admin){
      url=`misFeedbacks/${dni}?rubro=${selectedRubro}`
    }else{
      url=`admin/feedbacks?rubro=${selectedRubro}`
    }

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
      }
      
    })
 
    const data = await response.json()
    if (data.msj){
      
      setListaFeedback([])
      setMensaje(data.msj)
    }else{
      console.log(data)
      setListaFeedback(data)
    }
    }



  useEffect(() => { 
    ejecutarFetch()
    .catch(error => console.error(error))

  },[selectedRubro])

  useEffect(() => { 
    getRubros()
    .catch(error => console.error(error))

  },[])


  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleAddFeedback = () => {
    navigate('/feedback');
  };

  const filteredFeedbacks = selectedSubject === 'Todos'
    ? feedbacks
    : feedbacks.filter(feedback => feedback.subject === selectedSubject);

  return (
    <div className="foro-container">
      {admin?<h2>Lista de Feedback</h2>:<h2>Mis Feedbacks</h2>}
      
      {!admin&&
        <button className="add-feedback-button" onClick={handleAddFeedback}>
        Agregar Feedback
      </button>
      }
      {/*
        <button className="add-feedback-button" onClick={handleAddFeedback}>
        Eliminar Feedback
      </button>*/
      }
      <div className="foro-filter">
      <label htmlFor="subject">Selecciona el asunto:</label>
        <select
          id="subject"
          value={selectedRubro}
          onChange={(e) => setSelectedRubro(e.target.value)}
          required
        >
          <option value={0}>
            Mostrar todos
          </option>
          {listaRubros.map((subject, index) => (
            <option key={index} value={subject.id}>
              {subject.descripcion}
            </option>
          ))}
        </select>
      </div>
      {listaFeedback.length!=0?<div className="foro-scroll">
        {listaFeedback.map(feedback => (
          <div key={feedback.id} className="foro-item">
            
            <div className="foro-user">{feedback.nombreAutor} {feedback.apellidoAutor}    -    DNI: {feedback.dniAutor}</div>
            <div className="foro-date">{feedback.fechaPublicacion}</div>
            <p className="foro-comment">{feedback.descripcion}</p>
            <p className="foro-comment">{feedback.rubro}</p>
          </div>
        ))}
      </div>:
      <div className="foro-scroll">
      
        <div className="foro-item">
          
          <div className="foro-user">No hay feedbacks para el asunto filtrado</div>
          <p className="foro-comment">¡Pruebe con otro!</p>
        </div>
      </div>
      }
    </div>
  );
};
