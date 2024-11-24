import './Home.css'; 

import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaInstagram, FaTwitter, FaFacebookF, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import escudo from './SanLorenzo.png'; 

export const Home = () => {
  const containerRef = useRef(null);
  const admin = useSelector((state) => state.usuarios.isAdmin);
  //const {id}= useParams();

  const [listaDeportes,setListaDeportes]= useState([]);
  const [listaNoticias,setListaNoticias]= useState([]);
  const [paddingLeft, setPaddingLeft] = useState(20); // Valor inicial del padding
  const [mensaje,setMensaje]= useState(null);
  const [loading, setLoading] = useState(true);

  const ejecutarFetchNoticias = async() =>{
    try {
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/noticias`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            // "Authorization": `Bearer ${getToken()}`
            }
            
        })

        const data = await response.json()
        if (data.msj){
            setMensaje(data.msj)
        }else{
            console.log(data)
            setListaNoticias(data)
        }
    } catch (error) {
        console.error('Error al cargar noticias:', error);
    } finally {
        setLoading(false);
    }
  }

  const ejecutarFetchDeportes = async() =>{
    try {
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/actividades`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            // "Authorization": `Bearer ${getToken()}`
            }
            
        })

        const data = await response.json()
        if (data.msj){
            setMensaje(data.msj)
        }else{
            console.log(data)
            setListaDeportes(data)
        }
    } catch (error) {
        console.error('Error al cargar deportes:', error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => { 
    ejecutarFetchNoticias()
    ejecutarFetchDeportes()
  },[])

useEffect(() => { 
  const totalNoticias = listaNoticias.length;
    if (totalNoticias <= 5) {
        setPaddingLeft(50);  // Padding para 1-5 noticias
    } else if (totalNoticias <= 10) {
        setPaddingLeft(100 * totalNoticias);  // Padding para 6-10 noticias
    } else if (totalNoticias <= 15) {
        setPaddingLeft(150 * totalNoticias);  // Padding para 11-15 noticias
    } else if (totalNoticias <= 20) {
        setPaddingLeft(200 *totalNoticias);  // Padding para 16-20 noticias
    } else {
        setPaddingLeft(250 * totalNoticias); // Padding por defecto si hay más de 20 noticias
    }
    
},[listaNoticias])

const navigate= useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }


const handleWheel = (event) => {
      const container = containerRef.current;
      container.scrollLeft += event.deltaY * 2; // Multiplica el deltaY para un desplazamiento más rápido
  };

if (loading) {
  return (
      <div className="home-loading-overlay">
          <div className="spinner"></div>
          <p>Cargando...</p>
      </div>
  );
}

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

      <div className="noticias-header">
          <h2 className="home-noticias-top">Últimas Noticias</h2> {/* Título centrado */}
      </div>
      <div
        className="home-noticias-container"
        ref={containerRef}
        onWheel={handleWheel}
        style={{ paddingLeft: `${paddingLeft}px` }} // Aplica padding dinámico
    >
        {listaNoticias.map((noticia, index) => (
            <div key={index} className="home-noticias-card">
                {/*<img src={noticia.imagen} alt={noticia.titulo} className="noticia-imagen" />*/}
                <h2 className="noticia-titulo">{noticia.titulo}</h2>
                <p className="noticia-descripcion">{noticia.descripcion}</p>
                {/*<Link to={`/noticias/${noticia.id}`} className="btn-agregar-noticia">
                    Ir a Noticia
                </Link>*/}
            </div>
        ))}
    </div>

    <div className="noticias-header">
          <h2 className="home-noticias-top">Deportes</h2> {/* Título centrado */}
      </div>
      <div
        className="home-noticias-container"
        ref={containerRef}
        onWheel={handleWheel}
        style={{ paddingLeft: `${paddingLeft}px` }} // Aplica padding dinámico
    >
        {listaDeportes.map((deporte, index) => (
                    <div key={index} className="home-noticias-card">
                        <img src={deporte.imagen} alt={deporte.titulo} className="deporte-imagen" />
                        <h2 className="home-noticias-titulo">{deporte.nombre}</h2>
                        <p className="home-noticias-descripcion">{deporte.descripcion}</p>
                        <p className="home-noticias-descripcion">Profesor a cargo: {deporte.profesor}</p>
                        <p className="home-noticias-descripcion">Valor mensual: {deporte.valor}</p>
                        <div>
                            <h2 className="home-noticias-descripcion">Días</h2>
                            {deporte.dias.map((dia, diaIndex) => (
                                <p key={diaIndex} className="home-noticias-descripcion">{dia}</p>
                            ))}
                        </div>
                        {/*<Link to={`/deportes/${deporte.id}`} className="btn-agregar-deporte">
                            Ir a Deporte
                        </Link>*/}
                    </div>
                ))}
    </div>
    


    </div>
    
  );
}