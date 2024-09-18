import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/auth-utils";
import { Mensaje } from "../Mensaje/Mensaje";
import { validateRol, isRolUser, deleteToken } from "../../utils/auth-utils";
import "./Usuario.css"; // Import the new CSS file

export const UsuarioViejo = ({ fromPerfil }) => {
  const { dni } = useParams();

  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [rol, setRol] = useState(undefined);

  const navigate = useNavigate();

  const ejecutarFetch = async () => {
    var url = ``;
    if (dni) {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`;
    } else {
      url = `${process.env.REACT_APP_DOMINIO_BACK}/miPerfil`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const rol = validateRol(response);
    if (!rol) {
      deleteToken();
      navigate("/login");
    } else {
      const data = await response.json();
      setRol(isRolUser(getToken()));
      if (data.msj) {
        setMensaje(data.msj);
      } else {
        setUsuario(data);
      }
    }
  };

  const eliminar = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/admin/usuarios/${dni}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const rol = validateRol(response);
    if (!rol) {
      if (isRolUser(getToken())) {
        setMensaje("No posee los permisos necesarios");
      } else {
        deleteToken();
        navigate("/login");
      }
    } else {
      const data = await response.json();
      if (data.msj) {
        setMensaje(data.msj);
      }
    }
    return;
  };

  const navigateTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    ejecutarFetch().catch((error) => console.error(error));
  }, []);

  return (
    <>
      {!mensaje ? (
        <div className="tarjetaUsuario">
          <div className="usuarioInfo">
            <h1 className="titulo">DNI: {usuario.dni}</h1>
            <p><strong>Username:</strong> {usuario.username}</p>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Apellido:</strong> {usuario.apellido}</p>
          </div>
          <div className="buttonContainer">
            {dni ? (
              <button
                className="button btnPrimary"
                onClick={() => navigateTo(`/updateUsuario/${dni}`)}
              >
                Modificar
              </button>
            ) : (
              <button
                className="button btnPrimary"
                onClick={() => navigateTo(`/updateUsuario`)}
              >
                Modificar
              </button>
            )}
            {dni && (
              <button className="button btnDanger" onClick={() => eliminar()}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      ) : (
        <Mensaje msj={mensaje} />
      )}
      <div className="volverContainer">
        {dni ? (
          <button className="button btnSecondary" onClick={() => navigateTo(`/usuarios`)}>
            Volver
          </button>
        ) : (
          <button className="button btnSecondary" onClick={() => navigateTo(`/`)}>
            Volver
          </button>
        )}
      </div>
    </>
  );
};
