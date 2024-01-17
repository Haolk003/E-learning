import apiSlice from "../api/apiSlice";

const interactApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createInteractCourse: build.mutation({
      query: (url) => ({
        url: "logInteraction",
        method: "POST",
        body: { url },
        credentials: "include" as const,
      }),
    }),
    updateInteractEndTime: build.mutation({
      query: (id) => ({
        url: `updateInteractEndTime/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    updatePageView: build.mutation({
      query: ({ id, url }) => ({
        url: `updateInteractPageView/${id}`,
        method: "PUT",
        body: { url },
        credentials: "include" as const,
      }),
    }),
    updateInteractionPageView: build.mutation({
      query: ({ id, interation }) => ({
        url: `updateInteractionPageView/${id}`,
        method: "PUT",
        body: { interation },
        credentials: "include" as const,
      }),
    }),
    updateTimeSpent: build.mutation({
      query: ({ id, timeSpent }) => ({
        url: `updateTimeSpent/${id}`,
        method: "PUT",
        body: { timeSpent },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateInteractCourseMutation,
  useUpdatePageViewMutation,
  useUpdateInteractEndTimeMutation,
  useUpdateInteractionPageViewMutation,
  useUpdateTimeSpentMutation,
} = interactApi;
