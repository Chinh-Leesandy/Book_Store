import {
    ADD_TO_CART,
    UPDATE_CART_ITEM_QUANTITY,
    REMOVE_FROM_CART,
    CLEAR_CART
  } from './cartActionTypes';
  
  const initialState = {
    cartItems: []
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const { payload: bookItem } = action;
        const existingCartItem = state.cartItems.find(item => item.id === bookItem.id);
        if (existingCartItem) {
          return {
            ...state,
            cartItems: state.cartItems.map(item => {
              if (item.id === bookItem.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          };
        } else {
          const newCartItem = { ...bookItem, quantity: 1 };
          return {
            ...state,
            cartItems: [...state.cartItems, newCartItem]
          };
        }
  
      case UPDATE_CART_ITEM_QUANTITY:
        const { payload: { bookId, quantity } } = action;
        return {
          ...state,
          cartItems: state.cartItems.map(item => {
            if (item.id === bookId) {
              return { ...item, quantity };
            }
            return item;
          })
        };
  
      case REMOVE_FROM_CART:
        const { payload: removedBookId } = action;
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== removedBookId)
        };
  
      case CLEAR_CART:
        return {
          ...state,
          cartItems: []
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  