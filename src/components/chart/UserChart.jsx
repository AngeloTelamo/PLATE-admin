import "./chart.scss";
import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ( ) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUserDataByMonth'); // Replace with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="chart">
        <div className="title">Number of users this month</div>
      <ResponsiveContainer width={700} height={350}>
        <AreaChart
          className="chartData"
          width={730}
          height={250}
          data={userData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <XAxis dataKey="name" stroke="black"/>
          <YAxis stroke="gray"  interval={1}/>
          <CartesianGrid strokeDasharray="4 6" className="cartGrid"/>
          <Tooltip />
          <Area
            type="linear"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
