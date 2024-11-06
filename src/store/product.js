import { createSlice } from "@reduxjs/toolkit";
import DUMMY_PRODUCTS from "../dummy-data";
const initialProductState = { productItems: [...DUMMY_PRODUCTS] };
const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    getProducts(state) {
      state.productItems = [...state.productItems];
    },
  },
});

export const productAction = productSlice.actions;
export default productSlice.reducer;
