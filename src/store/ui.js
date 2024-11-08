import { createSlice } from "@reduxjs/toolkit";

const initialUiSlice = { isCartVisible: false };
const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiSlice,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
