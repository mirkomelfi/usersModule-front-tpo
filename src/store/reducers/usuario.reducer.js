import { LOGIN_USUARIO,LOGOUT } from "../actions/usuario.action";

const initialState = {
  logged:null,
  isAdmin:null,
  dni:null,
  rol:null
};
  

const UsuarioReducer = (state = initialState, action) => {


    switch (action.type) {
      case LOGIN_USUARIO:
        if (action.rol!="ADMIN"){
          return { ...state, dni: action.dni, rol: action.rol,isAdmin:null}; 
        }else{
          return { ...state, dni: action.dni, rol: action.rol,isAdmin:true}; 
        }
      case LOGOUT:
        return { ...state, logged:null}; 

      default:
        return state;
    }
  };

export default UsuarioReducer