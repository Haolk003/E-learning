import apiSlice from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getReviewByCoureId: build.query({
      query: (courseId) => ({
        url: `get-review-courseId/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createReview: build.mutation({
      query: ({ comment, rating, courseId }) => ({
        url: "create-review",
        method: "POST",
        body: { comment, rating, courseId },
        credentials: "include" as const,
      }),
    }),
    getAllReview: build.query({
      query: ({}) => ({
        url: "get-all-reviews",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editReview: build.mutation({
      query: ({ reviewId, comment, star }) => ({
        url: `update-review/${reviewId}`,
        method: "PUT",
        body: { comment, star },
        credentials: "include" as const,
      }),
    }),
    starPercentage: build.query({
      query: (courseId) => ({
        url: `reviews/percentage/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    checkExistReviewPersonal: build.query({
      query: (courseId) => ({
        url: `/reviews/check-exist-review/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllReviewUserId: build.query({
      query: () => ({
        url: "/reviews/get-all-reviews-userId",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetReviewByCoureIdQuery,
  useCreateReviewMutation,
  useEditReviewMutation,
  useGetAllReviewQuery,
  useStarPercentageQuery,
  useCheckExistReviewPersonalQuery,
  useGetAllReviewUserIdQuery,
} = reviewApi;
