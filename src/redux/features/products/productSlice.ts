import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductState {
  status: boolean;
  priceRange: number;
}

const initialState: ProductState = {
  status: false,
  priceRange: 1000000,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    changePriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleStatus, changePriceRange } = productSlice.actions;
export default productSlice.reducer;
