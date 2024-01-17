import React from "react";
import ToggleGroupEarningReport from "@/components/ui/toggleGroup/ToggleGroupEarningReport";
import ProductTrendsChart from "@/components/ui/chart/ChartLineDashboard";

import { useGenerateAnalyticEarningQuery } from "@/features/analytic/analyticApi";
const EarningReport = () => {
  const { data } = useGenerateAnalyticEarningQuery("1M");
  console.log(data);
  return (
    <div className="bg-gray2 rounded-lg mt-4 ">
      <div className="py-3 px-4 flex items-center justify-between">
        <h2 className="headingAdmin !text-[13px]">Earnings Report</h2>
        <div className="flex ">
          <ToggleGroupEarningReport />
        </div>
      </div>
      <div className="px-3 py-2">
        <ProductTrendsChart />
      </div>
    </div>
  );
};

export default EarningReport;
