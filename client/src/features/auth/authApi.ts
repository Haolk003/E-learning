import apiSlice from "../api/apiSlice";
import { userLoggedIn, userLoggout, userRegister } from "./authSlice";
const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: ({ email, password }) => ({
        url: "login-user",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;
          api.dispatch(userLoggedIn({ user: result.data.user }));
        } catch (err: any) {
          console.log(err.data.message);
        }
      },
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          api.dispatch(userLoggout());
        } catch (err: any) {
          console.log(err.message);
        }
      },
    }),
    registerUser: build.mutation({
      query: ({ email, password, firstName, lastName }) => ({
        url: "register",
        method: "POST",
        body: { email, password, firstName, lastName },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;
          console.log(result);
          api.dispatch(
            userRegister({
              token: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err: any) {
          console.log(err.message);
        }
      },
    }),
    resendEmail: build.mutation({
      query: (data) => ({
        url: "resend-email",
        method: "POST",
        data: data,
        credentials: "include" as const,
      }),
    }),
    verifyAccount: build.mutation({
      query: (data) => ({
        url: "verify-user",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useVerifyAccountMutation,
} = authApi;
