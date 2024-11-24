import "./SuperAdmin.css";
import { useState } from "react";
import { getToken, isTokenExpired } from "../../utils/auth-utils";
import { useNavigate } from "react-router-dom";

const SuperAdmin = () => {
  const [formData, setFormData] = useState({
    dni: null,
    password: "",
    nombre:"",
    apellido:"",
    rol: "Directivo",
  });
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username=formData.nombre.substr(0,1)+formData.apellido.substr(0,1)+formData.dni
    const newObj={...formData,username}
 
    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`, 
      },
      body: JSON.stringify(newObj),
    });
    if (response.status==403){
      if (isTokenExpired(getToken())) {
        alert("Venció su sesión. Vuelva a logguearse")
        navigate("/logout")
      }
    }
    const data = await response.json();

 
    e.target.reset();
    setMensaje(data.msj);
    alert(`${mensaje}`)
  };

  return (
    <div className="superadmin-container">
      <div className="superadmin-form">
        <h3>Inicio de Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input type="text" className="form-control" name="nombre" />
          </div>

          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input type="text" className="form-control" name="apellido" />
          </div>

          <div className="mb-3">
            <label htmlFor="dni" className="form-label">
              DNI
            </label>
            <input type="number" className="form-control" name="dni" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input type="password" className="form-control" name="password" />
          </div>

          <div className="mb-3">
            <label htmlFor="rol">Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleInputChange}
              required
            >
              <option value="Directivo">Directivo</option>
              <option value="Inversionista">Inversionista</option>
              <option value="Cliente">E-Commerce</option>
              <option value="Activo">Socio Activo</option>
              <option value="Patrimonial">Socio Patrimonial</option>
            </select>
          </div>

         
            <button type="submit" className="button btnPrimary">
              <span className="btnText">Iniciar Sesión</span>
            </button>

        </form>

        {/*<div className="login-options">
          <Link to="/olvidoContraseña" className="link">
            ¿Olvidó su contraseña?
          </Link>

        </div>*/}
      </div>
    </div>
  );
};
export { SuperAdmin };