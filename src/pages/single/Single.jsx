import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Chart from '../../components/chart/Chart';
import ProductTable from '../../components/table/ProductTable';
import './single.scss';

const Single = () => {
  const [storeData, setStoreData] = useState({});
  const [userData, setUserData] = useState({});
  const [isEditMode, setEditMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [editedStore, setEditedStore] = useState({
    carinderiaName: '',
    streetStore: '',
    barangayStore: '',
  });
  const { uid } = useParams();

  const fetchData = async () => {
    try {
      const storeResponse = await fetch(`http://localhost:5000/api/getStores/${uid}`);
      const userResponse = await fetch(`http://localhost:5000/api/getUserDetails/${uid}`);

      if (storeResponse.ok && userResponse.ok) {
        const responseData = await storeResponse.json();
        const responseUserData = await userResponse.json();

        const store = responseData.storeData;
        const users = responseUserData.userData;

        if (store && users) {
          setStoreData(store);
          setUserData(users);
        } else {
          console.log('Store or user data not available.');
        }
      } else {
        const errorMessage = await storeResponse.json();
        const errorMessages = await userResponse.json();
        console.error('Error fetching data:', errorMessage.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedUser({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
    });
    setEditedStore({
      carinderiaName: storeData.cariendriaName || '',
      streetStore: storeData.streetStore || '',
      barangayStore: storeData.barangayStore || '',
    });
  };

  const handleSave = async () => {
    try {
      // Save user data
      const userSaveResponse = await fetch('http://localhost:5000/api/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          editedUser,
        }),
      });

      if (userSaveResponse.ok) {
        const savedUserData = await userSaveResponse.json();
        console.log('Saved User Data:', savedUserData);
        setUserData(savedUserData); // Update userData state with the saved changes
      } else {
        const errorMessages = await userSaveResponse.json();
        console.error('Error saving user changes:', errorMessages.error);
      }

      // Save store data
      const storeSaveResponse = await fetch('http://localhost:5000/api/editStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          editedStore,
        }),
      });

      if (storeSaveResponse.ok) {
        const savedStoreData = await storeSaveResponse.json();
        console.log('Saved Store Data:', savedStoreData);
        setStoreData(savedStoreData); // Update storeData state with the saved changes
      } else {
        const errorMessages = await storeSaveResponse.json();
        console.error('Error saving store changes:', errorMessages.error);
      }

      setEditMode(false);
      setShowNotification(true);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleHideNotification = () => {
    setShowNotification(false);
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
              <h1 className="value">{storeData.cariendriaName}</h1>
            </div>
            <div className="item">
              <div className="detail">
                {isEditMode ? (
                  <form className="edit-form">
                    {/* User data fields */}
                    <div className="form-group">
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        value={editedUser.firstName}
                        onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        id="lastName"
                        value={editedUser.lastName}
                        onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="text"
                        id="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      />
                    </div>

                    {/* Store data fields */}
                    <div className="form-group">
                      <label htmlFor="carinderiaName">Carinderia Name:</label>
                      <input
                        type="text"
                        id="carinderiaName"
                        value={editedStore.carinderiaName}
                        onChange={(e) =>
                          setEditedStore({ ...editedStore, carinderiaName: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="streetStore">Street Store:</label>
                      <input
                        type="text"
                        id="streetStore"
                        value={editedStore.streetStore}
                        onChange={(e) =>
                          setEditedStore({ ...editedStore, streetStore: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="barangayStore">Barangay Store:</label>
                      <input
                        type="text"
                        id="barangayStore"
                        value={editedStore.barangayStore}
                        onChange={(e) =>
                          setEditedStore({ ...editedStore, barangayStore: e.target.value })
                        }
                      />
                    </div>

                    <button type="button" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button type="button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    {/* Display user data */}
                    <div className="itemDetails">
                      <div className="key">ID: </div>
                      <div className="value">{uid}</div>
                    </div>
                    <br />
                    <div className="itemDetails">
                      <div className="key">User: </div>
                      <div className="value">
                        {userData.firstName} {userData.lastName}
                      </div>
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
                      <div className="key">Carinderia Name: </div>
                      <div className="value">{storeData.cariendriaName}</div>
                    </div>
                    <div className="itemDetails">
                      <div className="key">Street Store: </div>
                      <div className="value">{storeData.streetStore}</div>
                    </div>
                    <div className="itemDetails">
                      <div className="key">Barangay Store:</div>
                      <div className="value">{storeData.barangayStore}</div>
                    </div>
                    <div className="itemDetails">
                      <div className="key">Account Created: </div>
                      <div className="value">
                        {userData.account_created ? new Date(userData.account_created).toLocaleString() : 'N/A'}
                      </div>
                    </div>
                    {/* Button to enter edit mode */}
                    <button className="editButton" onClick={handleEdit}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart uid={uid}/>
          </div>
        </div>
        <div className="bottom">
          <ProductTable uid={uid} />
        </div>
      </div>
      {showNotification && (
        <div className="notification">
          <p>Successfully saved!</p>
          <button onClick={handleHideNotification}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Single;
