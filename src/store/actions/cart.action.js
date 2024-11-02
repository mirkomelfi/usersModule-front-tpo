export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CONFIRM_CART = "CONFIRM_CART";
export const DELETE_ITEM = "DELETE_ITEM";

export const addToCart = (item) => {
  return async (dispatch) => {
    dispatch({
      type:ADD_ITEM,
      item,
    });
  }
}

export const confirmCart = () => {
  return async (dispatch) => {
    dispatch({
      type:CONFIRM_CART,
    });
  }
}
/*
export const deleteItem = (cart) => {
  console.log("newCart",cart)
  return async (dispatch) => {
    dispatch({
      type:DELETE_ITEM,
      cart
    });
  }
}
  */
export const deleteFromCart = (itemID) => {
  return async (dispatch) => {
    dispatch({
      type:REMOVE_ITEM,
      itemID
    });
  }
}