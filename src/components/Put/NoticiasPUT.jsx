import { useRef, useState } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useNavigate, useParams } from "react-router-dom";
import ImagenPost from "../Imagen/ImagenPOST";
import './PUT.css'; // Reutilizando Post.css

export const NoticiasPut = () => {

    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [idNoticia, setIdNoticia] = useState(null);
    const datForm = useRef(); // Referencia al formulario

    const {id}=useParams()

    const navigate = useNavigate();

    const consultarForm = async (e) => {
        //Consultar los datos del formulario
        e.preventDefault();

        const datosFormulario = new FormData(datForm.current); // Pasar de HTML a Objeto Iterable
        const noticia = Object.fromEntries(datosFormulario); // Pasar de objeto iterable a objeto simple
        if (noticia.titulo==""){
            noticia.titulo=null
        }
        if (noticia.descripcion==""){
            noticia.descripcion=null
        }
        // Validación básica
        if (!noticia.titulo && !noticia.descripcion) {
            setMensaje("No se ingresaron valores");
        } else {
            const url = `${process.env.REACT_APP_DOMINIO_BACK}/admin/noticias/${id}`;

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(noticia),
            });

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
        <div className="put-container"> {/* Reutilizando clase de contenedor */}
            {!mensaje ? (
                <div className="put-card"> {/* Reutilizando clase de tarjeta */}
                    <h2 className="put-title">Crear nueva noticia</h2> {/* Reutilizando clase de título */}
                    <h3 className="">Lo que no complete, no se actualizara. No se permiten campos vacíos.</h3>
                    <form onSubmit={consultarForm} ref={datForm} className="put-form">
                        <input
                            type="text"
                            className="put-input"
                            placeholder="Título"
                            name="titulo"
                        />
                        <textarea
                            className="put-textarea"
                            placeholder="Descripción"
                            name="descripcion"
                        />
                        <button type="submit" className="put-button">Crear noticia</button> {/* Reutilizando clase de botón */}
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
