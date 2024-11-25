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
  
  const [products, setProducts] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [cartCount, setCartCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState({});

  const [loading, setLoading] = useState(true);

  const productosPorcategoria = groupByType(products);

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

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productosFiltradosPorcategoria = groupByType(filteredProducts);

  const handleProductClick = (url,id) => {
    const url1=url+id
    navigate(url1);
  };
/*
  const getProductos = async() =>{

    try {

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
    } catch (error) {
        console.error('Error al cargar noticias:', error);
    } finally {
        setLoading(null); 
    }
  }
*/
  const actualizarProductos = async() =>{
    try {

        let url=`productosUpdate`
      
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
          
        })
        
     } catch (error) {
        console.error('Error al cargar noticias:', error);
    } finally {
        setLoading(null); 
    }        
  }
  
  /*useEffect(() => { 
    console.log("Reload products")
  },[listaProductos])
*/



    const [error, setError] = useState(null);  // Estado para manejar errores

    useEffect(() => {
      actualizarProductos()
        // Conectar al WebSocket en el endpoint /ws
        const socket = new WebSocket('ws://localhost:8080/ws');
        console.log(socket)
        // Al abrir la conexión WebSocket
        socket.onopen = () => {
            console.log("Conexión WebSocket establecida.");
            // Enviar un mensaje al servidor si es necesario (por ejemplo, para pedir productos)
            socket.send("Solicitar productos");
        };
       console.log(socket)
        // Manejar el mensaje recibido del servidor
        socket.onmessage = (event) => {
          console.log(event)
            console.log("Mensaje recibido: ", event.data);
         
            try {
                // Deserializar el JSON de productos
                const receivedProducts = JSON.parse(event.data);
                
                // Verificar que la respuesta sea un array de productos
                if (Array.isArray(receivedProducts)) {
                  receivedProducts.forEach(producto=>{
                    producto.image=foto
                  })
                    setProducts(receivedProducts);  // Actualizar el estado de productos
                }

                setLoading(null);  // Marcar como "cargado" una vez que los productos llegan
            } catch (e) {
                console.error("Error al procesar los productos: ", e);
                alert(`${event.data}`)
                setLoading(null);   // Cambiar el estado de carga
            }
        };

        // Manejar errores en la conexión WebSocket
        socket.onerror = (error) => {
            console.error("Error en WebSocket: ", error);
            setError("Error en la conexión WebSocket.");
            setLoading(null);  // Cambiar el estado de carga en caso de error
        };

        // Manejar el cierre de la conexión WebSocket
        socket.onclose = () => {
            console.log("Conexión WebSocket cerrada.");
        };

        // Limpiar al desmontar el componente
        return () => {
            socket.close();
        };
    }, []);  // Este efecto se ejecuta una sola vez cuando el componente se monta



    if (loading) {
      return (
          <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Cargando...</p>
          </div>
      );
  }

  if(listaProductos.length === 0) {
    return(
    <div className="deportes-vacio">
        <h2>No hay productos disponibles</h2>
        <p>Pronto añadiremos nuevos productos.</p>
    </div>
  )
}

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
                  onClick={() => navigate(`${producto.idProducto}`,{                                                  
                    state: { productData: producto } 
                    })} // Redirige a la URL del producto
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