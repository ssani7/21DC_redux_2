/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  products: IProduct[];
  total: number;
}

const initialState: CartState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const exists = state.products.find((p) => p._id === action.payload._id);

      if (exists) {
        exists.quantity = exists?.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity!;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const exists = state.products.find((p) => p._id === action.payload._id);

      if (exists && exists.quantity! > 1) {
        exists.quantity = exists?.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (p) => p._id !== action.payload._id
        );
      }

      state.total -= action.payload.price;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
