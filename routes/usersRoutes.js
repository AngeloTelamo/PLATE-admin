const express = require('express');
const router = express.Router();
const { getUserData, 
    getSingleStoreData, 
    getSingleUserData, 
    getDataForProfile,
    getStoreAndProductData,
    getStoreData,
    getUserDataByMonth,
    getCustomerAndProductData,
    } = require('../controllers/usersController');

// Route to fetch the data
router.get('/getUsers', getUserData);
router.get('/getStores/:uid', getSingleStoreData);
router.get('/getUserDetails/:uid', getSingleUserData);
router.get('/getProfile', getDataForProfile);
router.get('/getStores', getStoreData); 
router.get('/getStoreAndProductData/:uid/', getStoreAndProductData);
router.get('/getUserDataByMonth', getUserDataByMonth); 
router.get('/getCustomersData/:uid/', getCustomerAndProductData)


module.exports = router;
