import apiSlice from "../api/apiSlice";

const couponApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCoupon: build.mutation({
      query: ({ code, discount, expiryDate }) => ({
        url: "create-coupon",
        method: "POST",
        body: {
          code,
          discount,
          expiryDate,
        },
        credentials: "include" as const,
      }),
    }),
    updateCoupon: build.mutation({
      query: ({ couponId, code, discount, expiryDate }) => ({
        url: `/update-coupon/${couponId}`,
        method: "PUT",
        body: {
          code,
          discount,
          expiryDate,
        },
        credentials: "include" as const,
      }),
    }),
    getCouponDetails: build.query({
      query: (couponId) => ({
        url: `/get-coupon-details/${couponId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCouponById: build.mutation({
      query: (couponId) => ({
        url: `/delete-coupon/${couponId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useDeleteCouponByIdMutation,
  useGetCouponDetailsQuery,
  useUpdateCouponMutation,
} = couponApi;
