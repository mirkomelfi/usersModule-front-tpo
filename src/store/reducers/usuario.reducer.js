import { extractDni, extractRol, getToken,extractUsername } from "../../utils/auth-utils";
import { LOGIN_USUARIO,LOGOUT } from "../actions/usuario.action";

const token=getToken()
var dni=null
var rol=null
var username=null
var isAdmin=null

if (token){
  
  username=extractUsername(token)
  dni=extractDni(token)
  rol=extractRol(token)
  if (rol=="ADMIN"){
    isAdmin=true
  }
}

const initialState = {
  isAdmin,
  dni,
  rol,
  username
};
  

const UsuarioReducer = (state = initialState, action) => {


    switch (action.type) {
      case LOGIN_USUARIO:
        if (action.rol!="ADMIN"){
          return { ...state, dni: action.dni, rol: action.rol,username:action.username,isAdmin:null}; 
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