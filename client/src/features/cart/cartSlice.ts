import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { cartType, cartItemType } from "@/types/cartType";
import { couponType } from "@/types/cartType";

type initialState = {
  cart: cartType | null;
};
const initialState: initialState = {
  cart: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getAllCart: (state, action: PayloadAction<{ cart: cartType }>) => {
      state.cart = action.payload.cart;
    },
    addCart: (state, action: PayloadAction<{ item: cartItemType }>) => {
      state.cart?.items.push(action.payload.item);
      if (state.cart) {
        state.cart.totalPrice =
          state.cart.totalPrice +
          (state.cart.applyCoupon
            ? action.payload.item.price -
              (action.payload.item.price * state.cart.applyCoupon.discount) /
                100
            : action.payload.item.price);
      }
    },
    deleteItemCart: (state, action: PayloadAction<string>) => {
      if (state.cart) {
        state.cart.items = state.cart?.items.filter(
          (item, index) => item.courseId._id !== action.payload
        );
      }
    },
    applyCoupon: (state, action: PayloadAction<couponType>) => {
      if (state.cart) {
        state.cart.applyCoupon = action.payload;
        state.cart.totalPrice =
          state.cart.totalPrice -
          (state.cart.totalPrice * action.payload.discount) / 100;
      }
    },
    deleteApplyCoupon: (state) => {
      if (state.cart && state.cart.applyCoupon) {
        state.cart.applyCoupon = undefined;
        state.cart.totalPrice = state.cart.items.reduce((total, item) => {
          return total + item.price;
        }, 0);
      }
    },
  },
});

export const {
  getAllCart,
  addCart,
  applyCoupon,
  deleteApplyCoupon,
  deleteItemCart,
} = cartSlice.actions;

export default cartSlice.reducer;
