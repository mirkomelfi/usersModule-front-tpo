import { extractDni, extractRol, getToken,extractUsername } from "../../utils/auth-utils";
import { LOGIN_USUARIO,LOGOUT_USUARIO } from "../actions/usuario.action";

const token=getToken()
var dni=null
var rol=null
var username=null
var logged=null
var isAdmin=null

if (token){
  
  username=extractUsername(token)
  dni=extractDni(token)
  rol=extractRol(token)
  logged=true
  if (rol=="ADMIN"){
    isAdmin=true
  }
}

const initialState = {
  isAdmin,
  dni,
  rol,
  username,
  logged
};
  

const UsuarioReducer = (state = initialState, action) => {


    switch (action.type) {
      case LOGIN_USUARIO:
        if (action.rol!="ADMIN"){
          return { ...state, dni: action.dni, rol: action.rol,username:action.username,isAdmin:null,logged:true}; 
        }else{
          return { ...state, dni: action.dni, rol: action.rol,isAdmin:true}; 
        }
      case LOGOUT_USUARIO:
        return { ...state, dni: null, rol: null,username:null,isAdmin:null,logged:null}; 
      default:
        return state;
    }
  };

export default UsuarioReducer