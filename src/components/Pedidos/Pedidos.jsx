import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Pedidos.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito
import foto from './Ojotas.jpg';
import { useSelector } from 'react-redux';

const pedidos = [
  { id: 1, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado',  url: '/pedido'},
  { id: 2, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado', url: '/pedido' },
  { id: 3, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado', url: '/pedido' },
  { id: 4, name: 'Camiseta Azul ', price: '$44.990', image: foto, tipo: 'Calzado', url: '/pedido' },
  { id: 5, name: 'Camiseta  Azul ', price: '$3.990', image: foto, tipo: 'Calzado', url: '/pedido' },
  { id: 6, name: 'Camiseta  Azul ', price: '$2.990', image: foto, tipo: 'Calzado', url: '/pedido' },
  { id: 7, name: 'Camiseta  Azul ', price: '$1.990', image: foto, tipo: 'Calzado', url: '/pedido' },
  { id: 8, name: 'Camiseta', price: '$4.990', image: foto, tipo: 'Calzado', url: '/pedido' },
  { id: 9, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Botines', url: '/pedido' },
  { id: 10, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Ojotas', url: '/pedido' },
  { id: 11, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Dados', url: '/pedido' },
  { id: 12, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Otro', url: '/pedido' },
  { id: 13, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Otro1', url: '/pedido' },
  { id: 14, name: 'Camiseta  ', price: '$44.990', image: foto, tipo: 'Otro2', url: '/pedido' },
  // Agrega más pedidos según necesites
];

const groupByType = (Pedidos) => {
  return Pedidos.reduce((group, Pedido) => {
    const { tipo } = Pedido;
    if (!group[tipo]) {
      group[tipo] = [];
    }
    group[tipo].push(Pedido);
    return group;
  }, {});
};

export const Pedidos = () => {

  const isUser = useSelector((state) => state.usuarios.dni);
  const username = useSelector((state) => state.usuarios.username);
  console.log(username)
  const navigate = useNavigate();
  
  const [listaPedidos, setlistaPedidos] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [cartCount, setCartCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState({});

  const pedidosPorTipo = groupByType(pedidos);

  const handleNext = (tipo) => {
    const current = currentIndex[tipo] || 0;
    if (current + 5 < pedidosPorTipo[tipo].length) {
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

  const filteredPedidos = pedidos.filter(Pedido =>
    Pedido.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    Pedido.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pedidosFiltradosPorTipo = groupByType(filteredPedidos);

  const handlePedidoClick = (url) => {
    navigate(url);
  };

  const getPedidos = async() =>{

    let url=`ventas`
  
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      
    })
    
    const data = await response.json()
    console.log(data)
    if (data.msj){
      setlistaPedidos([])
      setMensaje(data.msj)
    }else{
      setlistaPedidos(data)
    }
  }

  const actualizarVentas = async() =>{

    let url=`misPedidos/?username=${username}`
  
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      
    })
    

    setTimeout(function(){
        getPedidos()
    }, 5000);
    
  }

    useEffect(() => { 
      actualizarVentas()
    },[])

  return (
    <div className="pedidos-container">

       {!isUser&& <Link to="/register" className="btn-agregar-pedido">
        Para poder comprar debe tener iniciar sesión. Si no tiene cuenta presione aquí para registrarse.
        </Link>}

      {Object.keys(pedidosFiltradosPorTipo).map((tipo) => {
        const current = currentIndex[tipo] || 0;
        const pedidosVisibles = pedidosFiltradosPorTipo[tipo].slice(current, current + 5);

        return (
          <div key={tipo} className="tipo-seccion">
            <h2 className="tipo-titulo">{tipo}</h2>
            <div className="pedidos-grid">
              <button className="prev-button" onClick={() => handlePrev(tipo)}>
                &lt;
              </button>
              {pedidosVisibles.map((pedido) => (
                <div 
                  key={pedido.id} 
                  className="pedido-card"
                  onClick={() => handlePedidoClick(pedido.url)} // Redirige a la URL del pedido
                >
                  <img src={pedido.image} alt={pedido.name} className="pedido-image" />
                  <div className="pedido-info">
                    <p className="pedido-name">{pedido.name}</p>
                    <p className="pedido-price">{pedido.price}</p>
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