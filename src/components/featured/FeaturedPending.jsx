import React from 'react';

const PendingOrdersGraph = ({ pendingOrdersCount }) => {
  const renderPendingOrders = () => {
    const bars = [];
    for (let i = 0; i < pendingOrdersCount; i++) {
      bars.push(<div key={i} className="pending-order-bar" />);
    }
    return bars;
  };

  return (
    <div className="pending-orders-graph">
      <h2>Pending Orders</h2>
      <div className="pending-orders-bars">{renderPendingOrders()}</div>
    </div>
  );
};

export default PendingOrdersGraph;
