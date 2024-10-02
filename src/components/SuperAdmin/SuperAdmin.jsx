import "./SuperAdmin.css";
import { useState } from "react";
import { getToken, isTokenExpired } from "../../utils/auth-utils";
import { useNavigate } from "react-router-dom";

const SuperAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Directivo",
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

    const response = await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/admin/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`, 
      },
      body: JSON.stringify(formData),
    });
    if (response.status==403){
      if (isTokenExpired(getToken())) {
        alert("Venció su sesión. Vuelva a logguearse")
        navigate("/logout")
      }
    }
    const data = await response.json();

    if (data.msj) {
      setMensaje(data.msj);
    } else {
      setMensaje("Usuario creado exitosamente");
    }

    e.target.reset();
  };

  return (
    <div className="superadmin-container">
      <div className="superadmin-form">
        <h3>Super Admin</h3>
        {mensaje && <p>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="Directivo">Directivo</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Inversionista">Inversionista</option>
            </select>
          </div>

          <button type="submit" className="button btnPrimary">
            Crear Usuario
          </button>
          <button type="submit" className="button btnSecondary">
            Eliminar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export { SuperAdmin };
