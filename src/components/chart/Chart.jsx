import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Monday",
    total: 44,
  },
  {
    name: "Tueday",
    total: 27,
  },
  {
    name: "Wednesday",
    total: 36,
  },
  {
    name: "Thursday",
    total: 22,
  },
  {
    name: "Friday",
    total: 85,
  },
  {
    name: "Saturday",
    total: 23,
  },
  {
    name: "Sunday",
    total: 0,
  },
];

const Chart = ( ) => {
  return (
    <div className="chart">
        <div className="title">Number of orders</div>
      <ResponsiveContainer width={700} height={350}>
        <AreaChart
          className="chartData"
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="black"/>
          <YAxis stroke="gray"/>
          <CartesianGrid strokeDasharray="4 6" className="cartGrid"/>
          <Tooltip />
          <Area
            type="monotone"
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
