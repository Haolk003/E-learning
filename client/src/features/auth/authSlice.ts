import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  bio?: string;
  headline?: string;
  linkedin?: string;
  facebookLink?: string;
  youtubeLink?: string;
  twitterLink?: string;
  website?: string;
  loginType: string;
};
type registerUserType = {
  firstName: string;
  lastName: string;
  email: string;
};
type initialState = {
  user: IUser | null;
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
    userLoggedIn: (state, action: PayloadAction<{ user: IUser }>) => {
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
    updateProfile: (state, action: PayloadAction<{ user: IUser }>) => {
      state.user = action.payload.user;
    },
  },
});
export const { userLoggedIn, userLoggout, userRegister, updateProfile } =
  authSlice.actions;

export default authSlice.reducer;
