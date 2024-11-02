import { extractRol, getToken } from "../../utils/auth-utils";
import { REMOVE_ITEM,ADD_ITEM,CONFIRM_CART,LOAD_CART } from "../actions/cart.action";
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
        return { ...state, items: action.items};

      case ADD_ITEM:
        console.log(action.item)
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
      case LOAD_CART:
        /*const arrayItemsWithQ=[]
        action.items.forEach(item => {
          if (!arrayItemsWithQ.find(item)){
            item={...item,cantidad:1}
            arrayItemsWithQ.push(item)
          }else{
            arrayItemsWithQ.
            item.quantity++
          }
        });
  */
        return { ...state, items: action.items};
      default:
        return state;
    }
  };

export default CartReducer