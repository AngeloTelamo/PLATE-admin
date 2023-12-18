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
import Featured from '../../components/featured/Featured';
import '../featured/featured.scss';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

const ITEMS_PER_PAGE = 5; // Adjust the number of orders per page

const ProductTable = ({ uid }) => {
  const [error, setError] = useState(null);
  const [storeData, setStoreData] = useState({ store: { products: [], CompletedOrders: [] } });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getStoreAndProductData/${uid}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched store data:', data);
          setStoreData(data);
          setTotalOrders(data.store.totalOrders);
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.error);
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [uid]);

  const handleViewMore = (orderId) => {
    console.log(`See More clicked for order ID: ${orderId}`);
    setSelectedOrder(orderId);
  };

  const handleCloseDrawer = () => {
    setSelectedOrder(null);
  };

  const indexOfLastOrder = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ITEMS_PER_PAGE;
  const currentOrders = storeData.store.CompletedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {error && <p>{error}</p>}
      <h2>List Of Viands</h2>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Available Food</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(storeData.store.products) &&
              storeData.store.products.map((row) => (
                <TableRow key={row.uid}>
                  <TableCell>{row.foodname}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h2>Orders</h2>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Number</TableCell>
              <TableCell>Delivery Option</TableCell>
              <TableCell>Delivery Price</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((row) => (
              <TableRow key={row.uid}>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.customerNumber}</TableCell>
                <TableCell>{row.deliveryOption}</TableCell>
                <TableCell>{row.deliveryOption === 'Pick up' ? 0 : row.deliveryPrice}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>
                <Button  variant="outlined" onClick={() => handleViewMore(row.completeUid)}style={{ color: '#ff6700' }} >
                     View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(storeData.store.CompletedOrders.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={paginate}
          color="primary"
          style={{ color: '#ff6700' }} 
        />
      </div>
      <Drawer anchor="right" open={Boolean(selectedOrder)} onClose={handleCloseDrawer}>
        <div>
          {selectedOrder && (
            <>
              <h3>Food List for Order ID: {selectedOrder}</h3>
              <FoodList
                foodList={
                  storeData.store.CompletedOrders.find((order) => order.completeUid === selectedOrder)?.foodList || []
                }
              />
            </>
          )}
        </div>
      </Drawer>
      <br />
      {!error && <Featured totalOrders={totalOrders} />}
    </div>
  );
};

export default ProductTable;
