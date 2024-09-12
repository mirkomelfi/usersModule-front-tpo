import React from 'react';
import './Contactos.css';
import "../Global.css"
import { FaInstagram, FaTwitter, FaFacebookF, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export const Contactos = () => {
  return (
    <div className="contactos-container">
      <h1>Contacto</h1>
      <p>Si deseas ponerte en contacto con nosotros, puedes seguirnos en nuestras redes sociales, enviarnos un mensaje directamente aquí, o contactarnos por WhatsApp o email:</p>
      <h3><FaWhatsapp size={20} /> +54 9 11 2222 3333</h3>
      <h3><FaEnvelope size={20} /> mailNoOficial@gmail.com</h3>
      <div className="social-links">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF size={30} />
        </a>
      </div>
    </div>
  );
}
