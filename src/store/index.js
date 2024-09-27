import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";


import UsuarioReducer from "./reducers/usuario.reducer";

const RootReducer = combineReducers({

  usuarios: UsuarioReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
