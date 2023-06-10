import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cartReducer from './cartReducer';

const store = configureStore({
    reducer: cartReducer,
    middleware: [thunk]
  });

export default store;
