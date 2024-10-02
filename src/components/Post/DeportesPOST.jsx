import { useRef, useState } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useNavigate } from "react-router-dom";
import ImagenPost from "../Imagen/ImagenPOST";
import './Post.css'; 
import { getToken, isTokenExpired } from "../../utils/auth-utils";

export const DeportesPost = () => {
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [idDeporte, setIdDeporte] = useState(null);

    const datForm = useRef(); // Referencia al formulario
    const navigate = useNavigate();

    const consultarForm = async (e) => {
        e.preventDefault();

        const datosFormulario = new FormData(datForm.current); 
        const deporte = Object.fromEntries(datosFormulario); 
        
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
                <div className="post-card"> {/* Reutilizando clase de tarjeta */}
                    <h2 className="post-title">Crear nuevo deporte</h2> {/* Reutilizando clase de título */}
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
                        <button type="submit" className="post-button">Crear deporte</button>
                    </form>
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
