import { useRef, useState, useEffect  } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { useNavigate, useParams } from "react-router-dom";
import ImagenPost from "../Imagen/ImagenPOST";
import './PUT.css'; 

export const UsuariosPut = () => {
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [dniUsuario, setDni] = useState(null);

    const {dni}=useParams()

    const datForm = useRef(); // Referencia al formulario
    const navigate = useNavigate();

    // Simulación de usuario hardcodeado (esto se podría reemplazar con una llamada al backend para obtener el usuario real)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Usuario seleccionado para modificar
    const [usuario, setUsuario] = useState(null); // Estado para el usuario hardcodeado
   // Usuarios hardcodeados (puede ser reemplazado por una llamada a la API para obtener los usuarios)
   const usuarios = [
    { dni: 1, nombre: "Fútbol", descripcion: "Usuario de equipo jugado con una pelota en un campo rectangular.", valor: "5000", profesor: "Carlos Pérez" },
    { dni: 2, nombre: "Basketball", descripcion: "Usuario de equipo que se juega en una cancha con dos aros.", valor: "4500", profesor: "María Gómez" },
    { dni: 3, nombre: "Tennis", descripcion: "Usuario indivdniual o de dobles jugado con raquetas y pelotas en una cancha divdnidnia por una red.", valor: "6000", profesor: "Pedro Martínez" },
    ];

     // Función para manejar el cambio en el dropdown y cargar el usuario seleccionado
     const handleUsuarioChange = (e) => {
        const usuarioId = parseInt(e.target.value);
        const usuario = usuarios.find(d => d.dni === usuarioId);
        setUsuarioSeleccionado(usuario);
    };


    // Este efecto se ejecuta una vez para cargar los valores hardcodeados al estado.
    useEffect(() => {
        setUsuario(usuario);
    }, []);

    const consultarForm = async (e) => {
        e.preventDefault();

        const datosFormulario = new FormData(datForm.current); 
        const usuario = Object.fromEntries(datosFormulario); 
        console.log(usuario)
        if (usuario.apellido==""){ usuario.apellido=null}
        if (usuario.nombre==""){ usuario.nombre=null}
        if (usuario.codPostal==""){usuario.codPostal=0}
        if (usuario.ciudad==""){usuario.ciudad=null}
        if (usuario.telefono==""){usuario.telefono=0}
        if (usuario.calle==""){usuario.calle=null}
        if (usuario.numero==""){usuario.numero=0}
        // Valdniación sencilla para campos vacíos

        const newUser={
            nombre:usuario.nombre,
            apellido:usuario.apellido,
            direccion:{
                calle:usuario.calle,
                numero:usuario.numero,
                codPostal:usuario.codPostal,
                ciudad:usuario.ciudad,
            },
            telefono:usuario.telefono,
        }
        console.log(newUser)

        var url = `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (response.status === 200) {
            const data = await response.json();
            setDni(data.dni);
            setMensaje(data.msj + " Puede agregar imágenes si lo desea");
        } else {
            const data = await response.json();
            setError(true);
            setMensaje(data.msj);
        }
        e.target.reset(); // Limpiar el formulario
        
    };

    return (
        <div className="put-container">
            {!mensaje ? (
                <div className="put-card">
                    <h2 className="put-title">Actualizar usuario</h2>
                    <h3 className="">Lo que no complete, no se actualizara. No se permiten campos vacíos.</h3>
                    {/* Dropdown para seleccionar el usuario */}

                    {/* Formulario para actualizar usuario */}
                        <form onSubmit={consultarForm} ref={datForm} className="put-form">

                            <input
                                type="text"
                                className="put-input"
                                placeholder="Nombre"
                                name="nombre"
                            />
                            <input
                                type="text"
                                className="put-input"
                                placeholder="Apellido"
                                name="apellido"
                            />
                            <input
                                type="text"
                                className="put-input"
                                placeholder="Calle"
                                name="calle"
                            />
                            <input
                                type="number"
                                className="put-input"
                                placeholder="Altura"
                                name="numero"
                            />
                            <input
                                type="number"
                                className="put-input"
                                placeholder="Codigo postal"
                                name="codPostal"
                            />
                            <input
                                type="text"
                                className="put-input"
                                placeholder="Ciudad"
                                name="ciudad"
                            />
                            <input
                                type="number"
                                className="put-input"
                                placeholder="Telefono"
                                name="telefono"
                            />
                           
                                {//fecha nacimiento
                                //rol
                                }

                            <button type="submit" className="put-button">Actualizar usuario</button>
                        </form>

                </div>
            ) : (!error ? (
                <div>
                    <Mensaje msj={"Actualizado"} />
                    {//<ImagenPost actividad={true} dni={dniUsuario} />
                    }
                </div>
            ) : (
                <Mensaje msj={mensaje} />
            ))}
        </div>
    );
};
