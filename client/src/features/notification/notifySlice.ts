import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { notifyType } from "@/types/notifyType";
type initialState = {
  notifies: notifyType[];
};
const initialState: initialState = {
  notifies: [],
};
const notifySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getAllNotify: (
      state,
      action: PayloadAction<{ notifies: notifyType[] }>
    ) => {
      state.notifies = action.payload.notifies;
    },
    addNotify: (state, action: PayloadAction<{ notify: notifyType }>) => {
      state.notifies = [action.payload.notify, ...state.notifies];
    },
    deleteNotify: (state, action: PayloadAction<string>) => {
      state.notifies = state.notifies.filter(
        (item) => item._id !== action.payload
      );
    },
    updateNotify: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const indexUpdate = state.notifies.findIndex(
        (item) => item._id === action.payload.id
      );
      if (indexUpdate !== -1) {
        state.notifies[indexUpdate].status = action.payload.status;
      }
    },
  },
});

export const { getAllNotify, updateNotify, deleteNotify, addNotify } =
  notifySlice.actions;

export default notifySlice.reducer;
