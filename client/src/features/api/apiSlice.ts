import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_API,
    method: "PUT,POST,GET,DELETE",
  }),
  endpoints: (build) => ({
    loadUser: build.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;

          api.dispatch(userLoggedIn({ user: result.data.data }));
        } catch (err: any) {
          console.error(err);
        }
      },
    }),
  }),
});
export const { useLoadUserQuery } = apiSlice;
export default apiSlice;
