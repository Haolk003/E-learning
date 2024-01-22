"use client";

import React from "react";
import {
  IoWalletOutline,
  IoGiftOutline,
  IoArrowForward,
} from "react-icons/io5";

import { FaUsersCog } from "react-icons/fa";
import {
  useCalculateSumMetricsQuery,
  useCalculateSumUserQuery,
} from "@/features/analytic/analyticApi";

import useFormatNumberWithCommas from "@/hooks/useFomatNumberWithComams";
import useFormatLargeNumbers from "@/hooks/useFomatLarge";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { TbArrowBounce } from "react-icons/tb";

const MetricSum = () => {
  const { data, isError } = useCalculateSumMetricsQuery("");
  const { data: userData } = useCalculateSumUserQuery("");

  return (
    <>
      {data && userData && (
        <div className="">
          <div className="grid grid-cols-3 gap-4">
            <div className="card !bg-blackA5 relative">
              <div className="text-md  text-xl mb-2">Total Users</div>
              <div className="text-2xl font-bold mb-3">
                {useFormatLargeNumbers(userData.data.totalUser[0].total)}
              </div>
              <div
                className={`${
                  userData.data.totalUserFluturationMonth >= 0
                    ? "text-green-600"
                    : "text-red-600"
                } flex items-center gap-1 `}
              >
                {userData.data.totalUserFluturationMonth > 0 ? (
                  <MdOutlineTrendingUp />
                ) : (
                  <MdOutlineTrendingDown />
                )}
                <span className="text-[12px]">
                  {userData.data.totalUserFluturationMonth > 0 ? "+" : ""}
                  {Math.round(userData.data.totalUserFluturationMonth)}%
                </span>
              </div>
              <div className="absolute top-[50%] right-2 rounded-[15px] text-xl -translate-y-1/2 flex items-center justify-center w-[50px] h-[50px] bg-blue-600 text-white">
                <FaUsersCog />
              </div>
            </div>

            <div className="card !bg-blackA5 relative">
              <div className="text-md  text-xl mb-2">Live Visitor</div>
              <div className="text-2xl font-bold mb-3">
                {useFormatLargeNumbers(data.data.currentMonthTotalVisits)}
              </div>
              <div
                className={`${
                  data.data.totalVisitsChange >= 0
                    ? "text-green-600"
                    : "text-red-600"
                } flex items-center gap-1 `}
              >
                {data.data.totalVisitsChange > 0 ? (
                  <MdOutlineTrendingUp />
                ) : (
                  <MdOutlineTrendingDown />
                )}
                <span className="text-[12px]">
                  {data.data.totalVisitsChange > 0 ? "+" : ""}
                  {Math.round(data.data.totalVisitsChange)}%
                </span>
              </div>
              <div className="absolute top-[50%] right-2 rounded-[15px] text-xl -translate-y-1/2 flex items-center justify-center w-[50px] h-[50px] bg-cyan-600 text-white">
                <CiUser />
              </div>
            </div>

            <div className="card !bg-blackA5 relative">
              <div className="text-md  text-xl mb-2">Bounce Rate</div>
              <div className="text-2xl font-bold mb-3">
                {data.data.currentMonthBounceRate}%
              </div>
              <div
                className={`${
                  data.data.bounceRateChange < 0
                    ? "text-green-600"
                    : "text-red-600"
                } flex items-center gap-1 `}
              >
                {data.data.bounceRateChange < 0 ? (
                  <MdOutlineTrendingUp />
                ) : (
                  <MdOutlineTrendingDown />
                )}
                <span className="text-[12px]">
                  {Math.round(data.data.bounceRateChange)}%
                </span>
              </div>
              <div className="absolute top-[50%] right-2 rounded-[15px] text-xl -translate-y-1/2 flex items-center justify-center w-[50px] h-[50px] bg-orange-600 text-white">
                <TbArrowBounce />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MetricSum;
