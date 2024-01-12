import apiSlice from "../api/apiSlice";

const analyticApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    generateLastMonth: build.query({
      query: () => ({
        url: "/analytics/general-all",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    generateAnalyticEarning: build.query({
      query: (data: string) => ({
        url: "/analytics/generate-report",
        method: "GET",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGenerateAnalyticEarningQuery, useGenerateLastMonthQuery } =
  analyticApi;
