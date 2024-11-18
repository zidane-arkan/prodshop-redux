import { createSlice } from "@reduxjs/toolkit";
import { uiSliceActions } from "./ui";

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

export const sendCartData = (cartItems) => {
  return async (dispatcher) => {
    dispatcher(
      uiSliceActions.handleNotification({
        status: "pending",
        title: "Pending...",
        message: "Pending sending data...",
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        "https://prodshop-redux-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          body: JSON.stringify(cartItems),
          method: "PUT",
        }
      );
      if (!res.ok) {
        throw new Error("An error occured! Sending Cart Data Failed!");
      }
    };
    try {
      await sendRequest();
      dispatcher(
        uiSliceActions.handleNotification({
          status: "success",
          title: "Success...",
          message: "Successfully sending data.",
        })
      );
    } catch (error) {
      dispatcher(
        uiSliceActions.handleNotification({
          status: "error",
          title: "Error Occured...",
          message: error.message,
        })
      );
    }
    // const responseData = await res.json();
    // return responseData;
  };
};

export const cartSimpleActions = cartSliceSimple.actions;
export default cartSliceSimple.reducer;
