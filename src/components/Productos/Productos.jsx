import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Productos.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito
import foto from './Ojotas.jpg';
import { useSelector } from 'react-redux';

const productos = [
  { id: 1, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado',  url: '/producto'},
  { id: 2, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado', url: '/producto' },
  { id: 3, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado', url: '/producto' },
  { id: 4, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado', url: '/producto' },
  { id: 5, name: 'Camiseta  Azul ', price: '$3.990', image: foto, tipo: 'Calzado', url: '/producto' },
  { id: 6, name: 'Camiseta  Azul ', price: '$2.990', image: foto, tipo: 'Calzado', url: '/producto' },
  { id: 7, name: 'Camiseta  Azul ', price: '$1.990', image: foto, tipo: 'Calzado', url: '/producto' },
  { id: 8, name: 'Camiseta', price: '$4.990', image: foto, tipo: 'Calzado', url: '/producto' },
  { id: 9, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Botines', url: '/producto' },
  { id: 10, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Ojotas', url: '/producto' },
  { id: 11, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Dados', url: '/producto' },
  { id: 12, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Otro', url: '/producto' },
  { id: 13, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Otro1', url: '/producto' },
  { id: 14, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Otro2', url: '/producto' },
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

  const isUser = useSelector((state) => state.usuarios.dni);

  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState({});

  const productosPorTipo = groupByType(productos);

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

  const filteredProducts = productos.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productosFiltradosPorTipo = groupByType(filteredProducts);

  const handleProductClick = (url) => {
    navigate(url);
  };

  return (
    <div className="productos-container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          className="search-bar" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        
        <div className="cart-icon-container" onClick={handleCartClick}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>

       {!isUser&& <Link to="/register" className="btn-agregar-producto">
        Para poder comprar debe tener iniciar sesión. Si no tiene cuenta presione aquí para registrarse.
        </Link>}

{// Me parece que pertenece a grupo Ecommerce
}
      {/*
        <div className="agregarProducto">
        <Link to="/productos/add" className="btn-agregar-producto">
          Agregar Producto
        </Link>
      </div>*/
      }

      {Object.keys(productosFiltradosPorTipo).map((tipo) => {
        const current = currentIndex[tipo] || 0;
        const productosVisibles = productosFiltradosPorTipo[tipo].slice(current, current + 5);

        return (
          <div key={tipo} className="tipo-seccion">
            <h2 className="tipo-titulo">{tipo}</h2>
            <div className="productos-grid">
              <button className="prev-button" onClick={() => handlePrev(tipo)}>
                &lt;
              </button>
              {productosVisibles.map((producto) => (
                <div 
                  key={producto.id} 
                  className="producto-card"
                  onClick={() => handleProductClick(producto.url)} // Redirige a la URL del producto
                >
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