"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useCalculateMonthNewUserSessionQuery } from "@/features/analytic/analyticApi";
import dayjs from "dayjs";

const SessionNewUser = () => {
  const { data } = useCalculateMonthNewUserSessionQuery("");
  const [labelChart, setLabelChart] = useState<any[]>([]);
  const [dataChart, setDatasChart] = useState<any[]>([]);
  console.log(data);
  const options: ApexOptions = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: false,
      },
    },
    // xaxis: {
    //   categories: [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ],
    // },
    labels: labelChart,
    colors: ["#8E54E9", "#4776E6", "#FFC200"], // Assuming these are the colors used
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
    markers: {
      size: 5,
    },
    legend: {
      show: true,
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "New Users",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 65, 50, 70], // Example data
    },
    {
      name: "Sessions",
      data: [20, 30, 40, 45, 50, 55, 65, 80, 85, 60, 55, 70], // Example data
    },
    {
      name: "Avg Session Duration",
      data: [10, 20, 30, 40, 45, 50, 55, 60, 65, 70, 75, 80], // Example data
    },
  ];

  useEffect(() => {
    if (data) {
      const formatterNewUserPerMonth = data.data.newDataUserPerMonth.map(
        (item: any) => item.total
      );
      const formatterSessionPerMonth = data.data.newDataUserSession.map(
        (item: any) => item.sessionCount
      );
      const formatterAvgSessionDuration = data.data.newDataUserSession.map(
        (item: any) => Math.round(item.averageSessionDuration / 60)
      );
      const fomatLabel = data.data.newDataUserSession.map(
        (item: any) =>
          `${dayjs().set("month", item._id.month).format("MMM")}-${dayjs()
            .set("year", item._id.year)
            .format("YY")}`
      );
      setLabelChart(fomatLabel);
      setDatasChart([
        {
          name: "New Users",
          data: formatterNewUserPerMonth,
        },
        {
          name: "Sessions",
          data: formatterSessionPerMonth,
        },
        {
          name: "Avg Session Duration",
          data: formatterAvgSessionDuration,
        },
      ]);
    }
  }, [data]);
  return (
    <>
      {data && (
        <div className="my-4">
          <div className="bg-blackA4 rounded-md w-full">
            <div className=" py-5 px-4 border-b border-gray8">
              <h2 className="headingAdmin !text-[15px]">
                Sessions Duration By New User
              </h2>
            </div>
            <div className="text-black">
              <Chart
                options={options}
                series={dataChart}
                type="line"
                height="350"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionNewUser;
