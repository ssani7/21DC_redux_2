import { configureStore } from '@reduxjs/toolkit';
import cartReducers from './features/cart/cartSlice';
import productReducers from './features/products/productSlice';
import { productsAPI } from './api';

const store = configureStore({
  reducer: {
    cart: cartReducers,
    products: productReducers,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
