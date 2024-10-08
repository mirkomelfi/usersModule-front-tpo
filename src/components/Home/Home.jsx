import './Home.css'; 

import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import escudo from './SanLorenzo.png'; 

export const Home = () => {
  return (
    <div className="home">
      <div className="content-container">
        <div className="text-section">
          <h1>Sitio No Oficial <span role="img" aria-label="wave">👋</span></h1>
          <p>
          A principios de 1907, un grupo de jóvenes entusiastas liderados por Federico Monti y Antonio Scaramusso pasaba horas y más horas jugando al fútbol en la intersección de las calles México y Treinta y Tres Orientales. Ahí nacieron Los Forzosos de Almagro, como se autodenominaban, con un lema que decía: "Hay que romperse todo para vencernos". La historia de esta pandilla daría un giro divino gracias a la visión social de Lorenzo Bartolomé Martín Massa, el padre salesiano que buscaba sacar a los chicos de los peligros de la calle. ¿Cómo lo hizo? Abriendo las puertas del Oratorio San Antonio para que los pibes practicaran deportes a cambio de asegurar su presencia en la misa los domingos. Así, el 1° de abril de 1908, luego de una asamblea extraordinaria, el club pasó a llamarse San Lorenzo de Almagro.<span role="img" aria-label="pin">📍</span>
          </p>

          <div className="social-links ">
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
            
          <h4><FaWhatsapp size={15} /> +54 9 11 2222 3333 </h4>
          <h4><FaEnvelope size={15} /> mailNoOficial@gmail.com  </h4>
        
        </div>
        <div className="image-section">
          <img src={escudo} alt="Profile" className="profile-pic" />
        </div>
      </div>
      
    </div>
  );
}