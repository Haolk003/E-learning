import apiSlice from "../api/apiSlice";
import { getAllCategory } from "./categorySlice";
export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: "/get-all-categories",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        const result = await api.queryFulfilled;
        api.dispatch(getAllCategory({ categories: result.data.data }));
      },
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
    getAllSubCategory: build.query({
      query: (categoryId) => ({
        url: `/get-all-subCategory-categoryId/${categoryId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateCategoryById: build.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { name?: string; description?: string };
      }) => ({
        url: `/update-category/${id}`,
        method: "PUT",
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
  useGetAllSubCategoryQuery,
  useUpdateCategoryByIdMutation,
} = categoryApi;
