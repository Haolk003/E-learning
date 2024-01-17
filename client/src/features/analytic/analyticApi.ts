import apiSlice from "../api/apiSlice";

const analyticApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    generateAll: build.query({
      query: () => ({
        url: "/analytics/general-all",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    generateAnalyticEarning: build.query({
      query: (period: string) => ({
        url: `/analytics/generate-report?period=${period}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGenerateAnalyticEarningQuery, useGenerateAllQuery } =
  analyticApi;
