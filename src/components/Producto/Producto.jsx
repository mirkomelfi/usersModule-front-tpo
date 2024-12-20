import React, { useEffect, useState } from 'react';
import './Producto.css';
import { useLocation } from "react-router-dom";
import producto from "./Ojotas.jpg";
import { addToCart } from '../../store/actions/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Producto = () => {

  const [productoInfo, setProducto] = useState(null);
  var { id } = useParams();
  const [mensaje, setMensaje] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  var username= useSelector((state) => state.usuarios.username)
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);

  const dispatch=useDispatch()

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleComprar = () => {
    dispatch(addToCart(username,productoInfo))
    alert(`Has comprado ${cantidad} unidades del producto.`);
  };

/*

  const getProducto = async() =>{
    try {

        let url=`productos/${id}`
      
        const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
          
        })
        
        const data = await response.json()
        console.log(data)

        if (data.msj){
          setMensaje(data.msj)
        }else{
          setProducto(data)
        }

  } catch (error) {
      console.error('Error al cargar noticias:', error);
  } finally {
      setLoading(false);
  }
  }

  useEffect(() => { 
    getProducto()
  },[])*/

  useEffect(() => { 
    if (state.productData){
      setProducto(state.productData)
      setLoading(null)
    }
  },[])

  // Datos del producto
  const productoInfo1 = {
    nombre: "Camiseta del Club",
    descripcion: "Camiseta oficial del club con tela de alta calidad.",
    precioVenta: 29500,
    stockActual: 50,
    descuentoEfectivo: "10%",
    descuentoSocios: "15%",
    descuentoNoSocios: "5%",
    categoria: "Ropa deportiva",
    caracteristicas: ["Tela transpirable", "Diseño original del club"],
    talles: ["S", "M", "L", "XL"]
  };

  if (loading) {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
}

  return (
    <div className="producto-container">

      {state.productData&&

      <>

      {/* Imagen del producto */}
      <div className="producto-imagen">
        <img src={producto} alt="Producto" />
      </div>

      {/* Detalles del producto */}
      <div className="producto-detalles">
        <h1 className="producto-titulo">{state.productData.nombre}</h1>
        <p className="producto-precio">${state.productData.precioVenta.toLocaleString()}</p>
        <p className="producto-descripcion">{state.productData.descripcion}</p>
        <p className="producto-stock">Stock actual: {state.productData.stockActual} unidades</p>
        <p className="producto-categoria">Categoría: {state.productData.categoria}</p>

        {/* Descuentos */}
        <div className="producto-descuentos">
          <p>Descuento efectivo: {state.productData.descuentoEfectivo*100+"%"}</p>
          <p>Descuento para socios: {state.productData.descuentoSocios*100+"%"}</p>
          <p>Descuento para no socios: {state.productData.descuentoNoSocios*100+"%"}</p>
        </div>

        {/* Características */}
        <div className="producto-caracteristicas">
          <h3>Características:</h3>
          <ul>
            {productoInfo.caracteristicas.map((caracteristica, index) => (
              <li key={index}>{caracteristica}</li>
            ))}
          </ul>
        </div>

        {/* Talles disponibles */}
        <div className="producto-talles">
          <h3>Talles disponibles:</h3>
          <ul>
            {productoInfo.talles.map((talle, index) => (
              <li key={index}>{talle}</li>
            ))}
          </ul>
        </div>

        {/* Cantidad y botón de comprar */}
        <div className="producto-compra">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            //max={productoInfo.stockActual}
            max="1"
            value={cantidad}
            onChange={handleCantidadChange}
          />

          <button className="btn-comprar" onClick={handleComprar}>
            Agregar Al Carrito
          </button>
        </div>
      </div>
      </>
      } 
    </div>
  );
};
