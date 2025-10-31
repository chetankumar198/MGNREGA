import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./ChartView.css";

const ChartView = ({ data }) => {
  const chartData = data.map((item) => ({
    district: item.district_name,
    employment: item.metrics?.Total_Households_Worked || 0,
    funds: item.metrics?.Total_Exp || 0,
    works: item.metrics?.Number_of_Completed_Works || 0,
  }));

  const formatNumber = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return (num / 100000).toFixed(2) + " L";
    if (num >= 1000) return num.toLocaleString();
    return num;
  };

  return (
    <div className="chart-container">
      <h2>📊 District-wise Performance Overview</h2>
      {chartData.length === 0 ? (
        <p className="no-data">No data available for the selected filters.</p>
      ) : (
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 40, left: 20, bottom: 60 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
            <XAxis
              dataKey="district"
              angle={-25}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12, fill: "#333" }}
            />
            <YAxis
              tickFormatter={formatNumber}
              tick={{ fontSize: 12, fill: "#333" }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Total Expenditure (₹)") return "₹" + formatNumber(value);
                return formatNumber(value);
              }}
              contentStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <Legend verticalAlign="top" height={40} iconType="circle" />

            <Bar
              dataKey="works"
              fill="#FFD54F"
              name="Completed Works"
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="employment"
              fill="#4CAF50"
              name="Households Worked"
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="funds"
              fill="#2196F3"
              name="Total Expenditure (₹)"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartView;
