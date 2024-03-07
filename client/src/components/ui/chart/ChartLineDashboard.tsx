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
};
const ProductTrendsChart: FC<Props> = ({ data, period }) => {
  const [months, setMonths] = useState<any[]>([]);
  const [series, setSeries] = React.useState<any[]>([]);
  const [dataMax, setDataMax] = useState(0);
  const [studentMax, setStudentMax] = useState(0);

  useEffect(() => {
    if (period === "1M") {
      const newMonths = data.map(
        (item) =>
          `${dayjs().set("month", item._id.month).format("MMM")}-${dayjs()
            .set("year", item._id.year)
            .format("YY")}`
      );

      const fomatData = data.map((item) => item.totalAmount);
      const fommatDataStudent = data.map((item) => item.count);
      setSeries([
        { name: "Earning", type: "column", data: fomatData },
        { name: "Students", type: "line", data: fommatDataStudent },
      ]);
      setMonths(newMonths);
      const studentMax = Math.max(...fommatDataStudent);
      const dataMax = Math.max(...fomatData);
      if (studentMax * 50 > dataMax) {
        setDataMax(studentMax * 50);
        setStudentMax(studentMax);
      } else {
        setDataMax(dataMax);
        setStudentMax(dataMax / 50);
      }
    } else if (period === "6M") {
      const newMonths = data.map(
        (item) =>
          `${item._id.sixMonthInterval}-${dayjs()
            .set("year", item._id.year)
            .format("YY")}`
      );

      const fomatData = data.map((item) => item.totalAmount);
      const fommatDataStudent = data.map((item) => item.count);
      setSeries([
        { name: "Earning", type: "column", data: fomatData },
        { name: "Students", type: "line", data: fommatDataStudent },
      ]);
      setMonths(newMonths);
      const studentMax = Math.max(...fommatDataStudent);
      const dataMax = Math.max(...fomatData);
      if (studentMax * 50 > dataMax) {
        setDataMax(studentMax * 50);
        setStudentMax(studentMax);
      } else {
        setDataMax(dataMax);
        setStudentMax(dataMax / 50);
      }
    } else if (period === "D") {
      const newMonths = data.map(
        (item) =>
          `${dayjs().set("date", item._id.day).format("DD")}-${dayjs()
            .set("month", item._id.month)
            .format("MMM")}-${dayjs().set("year", item._id.year).format("YY")}`
      );

      const fomatData = data.map((item) => item.totalAmount);
      const fommatDataStudent = data.map((item) => item.count);
      setSeries([
        { name: "Earning", type: "column", data: fomatData },
        { name: "Students", type: "line", data: fommatDataStudent },
      ]);
      setMonths(newMonths);
      const studentMax = Math.max(...fommatDataStudent);
      const dataMax = Math.max(...fomatData);
      if (studentMax * 50 > dataMax) {
        setDataMax(studentMax * 50);
        setStudentMax(studentMax);
      } else {
        setDataMax(dataMax);
        setStudentMax(studentMax / 50);
      }
    } else {
      const newMonths = data.map((item) => `${item._id.year}`);

      const fomatData = data.map((item) => item.totalAmount);
      const fommatDataStudent = data.map((item) => item.count);
      setSeries([
        { name: "Earning", type: "column", data: fomatData },
        { name: "Students", type: "line", data: fommatDataStudent },
      ]);
      setMonths(newMonths);
      const studentMax = Math.max(...fommatDataStudent);

      const dataMax = Math.max(...fomatData);
      if (studentMax * 50 >= dataMax) {
        setDataMax(studentMax * 50);
        setStudentMax(studentMax);
      } else {
        setDataMax(dataMax);
        setStudentMax(dataMax / 50);
      }
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
      enabled: true,
    },
    stroke: {
      width: [0, 3],
    },
    labels: months,
    yaxis: [
      {
        title: {
          text: "Earning",
        },
        min: 0,
        max: dataMax + (100 - (dataMax % 100)),
        tickAmount: 5,
      },
      {
        opposite: true,
        title: {
          text: "Students",
        },
        min: 0,
        max: studentMax + (2 - (studentMax % 2)),
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: "15px",
        borderRadius: 5,

        // Chỉnh width của các cột tại đây
      },
    },

    colors: ["#8B5CF6", "#fff"],

    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      enabled: false,
    },
    fill: {
      colors: ["#8B5CF6"],
      opacity: 1,
    },
  };

  return (
    <div className="text-black bg-gray1 p-4 rounded-md">
      <Chart options={options} series={series} type="bar" />
    </div>
  );
};

export default ProductTrendsChart;
