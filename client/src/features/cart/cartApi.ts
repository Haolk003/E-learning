import apiSlice from "../api/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: ({ courseId, price }) => ({
        url: "/addToCart",
        method: "POST",
        body: {
          courseId,
          price,
        },
        credentials: "include" as const,
      }),
    }),
    updateToCart: build.mutation({
      query: ({ courseId, price }) => ({
        url: "/updateCart",
        method: "PUT",
        body: {
          courseId,
          price,
        },
        credentials: "include" as const,
      }),
    }),
    deleteCourseInCart: build.mutation({
      query: (courseId) => ({
        url: `/deleteCourseIdInCart/${courseId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    deleteAllCourseInCart: build.mutation({
      query: () => ({
        url: "/deleteAllCourseInCart",
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    applyCouponCart: build.mutation({
      query: (couponCode) => ({
        url: "/apply-coupon-cart",
        method: "PUT",
        body: { couponCode },
        credentials: "include" as const,
      }),
    }),
    getCart: build.query({
      query: () => ({
        url: "/getCart",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useApplyCouponCartMutation,
  useDeleteAllCourseInCartMutation,
  useDeleteCourseInCartMutation,
  useGetCartQuery,
  useUpdateToCartMutation,
} = cartApi;
