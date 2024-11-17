import React, { useEffect, useState } from 'react';
import './Deporte.css';
import imagenDeporte from "./partido.jpg";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Deporte = () => {
  const { id } = useParams();

  // Datos hardcodeados (JSON simulado)
  const deportesData = [
    {
      id: '1',
      nombre: 'Fútbol',
      descripcion: 'Entrenamientos de fútbol para todas las edades.',
      detalles: 'Entrenamientos semanales de fútbol para todas las categorías, desde niños hasta adultos.',
      direccion: 'Calle del Deporte, 123',
      horarios: 'Lunes a Viernes, 18:00 - 20:00',
      profesores: ['Juan Pérez', 'María García'],
      calendario: [
        { dia: 'Lunes', horario: '18:00 - 20:00' },
        { dia: 'Miércoles', horario: '18:00 - 20:00' },
        { dia: 'Viernes', horario: '18:00 - 20:00' },
      ]
    },
    {
      id: '2',
      nombre: 'Básquetbol',
      descripcion: 'Academia de básquetbol para jóvenes y adultos.',
      detalles: 'Clases de básquetbol con entrenadores certificados.',
      direccion: 'Avenida Deportes, 45',
      horarios: 'Martes y Jueves, 17:00 - 19:00',
      profesores: ['Carlos Díaz', 'Lucía López'],
      calendario: [
        { dia: 'Martes', horario: '17:00 - 19:00' },
        { dia: 'Jueves', horario: '17:00 - 19:00' },
      ]
    }
  ];


  const admin = useSelector((state) => state.usuarios.isAdmin);
  const [deporte, setDeporte] = useState(null);
  
  const [mensaje,setMensaje]=useState(null)

  const [loading, setLoading] = useState(true);

  const eliminar = async () => {
    try{
      const response = await fetch(
        `${process.env.REACT_APP_DOMINIO_BACK}/admin/actividades/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          // Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = await response.json();
        if (data.msj) {
          setMensaje(data.msj);
        }
      return;
    } catch (error) {
      console.error('Error al cargar deporte:', error);
    } finally {
      setLoading(false);
    }
  };



  const ejecutarFetch = async () => {
    try{
        var url = ``;
        
        url = `${process.env.REACT_APP_DOMINIO_BACK}/actividades/${id}`;
    
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${getToken()}`,
          },
        }
    );

      const data = await response.json();
      console.log(data)
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setDeporte(data);
      }

  } catch (error) {
    console.error('Error al cargar noticias:', error);
  } finally {
    setLoading(false);
  }
  }

  useEffect(() => {
    ejecutarFetch().catch((error) => console.error(error));
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
    <div className="deporte-container">
      <header className="deporte-header">
        <h1>{deporte?.nombre || 'Nombre del Deporte'}</h1>
      </header>

      <div className="clearfix">
        <div className="main-content">
          <div className="deporte-imagen">
            <img src={imagenDeporte} alt="Imagen del deporte" />
          </div>

          <div className="deporte-introduccion">
            <p>
              {deporte?.descripcion || 'Descripción breve del deporte o academia que se ofrece.'}
            </p>
          </div>

          <div className="deporte-contenido">
            <p>
              {deporte?.detalles || 'Detalles adicionales sobre la academia, entrenamientos, horarios, y cualquier información importante para los interesados.'}
            </p>
          </div>

          {/* Sección de Calendario */}
          <div className="deporte-calendario">
            <h2>Disponibilidad</h2>
            <table className="calendario-tabla">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Horario</th>
                </tr>
              </thead>
              <tbody>
                {deporte?.calendario?.map((dia, index) => (
                  <tr key={index}>
                    <td>{dia.dia}</td>
                    <td>{dia.horario}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan="2">No hay horarios disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sidebar">
          <h2>Información del Deporte</h2>
          <p><strong>Dirección:</strong> {deporte?.direccion || 'Dirección del lugar.'}</p>
          <p><strong>Profesores:</strong> {deporte?.profesores?.join(', ') || 'Lista de profesores o entrenadores.'}</p>
        </div>
      </div>
    </div>
  );
};
