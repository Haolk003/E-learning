import { UserType } from "@/types/userType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type registerUserType = {
  firstName: string;
  lastName: string;
  email: string;
};
type initialState = {
  user: UserType | null;
  token: string;
  userRegister: registerUserType | null;
};
const intialState: initialState = {
  user: null,
  token: "",
  userRegister: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
    },
    userLoggout: (state) => {
      state.user = null;
    },
    userRegister: (
      state,
      action: PayloadAction<{ token: string; user: registerUserType }>
    ) => {
      state.token = action.payload.token;
      state.userRegister = action.payload.user;
    },
    updateProfile: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user;
    },
  },
});
export const { userLoggedIn, userLoggout, userRegister, updateProfile } =
  authSlice.actions;

export default authSlice.reducer;
