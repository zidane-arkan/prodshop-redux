import { createSlice } from "@reduxjs/toolkit";

const initialUiSlice = {
  isCartVisible: false,
  notificationStatus: null,
};
const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiSlice,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    handleNotification(state, action) {
      state.notificationStatus = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
