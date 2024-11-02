
export const LOGIN_USUARIO = "LOGIN_USUARIO";
export const LOGIN_INSPECTOR = "LOGIN_INSPECTOR";
export const LOGOUT = "LOGOUT";
export const CLEAN_ERROR = "CLEAN_ERROR";
export const REGISTER_USUARIO = "REGISTER_USUARIO";
export const LOAD_USUARIO = "LOAD_USUARIO";
export const LOAD_USUARIOS = "LOAD_USUARIOS";

const URL_API=1

export const loginUsuario = (dni,rol,username) => {
  return async (dispatch) => {
  dispatch({
    type:LOGIN_USUARIO,
    dni,
    username,
    rol 
  });
}
 

  /*return async (dispatch) => {
    const response=await fetch(
      `${process.env.REACT_APP_DOMINIO_BACK}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      }
    );

    if (response.status==200){
      const data = await response.json()
      console.log(data)
      setToken(data.token)
      dispatch({
        type:LOGIN_USUARIO,
        usuario:data, 
      });
    }else{
      const data = await response.json()
      console.log(data)
      dispatch({
        type:LOGIN_USUARIO,
        usuario:null, 
      });
    }
*/
/*
    try {
      const response = await fetch(`${URL_API}/loginUsuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(cliente)
      });
      const result = await response.json();
      if(response.status!=200){
        dispatch({
          type:LOGIN_USUARIO,
          usuario:null, 
        });
      }else{

        dispatch({
          type:LOGIN_USUARIO,
          usuario:result, 
        });
      }    
     
    } catch (err) {
      console.log(err);
    }*/

};




export const getUsuarioByDni = (dni) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL_API}/usuarios/${dni}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = await response.json();

      dispatch({
        type:LOAD_USUARIO,
        usuario:result, 
      });
     
    } catch (err) {
      console.log(err);
    }
  };
};


export const getUsuarios = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL_API}/usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = await response.json();



      dispatch({
        type:LOAD_USUARIOS,
        usuarios:result.rows._array,  
      });
     
    } catch (err) {
      console.log(err);
    }
  };
};

