import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const FoodList = ({ foodList }) => {
  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  const totalSubtotal = foodList.reduce(
    (total, food) => total + calculateSubtotal(food.quantity, food.price),
    0
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Food Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(foodList) &&
            foodList.map((food, index) => (
              <TableRow key={index}>
                <TableCell>{food.foodName}</TableCell>
                <TableCell>{food.quantity}</TableCell>
                <TableCell>{food.price}</TableCell>
                <TableCell>{calculateSubtotal(food.quantity, food.price)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}></TableCell>
          <TableCell>Total Subtotal:</TableCell>
          <TableCell>{totalSubtotal}</TableCell>
        </TableRow>
      </TableBody>
    </TableContainer>
  );
};

export default FoodList;
