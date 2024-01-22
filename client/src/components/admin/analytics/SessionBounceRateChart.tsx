"use client";

import React, { useEffect, useState } from "react";
import { useCalculateMonthBounceSessionQuery } from "@/features/analytic/analyticApi";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";

const SessionBounceRateChart = () => {
  const { data } = useCalculateMonthBounceSessionQuery("1M");
  const [labelChart, setLabelChart] = useState([]);
  const [dataChart, setDataChart] = useState<any[]>([]);
  console.log(data);
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false, // Tắt nhãn dữ liệu
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },

    stroke: {
      show: true,
      width: 2,
    },
    labels: labelChart,

    yaxis: {
      title: {
        text: "(sessions)",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " sessions";
        },
      },
    },
    legend: {
      position: "top",
    },

    colors: ["#8E54E9", "#2b908f"],
  };
  const series = [
    {
      name: "Session",
      type: "column",
      data: [23, 24, 25, 27, 26, 28, 25, 24, 26, 27, 25, 24],
    },
    {
      name: "Bounce Rate",
      type: "line",
      data: [25, 24, 26, 25, 27, 24, 25, 26, 27, 26, 24, 23],
    },
  ];

  useEffect(() => {
    if (data) {
      const fomatLabel = data.data.map(
        (item: any) =>
          `${dayjs().set("month", item._id.month).format("MMM")}-${dayjs()
            .set("year", item._id.year)
            .format("YY")}`
      );
      const fomatDataSession = data.data.map((item: any) => item.totalSessions);
      const fomatDataBounces = data.data.map((item: any) => item.totalBounces);

      setDataChart([
        {
          name: "Session",
          type: "column",
          data: fomatDataSession,
        },
        {
          name: "Bounce Rate",
          type: "line",
          data: fomatDataBounces,
        },
      ]);
    }
  }, [data]);
  return (
    <div className="bg-blackA4 rounded-md w-full mt-4 ">
      <div className=" py-5 px-4 border-b border-gray8">
        <h2 className="headingAdmin">Top Countries Sessions Vs Bounce Rate</h2>
      </div>
      <div className="text-black">
        <Chart options={options} series={dataChart} type="line" />
      </div>
    </div>
  );
};

export default SessionBounceRateChart;
