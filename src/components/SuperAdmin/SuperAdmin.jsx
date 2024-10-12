import { useState } from "react";
import { getToken, isTokenExpired } from "../../utils/auth-utils";
import { useNavigate } from "react-router-dom";

import "./SuperAdmin.css";

export const SuperAdmin = () => {
  const [formData, setFormData] = useState({
    dni: null,
    password: "",
    nombre: "",
    apellido: "",
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

    const username = formData.nombre.substr(0, 1) + formData.apellido.substr(0, 1) + formData.dni;
    const newObj = { ...formData, username };

    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(newObj),
    });

    if (response.status === 403) {
      if (isTokenExpired(getToken())) {
        alert("Venció su sesión. Vuelva a loguearse");
        navigate("/logout");
      }
    }

    const data = await response.json();

    e.target.reset();
    setMensaje(data.msj);
    alert(`${mensaje}`);
  };

  return (
    <div className="superAdmin-container">
      <div className="superAdmin-form">
        <h3>Super Admin - Crear Usuario</h3>
        <form onSubmit={handleSubmit}>
          <div className="superAdmin-form-group">
            <label htmlFor="nombre" className="superAdmin-label">Nombre</label>
            <input type="text" className="superAdmin-input" name="nombre" required />
          </div>

          <div className="superAdmin-form-group">
            <label htmlFor="apellido" className="superAdmin-label">Apellido</label>
            <input type="text" className="superAdmin-input" name="apellido" required />
          </div>

          <div className="superAdmin-form-group">
            <label htmlFor="dni" className="superAdmin-label">DNI</label>
            <input type="number" className="superAdmin-input" name="dni" required />
          </div>

          <div className="superAdmin-form-group">
            <label htmlFor="password" className="superAdmin-label">Contraseña</label>
            <input type="password" className="superAdmin-input" name="password" required />
          </div>

          <div className="superAdmin-form-group">
            <label htmlFor="rol" className="superAdmin-label">Rol</label>
            <select name="rol" className="superAdmin-select" defaultValue="Directivo" required>
              <option value="Directivo">Directivo</option>
              <option value="Inversionista">Inversionista</option>
              <option value="Cliente">E-Commerce</option>
              <option value="Activo">Socio Activo</option>
              <option value="Patrimonial">Socio Patrimonial</option>
            </select>
          </div>

          <button type="submit" className="superAdmin-button superAdmin-btnPrimary">
            <span className="superAdmin-btnText">Crear Usuario</span>
          </button>
        </form>
      </div>
    </div>
  );
};
