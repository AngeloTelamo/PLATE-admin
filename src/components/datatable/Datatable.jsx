import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './datatable.scss';

const Datatable = () => {
  const [userData, setUserData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUsers');
        const data = await response.json();
        setUserData(data.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const userColumns = [
    { field: 'select', headerName: 'Select', width: 100, renderCell: (params) => <input type="checkbox" checked={params.row.select} readOnly /> },
    { field: 'uid', headerName: 'User ID', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (user) => (
        <div className="cellAction">
        <Link
          to={user.status === 'Customer' ? `/customers/${user.uid}` : `/users/${user.uid}`}
          className="viewButton"
        >
          Views
        </Link>
        <div className="disableButton"> Disable </div>
        <div className="deleteButton"> Delete </div>
      </div>
      ),
    },
  ];

  const sortedUserData = [...userData].sort((a, b) => {
    const key = 'uid'; // The key you want to sort by
    const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1;

    return sortOrderMultiplier * a[key].localeCompare(b[key]);
  });

  return (
    <div className="datatable">
      <h1>User List</h1>
      <p>Total users: {userData.length}</p>
      <table>
        <thead>
          <tr>
            {userColumns.map((column) => (
              <th key={column.field} onClick={() => handleSortOrderChange()}>
                {column.headerName}
                {column.field === 'uid' && sortOrder === 'asc' ? ' ↑' : ' ↓'}
              </th>
            ))}
            {actionColumn.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUserData.map((user) => (
            <tr key={user.uid}>
              {userColumns.map((column) => (
                <td key={column.field}>
                  {column.renderCell ? column.renderCell({ row: user }) : user[column.field]}
                </td>
              ))}
              {actionColumn.map((column) => (
                <td key={column.field}>{column.renderCell(user)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
