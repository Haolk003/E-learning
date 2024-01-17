import React from "react";
import Chart from "react-apexcharts";

const ProductTrendsChart = () => {
  // Set up the initial state for the options and series for the chart
  const [options, setOptions] = React.useState<any>({
    chart: {
      type: "bar",
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

    colors: ["#546E7A"],
  });

  const [series, setSeries] = React.useState([
    {
      name: "Sales",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ]);

  return (
    <div className="text-black ">
      <Chart options={options} series={series} type="bar" />
    </div>
  );
};

export default ProductTrendsChart;
