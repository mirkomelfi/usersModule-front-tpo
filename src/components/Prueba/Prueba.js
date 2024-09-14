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
  height: 80vh;
  width: 90vw;
  margin: 0 auto;
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

// Lista de eventos de ejemplo
const defaultEvents = [
  {
    title: 'Evento 1',
    start: new Date('2024-09-15T10:22:00'),
    end: new Date('2024-09-15T11:22:00') // Duración de 1 hora
  },
  {
    title: 'Evento 2',
    start: new Date('2024-09-15T12:22:00'),
    end: new Date('2024-09-15T13:22:00') // Duración de 1 hora
  }
];

const EventsCalendar = () => {
  const [events, setEvents] = useState(defaultEvents); // Usar eventos de ejemplo
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null); // Guardar el slot seleccionado

  useEffect(() => {
    // Función para obtener los eventos desde la API y mostrarlos en el Calendario
    const fetchEvents = async () => {
      try {
        const dniSolicitante = 222;
        const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/turnos/${dniSolicitante}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const formattedEvents = data.map(event => ({
            // en vez de ID, deberia ser con quien me reuno. modificar TURNODTO en el back
          title: `Turno con ID ${event.id}`,
          start: new Date(event.fechaHora),
          end: new Date(new Date(event.fechaHora).getTime() + 60 * 60 * 1000)
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
      const dniSolicitante = 111;
      const dniSolicitado = 222;
      const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/turnos/${dniSolicitante}/${dniSolicitado}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEvent.title,
          fechaHora: new Date(newEvent.start).toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents([...events, {
          title: newEvent.title,
          start: new Date(newEvent.start),
          end: new Date(new Date(newEvent.start).getTime() + 60 * 60 * 1000)
        }]);
        setNewEvent({ title: '', start: '' });
        setIsFormVisible(false);
        setSelectedSlot(null); // Limpiar el slot seleccionado
        alert('Evento creado con éxito');
      } else {
        const data = await response.json();
        alert(data.msj || 'Error al crear el evento');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el evento');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'start') {
        // Convertir el valor a una fecha
        const newStart = new Date(value);
        // Establecer los minutos en 0
        newStart.setMinutes(0);
        setNewEvent({
          ...newEvent,
          [name]: newStart.toISOString() // Convertir de nuevo a string
        });
      } else {
        setNewEvent({
          ...newEvent,
          [name]: value
        });
      }
  };

  const validateDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const validateTimeSlot = (startDate) => {
    const hour = startDate.getHours();
    return hour >= 8 && hour < 18;
  };

  const checkIfTimeSlotIsOccupied = (start, end) => {
    return events.some(event => 
      (new Date(event.start) < end && start < new Date(event.end))
    );
  };

  const handleSlotSelection = async (slotInfo) => {
    const { start } = slotInfo;
    const end = new Date(start);
    end.setHours(end.getHours() + 1); // Duración de 1 hora

    if (validateDate(start) && validateTimeSlot(start)) {
      if (!checkIfTimeSlotIsOccupied(start, end)) {
        setSelectedSlot({ start, end });
        setNewEvent({
          title: '',
          start: start.toISOString()
        });
        setIsFormVisible(true);
      } else {
        alert('Este horario ya está ocupado.');
      }
    } else {
      alert('Selecciona una fecha válida entre 8:00 y 18:00 y solo en el día de hoy o fechas futuras.');
    }
  };

  return (
    <CalendarContainer>
      <CustomCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelection} // Manejar selección de horario
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
        {isFormVisible ? 'Cerrar formulario' : 'Agregar reunión'}
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
              Seleccione fecha y hora:
              <input
                type="datetime-local"
                name="start"
                value={moment(newEvent.start).format('YYYY-MM-DDTHH:00')} // Siempre termina en :00
                
                onChange={handleChange}
                required
                min={moment().format('YYYY-MM-DDTHH:MM')}
              />
            </label>
          </div>
          <button type="submit">Crear reunión</button>
        </form>
      )}
    </CalendarContainer>
  );
};

export default EventsCalendar;
