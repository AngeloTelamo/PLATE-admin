import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Drawer from '@mui/material/Drawer';
import FoodList from '../../pages/single/FoodList';

const CustomerTable = ({ uid }) => {
  const [error, setError] = useState(null);
  const [userOrderData, setUserOrderData] = useState({ users: { myOrders: [] } });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getCustomersData/${uid}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched user order data:', data);
          setUserOrderData(data);
        } else {
          const errorMessage = await response.json();
          console.error('Error fetching data:', errorMessage.error);
          setError(errorMessage.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [uid]);

  const handleOpenDrawer = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleCloseDrawer = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>My Order</h2>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Carinderia Name</TableCell>
              <TableCell>Delivery Options</TableCell>
              <TableCell>Delivery Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrderData.myOrders &&
              userOrderData.myOrders.map((order) => (
                <TableRow key={order.myOrdersUid}>
                  <TableCell>{order.carinderiaName}</TableCell>
                  <TableCell>{order.deliveryOption}</TableCell>
                  <TableCell>{order.deliveryOption === 'Pick up' ? 0 : order.deliveryPrice}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell> 
                  <TableCell>
                    <button onClick={() => handleOpenDrawer(order.myOrdersUid)} style={{ color: '#ff6700' }}>View Details</button>
                  </TableCell>
                 
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer anchor="right" open={Boolean(selectedOrder)} onClose={handleCloseDrawer}>
        <div>
          {selectedOrder && (
            <>
              <h3>Food List for Order ID: {selectedOrder}</h3>
              <FoodList
                foodList={
                  userOrderData.myOrders.find((order) => order.myOrdersUid === selectedOrder)?.foodList || []
                }
              />
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default CustomerTable;
