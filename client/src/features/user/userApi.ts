import apiSlice from "../api/apiSlice";
import { updateProfile } from "../auth/authSlice";
const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation({
      query: (data) => ({
        url: "updateProfileUser",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const result = (await api.queryFulfilled).data;

          api.dispatch(updateProfile({ user: result.data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateAvatar: build.mutation({
      query: (data) => ({
        url: "update-avatar-profile",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const result = (await api.queryFulfilled).data;

          api.dispatch(updateProfile({ user: result.data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updatePassword: build.mutation({
      query: ({ newPassword, oldPassword }) => ({
        url: "update-password",
        method: "PUT",
        body: { newPassword, oldPassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
} = userApi;
