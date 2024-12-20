import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Campaña.css';
import { useSelector } from 'react-redux';
import { getToken, isTokenExpired } from '../../utils/auth-utils';

const campaña = {
  id: 1,
  titulo: 'Campaña de donación de sangre',
  descripcion: 'Recolección de 500 donaciones para la comunidad.',
  estado: 'Abierta',
  opcion: ['Aumentar promoción', 'Involucrar más empresas', 'Organizar eventos'],
};

export const Campaña = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const admin = useSelector((state) => state.usuarios.isAdmin);

  const [opcionId, setOpcionId] = useState(null);
  
  const [ganador, setGanador] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const dni = useSelector((state) => state.usuarios.dni);
  const { id } = useParams();
  console.log(id)
  const [campaña, setCampaña] = useState(null);
  
  const [mensaje,setMensaje]=useState(null)

  const [loading, setLoading] = useState(true); // Estado para mostrar el overlay de carga

  const getGanador = async() =>{
    try {
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/campanas/${id}/ganador`, { 
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`
          }
          
        })
        if (response.status==403){
          if (isTokenExpired(getToken())) {
            alert("Venció su sesión. Vuelva a logguearse")
            navigate("/logout")
          }
        }
        const data = await response.json()

        if (response.status==200){
          if (data.length==1){
            setGanador(data[0].titulo)
          }else{//+1 ganador
            //setGanador(data)
          }

        }else{
          setMensaje(data.msj)
        }
    } catch (error) {
        console.error('Error al cargar campaña:', error);
    } finally {
        setLoading(false);
    }
  }

  const cerrarCampaña = async() =>{
    try {
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/campanas/${id}/cerrar`, { 
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}`
          }
          
        })
        if (response.status==403){
          if (isTokenExpired(getToken())) {
            alert("Venció su sesión. Vuelva a logguearse")
            navigate("/logout")
          }
        }
        const data = await response.json()
        alert(`${data.msj} : "${campaña.titulo}"`);
        navigate('/campañas')
        setMensaje(data.msj)
    } catch (error) {
        console.error('Error al cargar campaña:', error);
    } finally {
        setLoading(false);
    }
  }

const handlerVoto = async () => {
  var url = ``;
  
  url = `${process.env.REACT_APP_DOMINIO_BACK}/campanas/${id}/votacion/${opcionId}/usuario/${dni}`
  

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.status==403){
    if (isTokenExpired(getToken())) {
      alert("Venció su sesión. Vuelva a logguearse")
      navigate("/logout")
    }
  }

  if (response.status==200){
    alert(`Has confirmado tu voto por la opción: ${opcionSeleccionada} en la campaña: ${campaña.titulo}`);
    navigate('/campañas'); // Redirige a la página de campañas
  }else{
    const data = await response.json();
    console.log(data)
    setMensaje(data.msj);
    alert(`${data.msj} : "${campaña.titulo}"`);
    navigate('/campañas')
  }
  
}

  const ejecutarFetch = async () => {
    try {
        var url = ``;
        
        url = `${process.env.REACT_APP_DOMINIO_BACK}/campanas/${id}`;
        

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (response.status==403){
          if (isTokenExpired(getToken())) {
            alert("Venció su sesión. Vuelva a logguearse")
            navigate("/logout")
          }
        }
        const data = await response.json();
        console.log(data)
        if (data.msj) {
          setMensaje(data.msj);
        } else {
          setCampaña(data);
        }
    } catch (error) {
        console.error('Error al cargar campaña:', error);
    } finally {
        setLoading(false); 
    }
  }

  useEffect(() => {
    ejecutarFetch().catch((error) => console.error(error));
    getGanador()
  }, []);



  const navigate = useNavigate();

  const handleOpcionClick = (opcion) => {
    setOpcionSeleccionada(opcion.titulo);
    setOpcionId(opcion.id);
    setMostrarConfirmacion(true); // Muestra la confirmación inmediatamente
  };

  const handleDecision = (confirmar) => {
    if (confirmar) {
      handlerVoto()
    } else {
      setMostrarConfirmacion(false); // Cierra la confirmación
      setOpcionSeleccionada(null); // Reinicia la selección
      setOpcionId(null);
    }
  };

  if (loading) {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
}

  return (
    <div className={`campaña-detalle ${mostrarConfirmacion ? 'blur' : ''}`}>

      {admin &&(
        <div>
          {campaña&&campaña.estado=="Abierta"&&<button className="add-campaign-button" onClick={cerrarCampaña}>Cerrar Campaña</button>}
        </div>
      )}
      {campaña&&
        <div className="campaña-card-detalle">
        <h2>{campaña.titulo}</h2>
        <h3>Descripcion: {campaña.descripcion}</h3  >
        <h3>Estado: {campaña.estado}</h3  >
        {campaña.estado=="Cerrada"&&<h3>Ganador: {ganador} </h3  >}
        {!admin?<div className="opciones-votacion">
          {campaña.opciones.map((opcion, index) => (
            <button
              key={index}
              className={`opcion-button ${opcion === opcionSeleccionada ? 'seleccionada' : ''}`}
              onClick={() => handleOpcionClick(opcion)}
            >
              {opcion.titulo}
            </button>
          ))}
        </div>
        :
        <div className="opciones-votacion">
          {campaña.opciones.map((opcion, index) => (
            <button
              key={index}
              className={`opcion-button ${opcion === opcionSeleccionada ? 'seleccionada' : ''}`}
            >
              {opcion.titulo}
            </button>
          ))}
        </div>
        }
      </div>
      }
      {mostrarConfirmacion && (
        <div className="confirmacion-alerta">
          <div className="alerta-tarjeta">
            <p>¿Confirmas tu voto por "{opcionSeleccionada}"?</p>
            <div className="alerta-opciones">
              <button className="alerta-button" onClick={() => handleDecision(true)}>Sí</button>
              <button className="alerta-button alerta-button-no" onClick={() => handleDecision(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
