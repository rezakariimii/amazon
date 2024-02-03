"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      const existingItem = state.items.find(
        (item) => item.slug === newItem.slug
      );
      if (!existingItem) {
        state.items.push({
          slug: newItem.slug,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.slug === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.slug !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    calculateTotalPrice(state) {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
  },
});

export const { addItemToCart, removeItemFromCart, calculateTotalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;
