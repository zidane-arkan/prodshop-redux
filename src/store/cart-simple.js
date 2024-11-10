import { createSlice } from "@reduxjs/toolkit";

const initalCartState = { cartItems: [], totalQuantity: 0 };
const cartSliceSimple = createSlice({
  name: "cartSimple",
  initialState: initalCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
    },
    reduceItemInCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      // const existingItemIndex = state.cartItems.findIndex(
      //   (item) => item.id === action.payload
      // );
      existingItem.quantity--;
      existingItem.totalPrice -= existingItem.price;
      if (existingItem.quantity < 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== existingItem.id
        );
      }
    },
  },
});

export const cartSimpleActions = cartSliceSimple.actions;
export default cartSliceSimple.reducer;
