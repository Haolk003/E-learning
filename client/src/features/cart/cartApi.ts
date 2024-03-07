import apiSlice from "../api/apiSlice";
import { courseApi } from "../course/courseApi";

import {
  getAllCart,
  addCart,
  applyCoupon,
  deleteApplyCoupon,
  deleteItemCart,
} from "./cartSlice";

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
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;
          api.dispatch(
            addCart({
              item: {
                courseId: result.data.data,
                price: result.data.data.price,
              },
            })
          );
        } catch (err: any) {
          console.error(err);
        }
      },
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
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;
          api.dispatch(deleteItemCart(result.data.data));
        } catch (err: any) {
          console.error(err);
        }
      },
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
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;
          api.dispatch(applyCoupon(result.data.data));
        } catch (err: any) {
          console.error(err);
        }
      },
    }),
    getCart: build.query({
      query: () => ({
        url: "/getCart",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;

          api.dispatch(getAllCart({ cart: result.data.data }));
        } catch (err: any) {
          console.error(err.message);
        }
      },
    }),
    deleteCouponInCart: build.mutation({
      query: (couponId: string) => ({
        url: "/delete-coupon-in-cart",
        method: "PUT",
        body: { couponId },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const result = await api.queryFulfilled;
          api.dispatch(deleteApplyCoupon());
        } catch (err: any) {
          console.error(err);
        }
      },
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
  useDeleteCouponInCartMutation,
} = cartApi;
