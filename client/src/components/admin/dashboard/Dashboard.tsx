"use client";

import ProductTrendsChart from "@/components/ui/chart/ChartLineDashboard";
import React, { useEffect } from "react";
import Categories from "./Categories";
import SummaryMetrics from "./SummaryMetrics";
import EarningReport from "./EarningReport";
import { useCreateInteractCourseMutation } from "@/features/interact/InteractApi";

const Dashboard = () => {
  const [createInteractCourse, { data, isLoading }] =
    useCreateInteractCourseMutation();

  useEffect(() => {
    createInteractCourse("");
  }, []);
  async function getData() {
    const res = await fetch("https://api.ipify.org/?format=json");
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    res.json().then((data) => console.log(data.ip));
  }

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <div className="px-4 py-4 dark:bg-[rgb(37,39,41)] w-full h-full">
      <h2 className="text-xl dark:text-gray11 text-gray3">Course</h2>
      <div className="flex gap-5 mt-3">
        <div className="w-[60%]">
          <Categories />
          <EarningReport />
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
