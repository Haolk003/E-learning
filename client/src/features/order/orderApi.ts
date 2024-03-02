import apiSlice from "../api/apiSlice";
import useSocket from "@/hooks/useSocket";
const orderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createPaymentIntent: build.mutation({
      query: ({ amount, currency }) => ({
        url: "create-payment-intent",
        method: "POST",
        body: { amount, currency },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, api) {
        try {
          const socket = useSocket();
          const result = await api.queryFulfilled;
          if (socket) {
            socket.emit("notification", result.data.data);
          }
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    createOrder: build.mutation({
      query: ({ courseId, payment_intent_id }) => ({
        url: "create-order",
        method: "POST",
        body: {
          courseId,
          payment_intent_id,
        },
        credentials: "include" as const,
      }),
    }),
    checkPurchaseCourse: build.query({
      query: (courseId) => ({
        url: `/check-purcharse/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    newOrderCart: build.mutation({
      query: (paymentId: string) => ({
        url: "/new-order-cart",
        method: "POST",
        body: { paymentId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
  useCheckPurchaseCourseQuery,
  useNewOrderCartMutation,
} = orderApi;
