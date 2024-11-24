import { extractRol, getToken } from "../../utils/auth-utils";

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CONFIRM_CART = "CONFIRM_CART";
export const DELETE_ITEM = "DELETE_ITEM";
export const LOAD_CART = "LOAD_CART";

export const addToCart = (username,item) => {

  return async (dispatch) => {

    let url=`carrito?username=${username}`

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      }
      
    })
    console.log("response 1: ",response.status)
    const data = await response.json()
    console.log(data)
    

    const products=data.productos
    const newArray=[...products,item]

    const newCart={username,productos:newArray}
  


    const response2= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      }
      
    })

    console.log("response 2: ",response2.status)
    const data2 = await response2.json()
    console.log(data2)

console.log("newCart: ",newCart)
    const response3= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body:JSON.stringify(newCart)
      
    })
    console.log("response 3: ",response3.status)
    const data3 = await response3.json()
    console.log(data3)
    
    dispatch({
      type:ADD_ITEM,
      item,
    });
  }
}

export const confirmCart = (username) => {
  return async (dispatch) => {
    
    let url=`carrito?username=${username}`

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      }
      
    })

    console.log(response.status)
    const data = await response.json()
    console.log(data)
    dispatch({
      type:CONFIRM_CART,
    });
  }
}
export const fetchCart = (username) => {
  return async (dispatch) => {
    try {
      let url=`carrito?username=${username}`
      console.log(url)
      const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        }
        
      })
      
      const data = await response.json()
      console.log("cart action ",data)
      const products=data.productos

      products.forEach(item => {
        var descuento;
        if (extractRol(getToken())!="Cliente"){
          descuento=item.descuentoNoSocios
        }else{
          descuento=item.descuentoSocios          
        }
        item.precioVenta=parseFloat(item.precioVenta*(1-descuento)).toFixed(2)
      });

      dispatch({
        type:LOAD_CART,
        items:products, 
      });
     
    } catch (err) {
      console.log(err);
    }
  };
};

/*
export const deleteItem = (cart) => {
  console.log("newCart",cart)
  return async (dispatch) => {
    dispatch({
      type:DELETE_ITEM,
      cart
    });
  }
}
  */
export const deleteFromCart = (username,itemID) => {
  return async (dispatch) => {

    let url=`carrito?username=${username}`

    const response= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url}`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      }
      
    })
    console.log(response.status)
    const data = await response.json()
    console.log(data)
    

    const products=data.productos
    const cleanCart = products.filter(
      (item) => item.idProducto !== itemID
    );
    console.log("clean",cleanCart)
    const newCart={username,productos:cleanCart}
    console.log(newCart)

    let url2=`carrito?username=${username}`

    const response2= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/${url2}`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      }
      
    })

    console.log(response2.status)
    const data2 = await response2.json()
    console.log(data2)

    const response3= await fetch(`${process.env.REACT_APP_DOMINIO_BACK}/carrito`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body:JSON.stringify(newCart)
      
    })
    console.log(response3.status)
    const data3 = await response3.json()
    console.log(data3)


    dispatch({
      type:REMOVE_ITEM,
      items:cleanCart
    });
  }
}