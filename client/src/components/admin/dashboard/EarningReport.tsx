import React, { useState } from "react";
import ToggleGroupEarningReport from "@/components/ui/toggleGroup/ToggleGroupEarningReport";
import ProductTrendsChart from "@/components/ui/chart/ChartLineDashboard";

import { useGenerateAnalyticEarningQuery } from "@/features/analytic/analyticApi";
const EarningReport = () => {
  const [periodEarning, setPeriodEarning] = useState("1M");
  const handleChangePeriod = (value: string) => {
    setPeriodEarning(value);
  };
  const { data } = useGenerateAnalyticEarningQuery(periodEarning);
  console.log(data);
  return (
    <div className="bg-gray2 rounded-lg mt-4 ">
      <div className="py-3 px-4 flex items-center justify-between">
        <h2 className="headingAdmin !text-[13px]">Earnings Report</h2>
        <div className="flex">
          <ToggleGroupEarningReport
            period={periodEarning}
            handleChange={handleChangePeriod}
          />
        </div>
      </div>
      <div className="px-3 py-2">
        {data && <ProductTrendsChart data={data.data} period={periodEarning} />}
      </div>
    </div>
  );
};

export default EarningReport;
