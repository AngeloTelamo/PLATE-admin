const admin = require('firebase-admin');

const getUserData = async (req, res) => {
    try {
        const data = [];
        const querySnapshot = await admin.firestore().collection('users').get();

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        res.json({ data });
    } catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleStoreData = async (req, res) => {
  try {
    const { uid } = req.params;
    console.log('Received Store UID:', uid);
  
    // Query the 'stores' collection
    const storeDoc = await admin.firestore()
      .collection('stores')
      .doc(uid)
      .get();
  
    if (storeDoc.exists) {
      const storeData = storeDoc.data();
      console.log('Fetched store data from stores collection:', storeData);
      return res.json({ storeData });
    } else {
      console.error('Error: Store not found for UID:', uid);
      return res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    console.error('Error querying Firestore:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
};
const getSingleUserData = async (req, res) => {
  try {
    const { uid } = req.params;
    console.log('Received User UID:', uid);
  
    // Query the 'stores' collection
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(uid)
      .get();
  
    if (userDoc.exists) {
      const userData = userDoc.data();

      if (userData && userData.account_created) {
        userData.account_created = userData.account_created.toDate().toLocaleString();
      }
      console.log('Fetched data from user collection:', userData);
      return res.json({ userData });
    } else {
      console.error('Error: Store not found for UID:', uid);
      return res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    console.error('Error querying Firestore:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

const getDataForProfile = async (req, res) => {
  try {
    const data = [];
    const querySnapshot = await admin.firestore().collection('admin_information').get();

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    const imageUrls = await Promise.all(
      data.map(async (item) => {
        const imagePath = `adminProfile/${item.uid}/${item.imageFileName}`;
        const file = admin.storage().bucket('plate-5508c.appspot.com').file(imagePath);

        // Get the signed URL for the file
        const [imageUrl] = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491', // Adjust the expiration date as needed
        });

        return imageUrl;
      })
    );

    console.log(imageUrls);

    res.json({ data, imageUrls });
  } catch (error) {
    console.error('Error retrieving data from Firebase:', error);
    res.status(500).json({ error: 'An error occurred while retrieving data.' });
  }
};

const getStoreData = async(req, res)=>{

  try {

      const Storedata =[];
      const  StorequerySnapshot = await admin.firestore().collection('stores').get();

      const userData = [];
      const UserquerySnapshot = await admin.firestore().collection('users').get();

      StorequerySnapshot.forEach((doc) =>{
          Storedata.push(doc.data());
      });

      UserquerySnapshot.forEach((doc) =>{
          userData.push(doc.data());
      });

      res.json({ Storedata, userData });
  } catch (error) {
      console.error('Error getting user data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getStoreAndProductData = async (req, res) => {
  try {
    const uid = req.params.uid;

    const storeDoc = await admin.firestore().collection('stores').doc(uid).get();

    if (!storeDoc.exists) {
      res.status(404).json({ error: 'Store not found' });
      return;
    }

    const storeId = storeDoc.id;
    const storeData = storeDoc.data();

    const productCollectionRef = admin.firestore().collection('stores').doc(storeId).collection('product');
    const completedOrderCollectionRef = admin.firestore().collection('stores').doc(storeId).collection('CompletedOrder');
    const pendingOrderCollectionRef = admin.firestore().collection('stores').doc(storeId).collection('pendingOrder');

    const productQuerySnapshot = await productCollectionRef.get();
    const completedOrderQuerySnapshot = await completedOrderCollectionRef.get();
    const pendingOrderQuerySnapshot = await pendingOrderCollectionRef.get();

    const products = [];
    productQuerySnapshot.forEach((productDoc) => {
      const productData = productDoc.data();
      products.push(productData);
    });

    const orderCounts = {}; // Object to store food name, order count, and total price
    const completedOrders = [];
    const pendingOrders = [];

    completedOrderQuerySnapshot.forEach((completedOrderDoc) => {
      const completedOrderData = completedOrderDoc.data();
      const foodList = completedOrderData.foodList || [];

      foodList.forEach((foodItem) => {
        const foodName = foodItem.foodName;
        const price = parseFloat(foodItem.price) || 0; // Parse as a float

        if (!orderCounts[foodName]) {
          orderCounts[foodName] = {
            count: 1,
            totalPrice: price,
          };
        } else {
          orderCounts[foodName].count++;
          orderCounts[foodName].totalPrice += price;
        }
      });

      completedOrders.push({ ...completedOrderData, foodList: foodList });
      console.log('Food List for Completed Order:', foodList);
    });

    console.log('Completed Orders:', completedOrders);

    pendingOrderQuerySnapshot.forEach((pendingOrderDoc) => {
      const pendingOrderData = pendingOrderDoc.data();
      const foodList = pendingOrderData.foodList || [];

      foodList.forEach((foodItem) => {
        const foodName = foodItem.foodName;
        const price = parseFloat(foodItem.price) || 0; // Parse as a float

        if (!orderCounts[foodName]) {
          orderCounts[foodName] = {
            count: 1,
            totalPrice: price,
          };
        } else {
          orderCounts[foodName].count++;
          orderCounts[foodName].totalPrice += price;
        }
      });

      pendingOrders.push({ ...pendingOrderData, foodList: foodList });
      console.log('Food List for Pending Order:', foodList);
    });

    console.log('Pending Orders:', pendingOrders);

    const completedOrdersCount = completedOrders.length;
    const pendingOrdersCount = pendingOrders.length;
    const totalOrders = completedOrdersCount + pendingOrdersCount;
    console.log('Order Counts:', orderCounts);

    const storeWithProducts = {
      id: storeId,
      ...storeData,
      products: products,
      CompletedOrders: completedOrders,
      PendingOrders: pendingOrders,
      orderCounts: orderCounts,
      completedOrdersCount: completedOrdersCount,
      pendingOrdersCount: pendingOrdersCount,
      totalOrders: totalOrders,
    };

    console.log('Sending response:', storeWithProducts);
    res.status(200).json({ store: storeWithProducts });
  } catch (error) {
    console.error('Error fetching store and product data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getCustomerAndProductData = async (req, res) => {
  try {
    const uid = req.params.uid;
    
    console.log('Fetching user data for UID:', uid);

    const userDoc = await admin.firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      console.log('User not found for UID:', uid);
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userId = userDoc.id;
    const userData = userDoc.data();
    console.log('Fetched user data:', userData);
    const myOrderCollectionRef = admin.firestore().collection('users').doc(userId).collection('myOrders');
    console.log('Fetching orders for user ID:', userId);
    const orderQuerySnapshot = await myOrderCollectionRef.get();

    const myOrders = [];

    orderQuerySnapshot.forEach((orderDoc) => {
      const orderData = orderDoc.data();
      const orderWithFoodList = {
        ...orderData,
        foodList: orderData.foodList || [] // Ensure foodList is an array, or provide a default empty array
      };
      console.log(`FoodList for order ${orderDoc.id}:`, orderWithFoodList.foodList);
      myOrders.push(orderWithFoodList);
    });

    console.log('Fetched orders:', myOrders);

    res.status(200).json({ user: userData, myOrders }); 
  } catch (error) {
    console.error('Error fetching user and order data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getUserDataByMonth = async (req, res) => {
  try {
    const data = [];
    const querySnapshot = await admin.firestore().collection('users').get();

    const monthlyTotals = {};

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      const accountCreated = user.account_created;

      if (accountCreated) {
        const createdAt = accountCreated.toDate(); // Assuming account_created is a Firestore Timestamp

        const monthName = getMonthName(createdAt.getMonth() + 1);

        if (!monthlyTotals[monthName]) {
          monthlyTotals[monthName] = 1;
        } else {
          monthlyTotals[monthName]++;
        }
      }
    });

    for (const [monthName, total] of Object.entries(monthlyTotals)) {
      data.push({ name: monthName, total });
    }

    // Sort the data array by month names
    data.sort((a, b) => {
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
    });

    res.json({ data });
  } catch (error) {
    console.error('Error getting user data by month:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get the name of the month
const getMonthName = (monthNumber) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber - 1]; // Adjust index to start from 0
};

module.exports = { 
  getUserData, 
  getSingleStoreData, 
  getSingleUserData, 
  getDataForProfile,
  getStoreData,
  getStoreAndProductData,
  getUserDataByMonth,
  getCustomerAndProductData,
};

