"use client";

import ProductTrendsChart from "@/components/ui/chart/ChartLineDashboard";
import React from "react";
import Categories from "./Categories";
import SummaryMetrics from "./SummaryMetrics";

const Dashboard = () => {
  return (
    <div className="px-4 py-4 dark:bg-[rgb(37,39,41)] w-full h-full">
      <h2 className="text-xl dark:text-gray11 text-gray3">Course</h2>
      <div className="flex gap-5 mt-3">
        <div className="w-[60%]">
          <Categories />
        </div>
        <div className="w-[40%]">
          <SummaryMetrics />
        </div>
      </div>

      {/* <ProductTrendsChart /> */}
    </div>
  );
};

export default Dashboard;
