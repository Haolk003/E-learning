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
          console.error(err);
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
          console.error(err);
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
    becomeInstructor: build.mutation({
      query: () => ({
        url: "become-instructor",
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    getProfileInstructor: build.query({
      query: (id: string) => ({
        url: `/get-profile-instructor/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getTopInstructor: build.query({
      query: () => ({
        url: "/get-top-instructor",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllNewStudent: build.query({
      query: () => ({
        url: "/get-all-students",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
  useBecomeInstructorMutation,
  useGetProfileInstructorQuery,
  useGetAllNewStudentQuery,
  useGetTopInstructorQuery,
} = userApi;
