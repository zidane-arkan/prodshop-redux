import { createSlice } from "@reduxjs/toolkit";
import DUMMY_PRODUCTS from "../dummy-data";

const intialCartState = { cartItems: [], isShowingModal: false };
const cartSlice = createSlice({
  name: "cart",
  initialState: intialCartState,
  reducers: {
    toggle(state) {
      state.isShowingModal = !state.isShowingModal;
    },
    addItems(state, action) {
      const newCartItems = [...state.cartItems];

      const updatedItemIndex = newCartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (updatedItemIndex) {
        const updatedItem = newCartItems[updatedItemIndex];
        updatedItem.quantity += 1;
        newCartItems[updatedItemIndex] = updatedItem;
      } else {
        const newItem = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload
        );
        newCartItems.push(newItem);
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
