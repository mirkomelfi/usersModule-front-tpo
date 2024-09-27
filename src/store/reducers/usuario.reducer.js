import { LOGIN_USUARIO,LOGOUT } from "../actions/usuario.action";

const initialState = {
  logged:null,
  isAdmin:true,
};
  

const UsuarioReducer = (state = initialState, action) => {


    switch (action.type) {
      case LOGIN_USUARIO:
        return { ...state, logged: action.usuario}; 
      case LOGOUT:
        return { ...state, logged:null}; 

      default:
        return state;
    }
  };

export default UsuarioReducer