"use client";

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "@/features/api/apiSlice";
import authSlice from "@/features/auth/authSlice";
import layoutSlice from "@/features/layout/layoutSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    layout: layoutSlice,
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
