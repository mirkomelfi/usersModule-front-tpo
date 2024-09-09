import "./OlvidoContraseña.css";
import { useState } from "react";
import { getToken } from "../../utils/auth-utils";

const OlvidoContraseña = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Directivo", 
  });
  const [mensaje, setMensaje] = useState(null);

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
        Authorization: `Bearer ${getToken()}`, 
      },
      body: JSON.stringify(formData),
    });

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
        <h3>Cambiar Contraseña</h3>
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
            <label htmlFor="password">Contraseña Nueva</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Repetir Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="button btnPrimary">
            Modificar
          </button>
        </form>
      </div>
    </div>
  );
};

export { OlvidoContraseña };
