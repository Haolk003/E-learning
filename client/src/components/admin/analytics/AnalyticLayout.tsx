import React from "react";
import MetricSum from "./MetricSum";
import DevicePieChart from "./DevicePieChart";
import SessionBounceRateChart from "./SessionBounceRateChart";
import SessionNewUser from "./SessionNewUser";
import TrafficSources from "./TrafficSource";
import CountrySessions from "./CountriesSession";

const AnalyticLayout = () => {
  return (
    <div className="px-5">
      <h2 className="text-2xl mb-7 font-bold">Analytics</h2>
      <div className="flex gap-10">
        <div className="w-[65%]">
          <div className="">
            <MetricSum />
            <SessionBounceRateChart />
            <SessionNewUser />
          </div>
        </div>
        <div className="w-[35%]">
          <DevicePieChart />
          <TrafficSources />
          <CountrySessions />
        </div>
      </div>
    </div>
  );
};

export default AnalyticLayout;
