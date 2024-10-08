import { extractDni, extractRol, getToken } from "../../utils/auth-utils";
import { LOGIN_USUARIO,LOGOUT } from "../actions/usuario.action";

const token=getToken()
var dni=null
var rol=null
var isAdmin=null

if (token){
  dni=extractDni(token)
  rol=extractRol(token)
  if (rol=="ADMIN"){
    isAdmin=true
  }
}

const initialState = {
  isAdmin,
  dni,
  rol
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