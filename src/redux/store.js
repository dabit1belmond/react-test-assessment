import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice';

const store = configureStore({
  devTools: process.env.REACT_APP_ENV !== 'production',
  reducer: appReducer,
});

export default store;
