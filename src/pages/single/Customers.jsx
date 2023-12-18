import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Chart from '../../components/chart/Chart';
import './single.scss';
import CustomerTable from '../../components/table/CustomerTable';

const Customers = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const { uid } = useParams();

  const fetchData = async () => {
    try {
      const userResponse = await fetch(`http://localhost:5000/api/getUserDetails/${uid}`);
  
      if (userResponse.ok) {
        const responseUserData = await userResponse.json();
        console.log('Response UserData:', responseUserData);
  
        const users = responseUserData.userData;
  
        if (users) {
          console.log('Fetched user data:', users);
          setUserData(users);
        } else {
          console.log('User data not available.');
        }
      } else {
        const errorMessages = await userResponse.json();
        console.error('Error fetching data:', errorMessages.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const editUser = () => {
    setEditMode(true);
    setEditedUser({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
    });
  };

  const saveChanges = async () => {
    try {
      const saveResponse = await fetch('http://localhost:5000/api/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          editedUser,
        }),
      });
  
      if (saveResponse.ok) {
        const savedUserData = await saveResponse.json();
        console.log('Saved User Data:', savedUserData);
        setUserData(savedUserData); // Update userData state with the saved changes
        setEditMode(false);
        setShowNotif(true);
      } else {
        const errorMessages = await saveResponse.json();
        console.error('Error saving user changes:', errorMessages.error);
      }
    } catch (error) {
      console.error('Error saving user changes:', error);
    }
  };
  const cancelEdit = () => {
    setEditMode(false);
  };

  const hideNotification = () => {
    setShowNotif(false);
  };

  useEffect(() => {
    fetchData();
  }, [uid]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="titleTop">
              <h1 className="value">Customer Details</h1>
            </div>

            <div className="item">
              <div className="detail">
                {editMode ? (
                  <form className="edit-form">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        value={editedUser.firstName}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        id="lastName"
                        value={editedUser.lastName}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="text"
                        id="email"
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, email: e.target.value })
                        }
                      />
                    </div>
                    <button type="button" onClick={saveChanges}>
                      Save Changes
                    </button>
                    <button type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                  
                    <div className="itemDetails">
                      <div className="key">ID:</div>
                      <div className="value"> {uid}</div>
                    </div>
                    <br />
                    <div className="itemDetails">
                      <div className="key">User: </div>
                      <div className="value">{userData.firstName} {userData.lastName}</div>
                    </div>
                    <div className="itemDetails">
                      <div className="key">Email: </div>
                      <div className="value">{userData.email}</div>
                    </div>
                    <div className="itemDetails">
                      <div className="key">Role: </div>
                      <div className="value">{userData.status}</div>
                    </div>
                    <div className="itemDetails">
                      <div className="key">Account Created: </div>
                      <div className="value">
                        {userData.account_created ? new Date(userData.account_created).toLocaleString() : 'N/A'}
                      </div>
                    </div>
                    <button className="editButton" onClick={editUser}>
                        Edit User
                      </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right">
          </div>
          
        
        </div>
        <div className="bottom">
        <CustomerTable uid={uid} /></div>
      </div>
      {showNotif && (
        <div className="notification">
          <p> Successfully saved!</p>
          <button onClick={hideNotification}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Customers;
