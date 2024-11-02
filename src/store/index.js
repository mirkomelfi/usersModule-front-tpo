import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";


import UsuarioReducer from "./reducers/usuario.reducer";
import CartReducer from "./reducers/cart.reducer";
import CommerceReducer from "./reducers/commerce.reducer";

const RootReducer = combineReducers({
  cart: CartReducer,
  usuarios: UsuarioReducer,
  //commerce: CommerceReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
