import { extractRol, getToken } from "../../utils/auth-utils";
import { REMOVE_ITEM,ADD_ITEM,CONFIRM_CART } from "../actions/cart.action";
const initialState = {
  items:[]
};
var rol;
if (getToken()){
  rol=extractRol(getToken())
}

const CartReducer = (state = initialState, action) => {


    switch (action.type) {
      case REMOVE_ITEM:
        console.log(action.itemID)
        const cleanCart = [...state.items].filter(
          (item) => item.idProducto !== action.itemID
        );
        console.log(cleanCart)
        return { ...state, items: cleanCart};

      case ADD_ITEM:
        const item = { ...action.item};
        var descuento;
        if (rol!="Cliente"){
          descuento=item.descuentoNoSocios
        }else{
          descuento=item.descuentoSocios          
        }
        item.precioVenta=parseFloat(item.precioVenta*(1-descuento)).toFixed(2)
        const updateCart = [...state.items, item];
        return { ...state, items: updateCart}; 

      case CONFIRM_CART:
        return { ...state, items: []};

      default:
        return state;
    }
  };

export default CartReducer