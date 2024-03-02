"use client";

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "@/features/api/apiSlice";
import authSlice from "@/features/auth/authSlice";
import layoutSlice from "@/features/layout/layoutSlice";
import cartSlice from "@/features/cart/cartSlice";
import notifySlice from "@/features/notification/notifySlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    layout: layoutSlice,
    cart: cartSlice,
    notify: notifySlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
