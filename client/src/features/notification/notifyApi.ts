import apiSlice from "../api/apiSlice";

const notifyApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    updateStatusNotify: build.mutation({
      query: (id: string) => ({
        url: `/update-status-notify/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    getAllNotifyUser: build.query({
      query: () => ({
        url: "/get-all-notify-user",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getDetailNotify: build.query({
      query: (id: string) => ({
        url: `/get-notify-id/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteNotify: build.mutation({
      query: (id: string) => ({
        url: `/delete-notify/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateStatusNotifyMutation,
  useDeleteNotifyMutation,
  useGetAllNotifyUserQuery,
  useGetDetailNotifyQuery,
} = notifyApi;
