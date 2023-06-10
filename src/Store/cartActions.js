import {
    ADD_TO_CART,
    UPDATE_CART_ITEM_QUANTITY,
    REMOVE_FROM_CART,
    CLEAR_CART
  } from './cartActionTypes';
  
  export const addToCart = (bookItem) => ({
    type: ADD_TO_CART,
    payload: bookItem
  });
  
  export const updateCartItemQuantity = (bookId, quantity) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    payload: { bookId, quantity }
  });
  
  export const removeFromCart = (bookId) => ({
    type: REMOVE_FROM_CART,
    payload: bookId
  });
  
  export const clearCart = () => ({
    type: CLEAR_CART
  });
  