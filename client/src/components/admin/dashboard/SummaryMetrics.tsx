import React, { useEffect, useState } from "react";

import {
  IoWalletOutline,
  IoGiftOutline,
  IoArrowForward,
} from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

import {
  useGenerateAnalyticEarningQuery,
  useGenerateAllQuery,
} from "@/features/analytic/analyticApi";

import { analyticsAll } from "@/types/analytics";
const SummaryMetrics = () => {
  const { data, isLoading, isSuccess, error } = useGenerateAllQuery("");
  const [generateData, setGenerateData] = useState<analyticsAll | null>(null);

  useEffect(() => {
    if (data) {
      setGenerateData(data.data);
    }
  }, [data]);
  return (
    <div className="w-full">
      {generateData && (
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col w-full rounded-md py-3 px-4 gap-1.5 bg-gray2">
            <div className="rounded-md w-[45px] h-[45px] bg-violet10 text-white flex items-center justify-center text-2xl">
              <IoWalletOutline />
            </div>
            <h3 className="text-[16px]">${generateData?.totalEarning}</h3>
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-gray10 font-thin">YTD Earnings</p>
              <div
                className={`${
                  generateData.studentFluctuationMonth >= 0
                    ? "text-green-600"
                    : "text-red-600"
                } flex items-center gap-1 `}
              >
                {generateData.earningFluctuationMonth > 0 ? (
                  <MdOutlineTrendingUp />
                ) : (
                  <MdOutlineTrendingDown />
                )}
                <span className="text-[12px]">
                  {generateData.earningFluctuationMonth > 0 ? "+" : ""}{" "}
                  {generateData.earningFluctuationMonth}%
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-violet10 text-[13px]">
              View All <IoArrowForward />{" "}
            </button>
          </div>

          <div className="flex flex-col w-full rounded-md py-3 px-4 gap-1.5 bg-gray2">
            <div className="rounded-md w-[45px] h-[45px] bg-cyan-500 text-white flex items-center justify-center text-xl">
              <MdPeopleAlt />
            </div>
            <h3 className="text-[16px]">{generateData?.totalStudent}</h3>
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-gray10 font-thin">
                Total Students
              </p>
              <div
                className={`${
                  generateData.studentFluctuationMonth >= 0
                    ? "text-green-600"
                    : "text-red-600"
                } flex items-center gap-1 `}
              >
                {generateData.studentFluctuationMonth > 0 ? (
                  <MdOutlineTrendingUp />
                ) : (
                  <MdOutlineTrendingDown />
                )}
                <span className="text-[12px]">
                  {generateData.studentFluctuationMonth > 0 ? "+" : ""}
                  {Math.round(generateData.studentFluctuationMonth)}%
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-cyan-500 text-[13px]">
              View All <IoArrowForward />{" "}
            </button>
          </div>

          <div className="flex flex-col w-full rounded-md py-3 px-4 gap-1.5 bg-gray2">
            <div className="rounded-md w-[45px] h-[45px] bg-amber-500 text-white flex items-center justify-center text-xl">
              <LiaChalkboardTeacherSolid />
            </div>
            <h3 className="text-[16px]">{generateData?.totalIntructor}</h3>
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-gray10 font-thin">
                Total Intructors
              </p>
              <div
                className={`${
                  generateData.totalIntructorFluturationMonth >= 0
                    ? "text-green-600"
                    : "text-red-600"
                } flex items-center gap-1 `}
              >
                {generateData.totalIntructorFluturationMonth > 0 ? (
                  <MdOutlineTrendingUp />
                ) : (
                  <MdOutlineTrendingDown />
                )}
                <span className="text-[12px]">
                  {generateData.totalIntructorFluturationMonth > 0 ? "+" : ""}
                  {Math.round(generateData.totalIntructorFluturationMonth)}%
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-amber-500 text-[13px]">
              View All <IoArrowForward />{" "}
            </button>
          </div>
          <div className="flex flex-col w-full rounded-md py-3 px-4 gap-1.5 bg-gray2">
            <div className="rounded-md w-[45px] h-[45px] bg-red9 text-white flex items-center justify-center text-xl">
              <IoGiftOutline />
            </div>
            <h3 className="text-[16px]">{generateData?.totalCourse}</h3>
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-gray10 font-thin">Total Courses</p>
              <div
                className={`${
                  generateData.courseFluturationMonth >= 0
                    ? "text-green-600"
                    : "text-red-600"
                } flex items-center gap-1 `}
              >
                {generateData.courseFluturationMonth > 0 ? (
                  <MdOutlineTrendingUp />
                ) : (
                  <MdOutlineTrendingDown />
                )}
                <span className="text-[12px]">
                  {generateData.courseFluturationMonth > 0 ? "+" : ""}
                  {Math.round(generateData.courseFluturationMonth)}%
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-amber-500 text-[13px]">
              View All <IoArrowForward />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryMetrics;
