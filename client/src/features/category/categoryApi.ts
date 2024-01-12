import apiSlice from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: "/get-all-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCategoryById: build.query({
      query: (id) => ({
        url: `/get-category-id/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/delete-category/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    newCategory: build.mutation({
      query: (data) => ({
        url: "/new-category",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
  useNewCategoryMutation,
} = categoryApi;
