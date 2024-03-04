"use client";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import { useCalculateDevideTypePercentTageQuery } from "@/features/analytic/analyticApi";
const DevicePieChart = () => {
  const [lableChart, setLabelChart] = useState([
    "Mobile",
    "Tablet",
    "Desktop",
    "Others",
  ]);
  const [dataChart, setDataChart] = useState([]);
  const { data } = useCalculateDevideTypePercentTageQuery("");
  console.log(data);
  const options: ApexOptions = {
    series: dataChart, // Phần trăm cho mỗi loại
    labels: lableChart,
    colors: ["#00E396", "#0090FF", "#775DD0", "#FF4560"], // Nhãn cho mỗi phần
    chart: {
      type: "donut", // Loại biểu đồ là 'donut'
      height: 200, // Chiều cao của biểu đồ
    },
    dataLabels: {
      enabled: false, // Tắt nhãn dữ liệu
    },

    legend: {
      position: "bottom", // Vị trí của chú giải là ở dưới cùng
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300, // Chiều rộng biểu đồ cho màn hình nhỏ
          },
          legend: {
            position: "bottom", // Vị trí chú giải cho màn hình nhỏ
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (data) {
      const fomatData = data.data.map((item: any) => Number(item.percentage));
      const fomatLabel = data.data.map((item: any) => {
        if (item.deviceType) {
          return item.deviceType;
        } else {
          return "Others";
        }
      });
      setLabelChart(fomatLabel);
      setDataChart(fomatData);
    }
  }, [data]);
  return (
    <>
      {data && (
        <div className="bg-blackA4 rounded-md w-full">
          <div className=" py-5 px-4 border-b border-gray8">
            <h2 className="headingAdmin !text-[15px]">Session by Device</h2>
          </div>
          <div className="text-black bg-gray1 p-4 rounded-md">
            <Chart options={options} type="donut" series={options.series} />
          </div>

          <div className="grid grid-cols-3 gap-5 px-3 py-3  border-t border-gray8">
            {data.data.map((item: any, index: number) => {
              return (
                <div className="flex flex-col justify-center gap-1" key={index}>
                  <span className="text-[14px]">
                    {item.deviceType ? item.deviceType : "Others"}
                  </span>
                  <span className="font-[600] text-[17px]">
                    {item.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DevicePieChart;
