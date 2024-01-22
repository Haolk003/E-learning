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
    calculateMonthBounceSession: build.query({
      query: () => ({
        url: "analytics/calculate-month-bounce-session",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    calculateDevideTypePercentTage: build.query({
      query: () => ({
        url: "/analytics/calculate-devide-type-percentTage",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    calculateMonthNewUserSession: build.query({
      query: () => ({
        url: "/analytics/calculate-month-newUser-session",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    generateBrowser: build.query({
      query: () => ({
        url: "/analytics/generate-browser",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    calculateSumMetrics: build.query({
      query: () => ({
        url: "/analytics/calculate-sum-metrics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    calculateSumUser: build.query({
      query: () => ({
        url: "/analytics/calculate-sum-user",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGenerateAnalyticEarningQuery,
  useGenerateAllQuery,
  useCalculateDevideTypePercentTageQuery,
  useCalculateMonthBounceSessionQuery,
  useCalculateMonthNewUserSessionQuery,
  useGenerateBrowserQuery,
  useCalculateSumMetricsQuery,
  useCalculateSumUserQuery,
} = analyticApi;
