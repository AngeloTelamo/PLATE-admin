import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "./chart.scss";

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const Chart = ({ uid }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getStoreAndProductData/${uid}`);
        if (response.ok) {
          const data = await response.json();
          const orderCounts = data.store.orderCounts;

          // Convert orderCounts object to an array of objects
          const chartDataArray = Object.keys(orderCounts).map((foodName) => ({
            name: foodName,
            orderCount: orderCounts[foodName].count,
            totalPrice: orderCounts[foodName].totalPrice,
          }));

          setChartData(chartDataArray);
        } else {
          const errorMessage = await response.json();
          console.error('Error fetching chart data:', errorMessage.error);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [uid]);

  return (
    <div className="chart">
      <div className="title">Number of Orders and Total Revenue by Food Item</div>
      <ResponsiveContainer width={700} height={350}>
        <PieChart>
          <Tooltip />
          <Pie
            data={chartData}
            dataKey="totalPrice"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, orderCount, totalPrice }) => `${name} = ${orderCount} orders, P${totalPrice}.00`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
