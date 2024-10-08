import "./Register.css"

import { useRef, useState } from "react";
import { Mensaje } from "../Mensaje/Mensaje";
import { Link, useNavigate } from "react-router-dom";
import { validateRol, isRolUser, deleteToken, getToken } from "../../utils/auth-utils";
import './Register.css'; // Asegúrate de importar el archivo de estilos

export const Register = () => {
    const [mensaje, setMensaje] = useState(null);
    const [rol, setRol] = useState(undefined);    
    const navigate = useNavigate();
    const navigateTo = (url) => navigate(url);

    const datForm = useRef();

    const consultarForm = async (e) => {
        e.preventDefault();
        const datosFormulario = new FormData(datForm.current);
        const cliente = Object.fromEntries(datosFormulario);

        if (!cliente.username || !cliente.password) {
            setMensaje("Faltan datos");
        } else {
            console.log(cliente)
            const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //"Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(cliente)
            });

           
            const data = await response.json();
            console.log(data)
            if (data.msj) {
                setMensaje(data.msj);
            }
            
            e.target.reset();
        }
    };

    return (
        <div className="register-container">
            {!mensaje ? (
                <div className="register-form">
                    <h3>Formulario de registro</h3>
                    <form onSubmit={consultarForm} ref={datForm}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="nombre" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" name="apellido" required />
                        </div>
                       {/* <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                            <input type="text" className="form-control" name="username" />
                        </div>
                        */}
                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input type="number" className="form-control" name="dni" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" name="password" />
                        </div>
                        <button type="submit" className="button btnPrimary">Crear Usuario</button>
                    </form>
                </div>
            ) : (
                <Mensaje msj={mensaje} />
            )}
        </div>
    );
};
