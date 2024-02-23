import React, { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Props = {
  data: {
    _id: any;
    totalAmount: number;
    count: number;
  }[];
  period: string;
  type: string;
};
const ChartLineIntructor: FC<Props> = ({ data, period, type }) => {
  const [months, setMonths] = useState<any[]>([]);
  const [series, setSeries] = React.useState<any[]>([]);
  const [dataMax, setDataMax] = useState(0);

  useEffect(() => {
    if (period === "1Y") {
      const newMonths = data.map(
        (item) =>
          `${dayjs().set("month", item._id.month).format("MMM")}-${dayjs()
            .set("year", item._id.year)
            .format("YY")}`
      );

      let fomatData = data.map((item) => item.totalAmount);
      if (type === "enrollments") {
        fomatData = data.map((item) => item.count);
      }

      setSeries([{ name: type.toUpperCase(), data: fomatData }]);
      setMonths(newMonths);
      const dataMax = Math.max(...fomatData);
      setDataMax(dataMax);
    } else if (period === "7D") {
      const newMonths = data.map(
        (item) =>
          `${dayjs().set("date", item._id.day).format("DD")}-${dayjs()
            .set("month", item._id.month)
            .format("MMM")}-${dayjs().set("year", item._id.year).format("YY")}`
      );

      let fomatData = data.map((item) => item.totalAmount);
      if (type === "enrollments") {
        fomatData = data.map((item) => item.count);
      }
      setSeries([{ name: type.toUpperCase(), data: fomatData }]);
      setMonths(newMonths);

      const dataMax = Math.max(...fomatData);
      setDataMax(dataMax);
    } else if (period === "30D") {
      const newMonths = data.map(
        (item) =>
          `${dayjs().set("date", item._id.day).format("DD")}-${dayjs()
            .set("month", item._id.month)
            .format("MMM")}-${dayjs().set("year", item._id.year).format("YY")}`
      );

      let fomatData = data.map((item) => item.totalAmount);
      if (type === "enrollments") {
        fomatData = data.map((item) => item.count);
      }
      setSeries([{ name: type.toUpperCase(), data: fomatData }]);
      setMonths(newMonths);

      const dataMax = Math.max(...fomatData);
      setDataMax(dataMax);
    } else {
      const newMonths = data.map((item) => `${item._id.year}`);

      let fomatData = data.map((item) => item.totalAmount);
      if (type === "enrollments") {
        fomatData = data.map((item) => item.count);
      }
      setSeries([{ name: type.toUpperCase(), data: fomatData }]);
      setMonths(newMonths);

      const dataMax = Math.max(...fomatData);
      setDataMax(dataMax);
    }
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 200,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      categories: months,
    },

    colors: ["#8B5CF6", "#fff"],

    grid: {
      borderColor: "#f1f1f1",
    },

    fill: {
      colors: ["#8B5CF6"],
      opacity: 1,
    },
  };

  return (
    <div className="text-black bg-gray1 p-4 rounded-md">
      <Chart options={options} series={series} type="line" />
    </div>
  );
};

export default ChartLineIntructor;
