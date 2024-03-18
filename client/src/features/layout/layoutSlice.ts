import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: { open: false },
  reducers: {
    openLogin: (state, action) => {
      state.open = true;
    },
    closeLogin: (state, action) => {
      state.open = false;
    },
  },
});

export const { closeLogin, openLogin } = layoutSlice.actions;

export default layoutSlice.reducer;
