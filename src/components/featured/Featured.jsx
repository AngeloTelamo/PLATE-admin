import React from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = ({ totalOrders, completedOrdersCount, pendingOrdersCount }) => {
  const percentageCompleted = totalOrders > 0 ? (totalOrders / 100) * 100 : 0;

  return (
    <div className="featured">
      {/* First Graph */}
      <div className="top">
        <h1 className="title">Total Transaction</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <MoreVertIcon style={{ position: 'absolute', top: '10px', right: '10px' }} />
          <CircularProgressbar
            className="circle"
            value={percentageCompleted}
            text={`${percentageCompleted}`}
            strokeWidth={3}
            counterClockwise={true}
            styles={{ width: '80px', height: '80px', path: { stroke: '#ff6700' }, text: { fill: '#ff6700' } }}
          />
        </div>
        <p className="title">Total of completed orders</p>
        <p className="total">{totalOrders}</p>
      </div>
    </div>
  );
};

export default Featured;
