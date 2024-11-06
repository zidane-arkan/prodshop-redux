import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cart";
import productSliceReducer from "./product";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    product: productSliceReducer,
  },
});

export default store;
