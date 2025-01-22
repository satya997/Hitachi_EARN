import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ScatterChartExample = ({ small }) => {
  const data = [
    { date: "26-Dec", z: 10000000, y: 41622850 },
    { date: "27-Dec", z: 10000000, y: 58487973 },
    { date: "28-Dec", z: 10000000, y: 79091817 },
    { date: "29-Dec", z: 20000000, y: 48818041 },
    { date: "30-Dec", z: 30000000, y: 71007122 },
    { date: "31-Dec", z: 30000000, y: 79115615 },
    { date: "1-Jan", z: 40000000, y: 76092902 },
    { date: "2-Jan", z: 40000000, y: 45321978 },
    { date: "3-Jan", z: 50000000, y: 63704436 },
    { date: "4-Jan", z: 50000000, y: 45460324 },
    { date: "5-Jan", z: 60000000, y: 67569082 },
    { date: "6-Jan", z: 60000000, y: 64770772 },
    { date: "7-Jan", z: 70000000, y: 60302072 },
    { date: "8-Jan", z: 80000000, y: 48469582 },
    { date: "9-Jan", z: 80000000, y: 59216482 },
    { date: "10-Jan", z: 90000000, y: 57230132 },
    { date: "11-Jan", z: 90000000, y: 56966908 },
    { date: "12-Jan", z: 100000000, y: 67594259 },
  ];

  const convertedData = data.map((item) => ({
    date: item.date,
    z: item.z / 1000000, // converting 'z' to million
    y: item.y / 1000000, // converting 'y' to million
  }));

  return (
    <ResponsiveContainer
      width={small ? "33%" : "100%"}
      height={small ? 200 : 250}
    >
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        style={{  }}
      >
        <CartesianGrid stroke="transparent" />
        <XAxis
          dataKey="date"
          tick={{ fill: "white" }}
          axisLine={{ stroke: "white" }}
        />
        <YAxis
          type="number"
          dataKey="y" // Use 'y' values for the Y-axis
          name="sales"
          tick={{ fill: "white" }}
          axisLine={{ stroke: "white" }}
          tickFormatter={(value) => `$${value}M`} // Format ticks to include 'M'
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Sales Volume" data={convertedData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartExample;
