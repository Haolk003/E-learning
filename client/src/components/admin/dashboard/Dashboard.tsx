"use client";

import ProductTrendsChart from "@/components/ui/chart/ChartLineDashboard";
import React, { useEffect } from "react";
import Categories from "./Categories";
import SummaryMetrics from "./SummaryMetrics";
import EarningReport from "./EarningReport";
import TopInstructor from "./TopInstructor";
import { useCreateInteractCourseMutation } from "@/features/interact/InteractApi";

import MyCourse from "../my-courses/MyCourses";
import CourseList from "../courses/CourseList";
import NewStudents from "./NewStudents";

const Dashboard = () => {
  const [createInteractCourse, { data, isLoading }] =
    useCreateInteractCourseMutation();

  useEffect(() => {
    createInteractCourse("");
  }, []);

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
      <div className="mt-5">
        <CourseList />
      </div>

      <div className="mt-5">
        <MyCourse />
      </div>
      <div className="mt-5 flex gap-5">
        <div className="w-[60%]">
          {" "}
          <TopInstructor />
        </div>
        <div className="w-[40%]">
          <NewStudents />
        </div>
      </div>
      {/* <ProductTrendsChart /> */}
    </div>
  );
};

export default Dashboard;
