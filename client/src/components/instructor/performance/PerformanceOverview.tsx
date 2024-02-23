"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useGenerateAnalyticsEarningForIntructorQuery,
  useGenerateAnalyticReviewForIntructorQuery,
} from "@/features/analytic/analyticApi";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ChartLineIntructor from "@/components/ui/chart/ChartLineInstructor";
import ToggleGroupEarningReport from "@/components/ui/toggleGroup/ToggleGroupEarningReport";
import useUpdateQueryString from "@/hooks/useUpdateQueryString";
import Loader from "@/components/loader/Loader";
type Props = {
  slug: string;
};
const dateRangeData = [
  {
    label: "7D",
    value: "7D",
  },
  {
    label: "30D",
    value: "30D",
  },
  {
    label: "12M",
    value: "1Y",
  },

  {
    label: "All",
    value: "all",
  },
];
const PerformanceOverview: React.FC<Props> = ({ slug }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [periodEarning, setPeriodEarning] = useState(
    searchParams.get("period") || "7D"
  );

  const { data, isLoading } =
    useGenerateAnalyticsEarningForIntructorQuery(periodEarning);
  const { data: reviews, isLoading: isLoadingReview } =
    useGenerateAnalyticReviewForIntructorQuery(periodEarning);

  const handleChangePeriod = (value: string) => {
    setPeriodEarning(value);

    const params = new URLSearchParams(searchParams.toString());
    router.push(pathname + "?" + useUpdateQueryString(params, "period", value));
  };

  return (
    <div className="px-10">
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <p>Get top insights about your performance</p>
      <div className="dark:bg-gray2 bg-white rounded-lg mt-4 ">
        <div
          className={`border-b p-5 dark:border-gray8 border-gray4 flex items-center gap-4 ${
            slug === "revenue"
              ? "dark:text-white text-black"
              : "dark:text-gray8 text-gray2"
          }`}
        >
          <Link
            href={`/instructor/performance/overview/revenue`}
            className="flex flex-col cursor-pointer gap-1"
          >
            <h4 className="text-[15px]">Total revenue</h4>
            <p className="text-2xl">$0.00</p>
            <p className="text-[14px]">$0.00 this month</p>
          </Link>

          <Link
            href={`/instructor/performance/overview/enrollments`}
            className={`flex flex-col cursor-pointer  gap-1 ${
              slug === "enrollments"
                ? "dark:text-white text-black"
                : "dark:text-gray8 text-gray2"
            }`}
          >
            <h4 className="text-[15px]">Total enrollments</h4>
            <p className="text-2xl">0</p>
            <p className="text-[14px]">0 this month</p>
          </Link>

          <Link
            href={`/instructor/performance/overview/rating`}
            className={`flex flex-col cursor-pointer gap-1 ${
              slug === "rating"
                ? "dark:text-white text-black"
                : "dark:text-gray8 text-gray2"
            }`}
          >
            <h4 className="text-[15px]">Intructor rating</h4>
            <p className="text-2xl">0.00</p>
            <p className="text-[14px]">0 ratings this month</p>
          </Link>
        </div>
        <div className="px-3 py-2">
          <div className="flex justify-end w-full mb-4">
            <ToggleGroupEarningReport
              data={dateRangeData}
              handleChange={handleChangePeriod}
              period={periodEarning}
            />
          </div>
          {data && slug !== "rating" && (
            <ChartLineIntructor
              data={data.data}
              period={periodEarning}
              type={slug}
            />
          )}
          {reviews && slug === "rating" && (
            <ChartLineIntructor
              data={reviews.data}
              period={periodEarning}
              type={slug}
            />
          )}
        </div>
      </div>
      {(isLoading || isLoadingReview) && (
        <div className="fixed top-0 left-0 bg-blackA6 h-screen w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PerformanceOverview;
