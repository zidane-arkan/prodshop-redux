import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cart";
import cartSliceSimpleReducer from "./cart-simple";
import uiSliceReducer from "./ui";
import productSliceReducer from "./product";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    cartSimple: cartSliceSimpleReducer,
    ui: uiSliceReducer,
    product: productSliceReducer,
  },
});

export default store;
