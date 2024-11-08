import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Productos.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el icono del carrito
import foto from './Ojotas.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductos } from '../../store/actions/commerce.action';

const productos = [
  { id: 1, name: 'Camiseta Azul ', price: '$44.990', image: foto, categoria: 'Calzado',  url: '/producto'},
  { id: 2, name: 'Camiseta Azul ', price: '$44.990', image: foto, categoria: 'Calzado', url: '/producto' },
  { id: 3, name: 'Camiseta Azul ', price: '$44.990', image: foto, categoria: 'Calzado', url: '/producto' },
  { id: 4, name: 'Camiseta Azul ', price: '$44.990', image: foto, categoria: 'Calzado', url: '/producto' },
  { id: 5, name: 'Camiseta  Azul ', price: '$3.990', image: foto, categoria: 'Calzado', url: '/producto' },
  { id: 6, name: 'Camiseta  Azul ', price: '$2.990', image: foto, categoria: 'Calzado', url: '/producto' },
  { id: 7, name: 'Camiseta  Azul ', price: '$1.990', image: foto, categoria: 'Calzado', url: '/producto' },
  { id: 8, name: 'Camiseta', price: '$4.990', image: foto, categoria: 'Calzado', url: '/producto' },
  { id: 9, name: 'Camiseta  ', price: '$44.990', image: foto, categoria: 'Botines', url: '/producto' },
  { id: 10, name: 'Camiseta  ', price: '$44.990', image: foto, categoria: 'Ojotas', url: '/producto' },
  { id: 11, name: 'Camiseta  ', price: '$44.990', image: foto, categoria: 'Dados', url: '/producto' },
  { id: 12, name: 'Camiseta  ', price: '$44.990', image: foto, categoria: 'Otro', url: '/producto' },
  { id: 13, name: 'Camiseta  ', price: '$44.990', image: foto, categoria: 'Otro1', url: '/producto' },
  { id: 14, name: 'Camiseta  ', price: '$44.990', image: foto, categoria: 'Otro2', url: '/producto' },
  // Agrega más productos según necesites
];

const groupByType = (products) => {
  return products.reduce((group, product) => {
    const { categoria } = product;
    if (!group[categoria]) {
      group[categoria] = [];
    }
    group[categoria].push(product);
    return group;
  }, {});
};

export const Productos = () => {
  const dispatch=useDispatch()
  const isUser = useSelector((state) => state.usuarios.dni);
  //const prods = useSelector((state) => state.commerce.productos);
  //console.log("dispatch cargado:",prods)

  const navigate = useNavigate();
  
  const [listaProductos, setListaProductos] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [cartCount, setCartCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState({});

  const productosPorcategoria = groupByType(listaProductos);

  const handleNext = (categoria) => {
    const current = currentIndex[categoria] || 0;
    if (current + 5 < productosPorcategoria[categoria].length) {
      setCurrentIndex((prevState) => ({
        ...prevState,
        [categoria]: current + 1,
      }));
    }
  };

  const handlePrev = (categoria) => {
    const current = currentIndex[categoria] || 0;
    if (current > 0) {
      setCurrentIndex((prevState) => ({
        ...prevState,
        [categoria]: current - 1,
      }));
    }
  };

  const handleCartClick = () => {
    navigate('/listaCarrito');
  };

  const filteredProducts = listaProductos.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productosFiltradosPorcategoria = groupByType(filteredProducts);

  const handleProductClick = (url,id) => {
    const url1=url+id
    navigate(url1);
  };

  const getProductos = async() =>{

    let url=`productos`
  
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      
    })
    
    const data = await response.json()
    console.log(data)
    if (data.msj){
      setListaProductos([])
      setMensaje(data.msj)
    }else{
      data.forEach(producto=>{
        producto.image=foto
      })
      setListaProductos(data)
      //dispatch(updateProductos(data))
    }
  }

  const actualizarProductos = async() =>{

    let url=`productosUpdate`
  
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      
    })
    

    setTimeout(function(){
        getProductos()
    }, 500);

  }
  
  /*useEffect(() => { 
    console.log("Reload products")
  },[listaProductos])
*/
    useEffect(() => { 
      actualizarProductos()
    },[])





/*



    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Conectar al WebSocket en el endpoint /ws
        const socket = new WebSocket('ws://localhost:8080/ws');

        socket.onopen = () => {
            console.log("Conexión WebSocket establecida.");
            // Enviar un mensaje al servidor si es necesario, por ejemplo, para pedir productos
            socket.send("Solicitar productos");
        };

        socket.onmessage = (event) => {
            console.log("Mensaje recibido: ", event.data);
            setProducts(JSON.parse(event.data));  // Aquí puedes procesar los productos recibidos
            setLoading(false);  // Cambiar el estado cuando los productos llegan
        };

        socket.onerror = (error) => {
            console.error("Error en WebSocket: ", error);
        };

        socket.onclose = () => {
            console.log("Conexión WebSocket cerrada.");
        };

        // Limpiar al desmontar el componente
        return () => {
            socket.close();
        };
    }, []);

    */












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

      {Object.keys(productosFiltradosPorcategoria).map((categoria) => {
        const current = currentIndex[categoria] || 0;
        const productosVisibles = productosFiltradosPorcategoria[categoria].slice(current, current + 5);

        return (
          <div key={categoria} className="categoria-seccion">
            <h2 className="categoria-titulo">{categoria}</h2>
            <div className="productos-grid">
              <button className="prev-button" onClick={() => handlePrev(categoria)}>
                &lt;
              </button>
              {productosVisibles.map((producto) => (
                <div 
                  key={producto.idProducto} 
                  className="producto-card"
                  onClick={() => navigate(`${producto.idProducto}`)} // Redirige a la URL del producto
                >
                  <img src={producto.image} alt={producto.nombre} className="producto-image" />
                  <div className="producto-info">
                    <p className="producto-name">{producto.nombre}</p>
                    <p className="producto-price">{producto.precioVenta}</p>
                  </div>
                </div>
              ))}
              <button className="next-button" onClick={() => handleNext(categoria)}>
                &gt;
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};