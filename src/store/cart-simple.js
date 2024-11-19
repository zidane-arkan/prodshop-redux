import { createSlice } from "@reduxjs/toolkit";
import { uiSliceActions } from "./ui";

const initalCartState = { cartItems: [], totalQuantity: 0, changed: false };
const cartSliceSimple = createSlice({
  name: "cartSimple",
  initialState: initalCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartItems = action.payload.cartItems;
      state.changed = false;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      if (state.cartItems === undefined) {
        state.cartItems = [];
      }
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.items.id
      );
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.items.id,
          title: newItem.items.title,
          quantity: 1,
          price: newItem.items.price,
          totalPrice: newItem.items.price,
        });
        state.totalQuantity += 1;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
      state.changed = true;
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
        state.totalQuantity -= 1;
      }
      state.changed = true;
    },
  },
});

export const getAllCartData = () => {
  return async (dispatcher) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://prodshop-redux-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error("An error occured! Gets Cart Data Failed!");
      }
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatcher(cartSimpleActions.replaceCart(cartData));
    } catch (error) {
      dispatcher(
        uiSliceActions.handleNotification({
          status: "error",
          title: "Error Occured...",
          message: error.message,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
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
          body: JSON.stringify({
            cartItems: cart.cartItems,
            totalQuantity: cart.totalQuantity,
          }),
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
