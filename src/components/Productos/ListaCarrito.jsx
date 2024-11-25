import React, { useEffect, useState } from 'react';
import './ListaCarrito.css';
import { useDispatch, useSelector } from 'react-redux';
import { confirmCart, deleteFromCart, fetchCart } from '../../store/actions/cart.action';
import { getToken } from '../../utils/auth-utils';

const initialCarritoProductos = [
  { id: 1, name: 'Crocs Azul Unisex', price: '$44.990', quantity: 2 },
  { id: 2, name: 'Probnado1 Crocs Azul Unisex', price: '$3.990', quantity: 1 },
  { id: 3, name: 'Probnado Crocs Azul Unisex', price: '$2.990', quantity: 3 },
  // Agrega más productos según lo que el usuario seleccione
];

export const ListaCarrito = () => {
  const dispatch=useDispatch()
  var carrito = useSelector((state) => state.cart.items);
  var username = useSelector((state) => state.usuarios.username);
  
  const [loading, setLoading] = useState(false);

  console.log("carrio: ",carrito)

  const finalizarCarrito= async(total) => {

    const arrayIdProducts=[]
    carrito.forEach(item => {
      arrayIdProducts.push(item.idProducto)
    })

    const cart={
      nombreUsuario:username,
      montoTotal:total,
      productos:arrayIdProducts
    }
      console.log(cart)
    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/finalizarCarrito`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
    body:JSON.stringify(cart)
      
    })
  
    const data = await response.json()
    console.log(data)

    if (response.status==200){
      dispatch(confirmCart(username))
    }

}


  const calcularTotal = () => {
    return carrito.reduce((acc, producto) => {
      const precio = parseFloat(producto.precioVenta).toFixed(2);
      return acc + precio * 1;
    }, 0);
  };


  const manejarPago = () => {
    if (carrito.length === 0) {
      alert('No has agregado nada al carrito.');
      return; // Salimos de la función si el carrito está vacío
    }

    const total = calcularTotal();
    finalizarCarrito(total)
    alert(`Realizaste el pago con un monto total de $${total}`);
  };

  useEffect(() => { 
    dispatch(fetchCart(username))
  },[])

  if (loading) {
    return (
        <div className="carrito-loading-overlay">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
}

if(ListaCarrito.length === 0) {
  return(
  <div className="deportes-vacio">
      <h2>Carrito Vacio</h2>
      <p>No hay productos en el carrito.</p>
  </div>
)
}

  return (
    <div className="carrito-container">


        <h2>Tu Carrito</h2>

      
      <table className="carrito-tabla">
        <thead>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {carrito.length&&<tbody>
          {carrito.map((producto) => (
            <tr key={producto.idProducto}>
              <td>{producto.idProducto}</td>
              <td>{producto.nombre}</td>
              <td>1</td>
              <td>$ {producto.precioVenta}</td>
              <td>
                <button className="accion-btn" onClick={()=>dispatch(deleteFromCart(username,producto.idProducto))}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>}
      </table>
      <div className="carrito-total">
        <h3>Total: ${calcularTotal()}</h3>
      </div>
      <button className="checkout-btn" onClick={manejarPago}>Pagar</button>

    </div>
  );
};
