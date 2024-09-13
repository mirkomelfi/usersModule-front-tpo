import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

// Configurar el localizador para react-big-calendar usando moment
const localizer = momentLocalizer(moment);

// Estilos para el contenedor del calendario
const CalendarContainer = styled.div`
  height: 80vh; /* Ajuste de altura para el contenedor */
  width: 90vw;  /* Ajuste de ancho para el contenedor */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

// Estilos adicionales para el calendario
const CustomCalendar = styled(Calendar)`
  .rbc-header {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }
  .rbc-day-bg {
    background-color: #f8f9fa;
  }
  .rbc-event {
    background-color: #007bff;
    color: white;
    border-radius: 4px;
  }
  .rbc-selected {
    background-color: #0056b3 !important;
  }
`;

// Función para manejar la selección de un rango de tiempo
const handleSelectSlot = async (slotInfo) => {
  const { start } = slotInfo;
  const end = new Date(start);
  end.setHours(end.getHours() + 1); // Establecer la duración del turno a 1 hora

  // Aquí puedes hacer la solicitud HTTP a tu backend para reservar el turno
  try {
    const response = await fetch('/api/reservar-turno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: start.toISOString(),
        end: end.toISOString()
      }),
    });

    if (response.ok) {
      alert('Turno reservado con éxito');
    } else {
      alert('Error al reservar el turno');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al reservar el turno');
  }
};

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Función para obtener los eventos desde la API
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/turnos');
        const data = await response.json();
        // Transformar los datos del backend al formato esperado por react-big-calendar
        const formattedEvents = data.map(event => ({
          title: `Turno con ${event.conUsuario.nombre}`, // Asumiendo que conUsuario tiene un nombre
          start: new Date(event.start), // Convertir el Timestamp a objeto Date
          end: new Date(event.end) // Convertir el Timestamp a objeto Date
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEvent.title,
          start: new Date(newEvent.start).toISOString(),
          end: new Date(newEvent.end).toISOString()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Actualizar la lista de eventos
        setEvents([...events, {
          title: newEvent.title,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end)
        }]);
        setNewEvent({ title: '', start: '', end: '' });
        setIsFormVisible(false);
        alert('Evento creado con éxito');
      } else {
        alert('Error al crear el evento');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el evento');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  return (
    <CalendarContainer>
      <CustomCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot} // Manejar selección de horario
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        }}
      />
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Cerrar formulario' : 'Agregar evento'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Inicio:
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Fin:
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Crear Evento</button>
        </form>
      )}
    </CalendarContainer>
  );
};

export default EventsCalendar;
