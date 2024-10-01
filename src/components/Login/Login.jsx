import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mensaje } from "../Mensaje/Mensaje";
import { deleteToken, extractDni, getToken, setToken,extractRol } from "../../utils/auth-utils";
import "./Login.css";
import { loginUsuario } from "../../store/actions/usuario.action";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [loggeado, setLoggeado] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const dispatch=useDispatch()

  const navigateTo = (url) => {
    navigate(url);
  };

  const datForm = useRef();

  const consultarLoggeo = async () => {
    const token = getToken();
    if (token) {
      setLoggeado(true);
    }
  };

  useEffect(() => {
    consultarLoggeo();
  }, []);

  const desloggear = async () => {
    deleteToken();
    setLoggeado(false);
  };

  const consultarForm = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData(datForm.current);
    const cliente = Object.fromEntries(datosFormulario);
  
    const response=await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      }
    );

    if (response.status==200){
      const data = await response.json()
      console.log(data)
      setToken(data.token)
   
    }else{
      const data = await response.json()
      console.log(data)
      setMensaje(data.msj)
    }
    const dni = extractDni(getToken())
    const rol = extractRol(getToken())
    dispatch(loginUsuario(dni,rol))
  
    // Navegar a /superAdmin sin importar el resultado de la autenticación
    //navigate("/superAdmin");
  
    e.target.reset(); // Resetear el formulario
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Inicio de Sesión</h3>
        <form onSubmit={consultarForm} ref={datForm}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nombre de Usuario
            </label>
            <input type="username" className="form-control" name="username" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input type="password" className="form-control" name="password" />
          </div>

         
            <button type="submit" className="button btnPrimary">
              <span className="btnText">Iniciar Sesión</span>
            </button>

        </form>

        <div className="login-options">
          <Link to="/olvidoContraseña" className="link">
            ¿Olvidó su contraseña?
          </Link>

        </div>
      </div>
    </div>
  );
};
