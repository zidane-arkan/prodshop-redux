import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialCartState = { isShowingModal: true };
const cartSlice = createSlice({
  name: "cart",
  intialState: intialCartState,
  reducers: {
    toggle(state) {
      state.isShowingModal = !state.isShowingModal;
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
export default store;
