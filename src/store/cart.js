import { createSlice } from "@reduxjs/toolkit";

const intialCartState = { isShowingModal: false };
const cartSlice = createSlice({
  name: "cart",
  initialState: intialCartState,
  reducers: {
    toggle(state) {
      state.isShowingModal = !state.isShowingModal;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
