import React from 'react';
import './PerfilUsuario.css';
import avatar from './Messi.jpeg'; // Imagen de ejemplo para el avatar

export const PerfilUsuario = () => {
  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img src={avatar} alt="Avatar del usuario" className="perfil-avatar" />
        <h2 className="perfil-nombre">Nombre del Usuario</h2>
        <p className="perfil-rol">Rol: Socio</p>
        <p className="perfil-membresia">Membresía: Activa</p>
      </div>

      <div className="perfil-info">
        <h3>Detalles del Usuario</h3>
        <p><strong>Email:</strong> usuario@clubdefutbol.com</p>
        <p><strong>Teléfono:</strong> +123 456 7890</p>
        <p><strong>Fecha de Membresía:</strong> 01/01/2022</p>
      </div>

      <div className="perfil-acciones">
        <button className="perfil-btn">Editar Perfil</button>
        <button className="perfil-btn perfil-btn-danger">Eliminar Cuenta</button>
      </div>
    </div>
  );
}
