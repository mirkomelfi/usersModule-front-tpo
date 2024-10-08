import { useRef, useState } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useNavigate } from "react-router-dom";
import ImagenPost from "../Imagen/ImagenPOST";
import './Post.css'; // Reutilizando Post.css
import { getToken, isTokenExpired } from "../../utils/auth-utils";

export const NoticiasPost = () => {

    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [idNoticia, setIdNoticia] = useState(null);
    const datForm = useRef(); // Referencia al formulario

    const navigate = useNavigate();

    const consultarForm = async (e) => {
        //Consultar los datos del formulario
        e.preventDefault();

        const datosFormulario = new FormData(datForm.current); // Pasar de HTML a Objeto Iterable
        const noticia = Object.fromEntries(datosFormulario); // Pasar de objeto iterable a objeto simple
        
        // Validación básica
        if (!noticia.titulo && !noticia.descripcion) {
            setMensaje("No se ingresaron valores");
        } else {
            const url = `${process.env.REACT_APP_DOMINIO_BACK}/admin/noticias`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(noticia),
            });
            if (response.status==403){
                if (isTokenExpired(getToken())) {
                  alert("Venció su sesión. Vuelva a logguearse")
                  navigate("/logout")
                }
              }
            if (response.status === 200) {
                const data = await response.json();
                setIdNoticia(data.id);
                setMensaje(data.msj + " Puede agregar imágenes si lo desea");
            } else {
                const data = await response.json();
                setMensaje(data.msj);
            }

            e.target.reset(); // Limpiar el formulario
        }
    };

    return (
        <div className="post-container"> {/* Reutilizando clase de contenedor */}
            {!mensaje ? (
                <div className="post-card"> {/* Reutilizando clase de tarjeta */}
                    <h2 className="post-title">Crear nueva noticia</h2> {/* Reutilizando clase de título */}
                    <form onSubmit={consultarForm} ref={datForm} className="post-form">
                        <input
                            type="text"
                            className="post-input"
                            placeholder="Título"
                            name="titulo"
                        />
                        <textarea
                            className="post-textarea"
                            placeholder="Descripción"
                            name="descripcion"
                        />
                        <button type="submit" className="post-button">Crear noticia</button> {/* Reutilizando clase de botón */}
                    </form>
                </div>
            ) : (!error ? (
                <div>
                    <Mensaje msj={mensaje} />
                    <ImagenPost noticia={true} id={idNoticia} />
                </div>
            ) : (
                <Mensaje msj={mensaje} />
            ))}
        </div>
    );
};
