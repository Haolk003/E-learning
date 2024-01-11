import React from "react";
import Chart from "react-apexcharts";

const ProductTrendsChart = () => {
  // Set up the initial state for the options and series for the chart
  const [options, setOptions] = React.useState<any>({
    chart: {
      type: "line",
      height: "auto",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: {
      min: 0,
      max: 160,
      tickAmount: 4,
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
      style: {
        fontSize: "16px",
      },
    },
    colors: ["#546E7A"],
  });

  const [series, setSeries] = React.useState([
    {
      name: "Sales",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ]);

  return (
    <div className="text-black">
      <Chart options={options} series={series} type="line" />
    </div>
  );
};

export default ProductTrendsChart;
