import foto from './Ojotas.jpg';
export const UPDATE_VENTAS = "UPDATE_VENTAS";
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const LOAD_PRODUCTOS = "LOAD_PRODUCTOS";



const getProductos = async() =>{

  let url=`productos`

  const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })
  
  const data = await response.json()

  data.forEach(producto=>{
    producto.image=foto
  })

  return data

}


const fetchProductos = async() =>{

  let url=`productosUpdate`

  const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })

  setTimeout(function(){
    return getProductos()
}, 6000);
  
}

export const updateProductos = (productos) => {
  return async (dispatch) => {
    console.log("added")
    dispatch({
      type:UPDATE_PRODUCTS,
      productos,
    });
  }
}

export const updateVentas = (ventas) => {
  return async (dispatch) => {
    dispatch({
      type:UPDATE_VENTAS,
      ventas
    });
  }
}

export const actualizarProductos = () => {
  return async (dispatch) => {
    const prods= await fetchProductos()
    dispatch({
      type:LOAD_PRODUCTOS,
      productos:prods
    });
  }

}
