import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "@/types/categoryType";
type initialState = {
  categories: CategoryType[];
};
const initialState: initialState = {
  categories: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getAllCategory: (
      state,
      action: PayloadAction<{ categories: CategoryType[] }>
    ) => {
      state.categories = action.payload.categories;
    },
  },
});

export const { getAllCategory } = categorySlice.actions;

export default categorySlice.reducer;
