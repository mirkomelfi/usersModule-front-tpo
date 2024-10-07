import { useRef, useState } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useNavigate } from "react-router-dom";
import ImagenPost from "../Imagen/ImagenPOST";
import './Post.css'; 
import { getToken, isTokenExpired } from "../../utils/auth-utils";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export const DeportesPost = () => {
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [idDeporte, setIdDeporte] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada

    const datForm = useRef(); // Referencia al formulario
    const navigate = useNavigate();

     // Manejar el cambio de la fecha seleccionada
     const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const consultarForm = async (e) => {
        e.preventDefault();

        const datosFormulario = new FormData(datForm.current); 
        const deporte = Object.fromEntries(datosFormulario); 

        // Formatear la fecha seleccionada antes de enviar al backend
        deporte.fecha = format(selectedDate, 'dd-MM-yyyy');
        
        // Validación sencilla para campos vacíos
        if (!deporte.nombre && !deporte.descripcion) {
            setMensaje("No se ingresaron valores");
        } else {
            var url = `${process.env.REACT_APP_DOMINIO_BACK}/admin/actividades`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`                    
                },
                body: JSON.stringify(deporte),
            });
            if (response.status==403){
                if (isTokenExpired(getToken())) {
                  alert("Venció su sesión. Vuelva a logguearse")
                  navigate("/logout")
                }
              }
            if (response.status === 200) {
                const data = await response.json();
                setIdDeporte(data.id);
                setMensaje(data.msj + " Puede agregar imágenes si lo desea");
            } else {
                const data = await response.json();
                setError(true);
                setMensaje(data.msj);
            }
            e.target.reset(); // Limpiar el formulario
        }
    };

    return (
        <div className="post-container"> 
            {!mensaje ? (
                <div className="post-card">
                    <h2 className="post-title">Crear nuevo deporte</h2>
                    <form onSubmit={consultarForm} ref={datForm} className="post-form">
                        <input
                            type="text"
                            className="post-input"
                            placeholder="Nombre"
                            name="nombre"
                        />
                        <textarea
                            className="post-textarea"
                            placeholder="Descripción"
                            name="descripcion"
                        />
                        <input
                            type="text"
                            className="post-input"
                            placeholder="Valor mensual"
                            name="valor"
                        />
                        <input
                            type="text"
                            className="post-input"
                            placeholder="Profesor a cargo"
                            name="profesor"
                        />

                        {/* Componente para seleccionar la fecha */}
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="post-input"
                            placeholderText="Seleccionar fecha"
                        />

                    </form>
                    <button type="submit" className="post-button">Crear deporte</button>
                </div>
            ) : (!error ? (
                <div>
                    <Mensaje msj={mensaje} />
                    <ImagenPost actividad={true} id={idDeporte} />
                </div>
            ) : (
                <Mensaje msj={mensaje} />
            ))}
        </div>
    );
};
