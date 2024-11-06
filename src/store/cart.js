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
      const updatedItem = newCartItems[updatedItemIndex];
      if (updatedItem) {
        updatedItem.quantity += 1;
        newCartItems[updatedItemIndex] = updatedItem;
      } else {
        const newItem = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload
        );
        newCartItems.push({ quantity: 1, ...newItem });
        state.cartItems = newCartItems;
      }
    },
    incrementItem(state, action) {
      const updatedCartItems = [...state.cartItems];
      const updatedCartItemIndex = updatedCartItems.findIndex(
        (item) => item.id === action.payload
      );

      const updatedCartItem = updatedCartItems[updatedCartItemIndex];
      updatedCartItem.quantity += 1;

      updatedCartItems[updatedCartItemIndex] = updatedCartItem;
      state.cartItems = updatedCartItems;
    },
    decreaseItem(state, action) {
      const updatedCartItems = [...state.cartItems];
      const updatedCartItemIndex = updatedCartItems.findIndex(
        (item) => item.id === action.payload
      );

      const updatedCartItem = updatedCartItems[updatedCartItemIndex];
      updatedCartItem.quantity -= 1;

      updatedCartItems[updatedCartItemIndex] = updatedCartItem;
      state.cartItems = updatedCartItems;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
