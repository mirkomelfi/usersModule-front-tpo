import { UPDATE_PRODUCTS,UPDATE_VENTAS,LOAD_PRODUCTOS} from "../actions/commerce.action";
const initialState = {
  productos:[],
  ventas:[]
};


const CommerceReducer = (state = initialState, action) => {

    switch (action.type) {
      case UPDATE_PRODUCTS:
        return { ...state, productos: action.productos};
      case UPDATE_VENTAS:
        return { ...state, ventas: action.ventas};
      case LOAD_PRODUCTOS:
        return { ...state, productos: action.productos};
      default:
        return state;
    }
  };

export default CommerceReducer