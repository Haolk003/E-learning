import React, { useState } from "react";
import ToggleGroupEarningReport from "@/components/ui/toggleGroup/ToggleGroupEarningReport";
import ProductTrendsChart from "@/components/ui/chart/ChartLineDashboard";

import { useGenerateAnalyticEarningQuery } from "@/features/analytic/analyticApi";

const dateRangeData = [
  {
    label: "D",
    value: "D",
  },
  {
    label: "1M",
    value: "1M",
  },
  {
    label: "6M",
    value: "6M",
  },
  {
    label: "1Y",
    value: "1Y",
  },
  {
    label: "All",
    value: "all",
  },
];
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
            data={dateRangeData}
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
