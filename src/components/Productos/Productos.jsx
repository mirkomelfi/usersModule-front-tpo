import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Productos.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito
import foto from './Ojotas.jpg';

const productos = [
  { id: 1, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Calzado' },
  { id: 2, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Calzado' },
  { id: 3, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Calzado' },
  { id: 4, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Calzado' },
  { id: 5, name: 'Probnado1 Crocs Azul Unisex', price: '$3.990', image: foto, tipo: 'Calzado' },
  { id: 6, name: 'Probnado Crocs Azul Unisex', price: '$2.990', image: foto, tipo: 'Calzado' },
  { id: 7, name: 'Probnado2 Crocs Azul Unisex', price: '$1.990', image: foto, tipo: 'Calzado' },
  { id: 8, name: 'Probnado3', price: '$4.990', image: foto, tipo: 'Calzado' },
  { id: 8, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Botines' },
  { id: 8, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Ojotas' },
  { id: 8, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Dados' },
  { id: 8, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Otro' },
  { id: 8, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Otro1' },
  { id: 8, name: 'Crocs Azul Unisex', price: '$44.990', image: foto, tipo: 'Otro2' },
  // Agrega más productos según necesites
];

const groupByType = (products) => {
  return products.reduce((group, product) => {
    const { tipo } = product;
    if (!group[tipo]) {
      group[tipo] = [];
    }
    group[tipo].push(product);
    return group;
  }, {});
};

export const Productos = () => {
  const navigate  = useNavigate();

  const [cartCount, setCartCount] = useState(3); // Puedes ajustar el valor inicial del carrito
  const productosPorTipo = groupByType(productos);
  const [currentIndex, setCurrentIndex] = useState({});

  // Función para manejar el desplazamiento
  const handleNext = (tipo) => {
    const current = currentIndex[tipo] || 0;
    if (current + 5 < productosPorTipo[tipo].length) {
      setCurrentIndex((prevState) => ({
        ...prevState,
        [tipo]: current + 1,
      }));
    }
  };

  const handlePrev = (tipo) => {
    const current = currentIndex[tipo] || 0;
    if (current > 0) {
      setCurrentIndex((prevState) => ({
        ...prevState,
        [tipo]: current - 1,
      }));
    }
  };

  const handleCartClick = () => {
    navigate('/listaCarrito');
  };

  return (
    <div className="productos-container">
      <div className="search-container">
        <input type="text" placeholder="Buscar productos..." className="search-bar" />
        
        {/* Aquí agregamos el carrito con el contador */}
        <div className="cart-icon-container" onClick={handleCartClick}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>

      {Object.keys(productosPorTipo).map((tipo) => {
        const current = currentIndex[tipo] || 0;
        const productosVisibles = productosPorTipo[tipo].slice(current, current + 5);

        return (
          <div key={tipo} className="tipo-seccion">
            <h2 className="tipo-titulo">{tipo}</h2>
            <div className="productos-grid">
              <button className="prev-button" onClick={() => handlePrev(tipo)}>
                &lt;
              </button>
              {productosVisibles.map((producto) => (
                <div key={producto.id} className="producto-card">
                  <img src={producto.image} alt={producto.name} className="producto-image" />
                  <div className="producto-info">
                    <p className="producto-name">{producto.name}</p>
                    <p className="producto-price">{producto.price}</p>
                  </div>
                </div>
              ))}
              <button className="next-button" onClick={() => handleNext(tipo)}>
                &gt;
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};