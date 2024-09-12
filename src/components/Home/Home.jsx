import './Home.css'; 
import '../Global.css';

import React from "react";
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
          <div className="social-links">
            <a href="https://www.linkedin.com/in/tuPerfilLinkedin" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/tuPerfilGithub" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <div className="image-section">
          <img src={escudo} alt="Profile" className="profile-pic" />
        </div>
      </div>
    </div>
  );
}