const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const firebase = require('firebase/app');

// Import Firebase Admin SDK service account key
const serviceAdmin = require('./plate-5508c-firebase-adminsdk-t3fra-2e20fabdc0.json');

const app = express();
const port = 5000;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAdmin),
  databaseURL: 'plate-5508c',
  // Add other configurations if needed
});

// Firebase Client SDK configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkLCcxpAeAkVzt41ABjdZj0ZdIRZwrbvY",
  authDomain: "plate-5508c.firebaseapp.com",
  projectId: "plate-5508c",
  storageBucket: "plate-5508c.appspot.com",
  messagingSenderId: "90013647586",
  appId: "1:90013647586:web:d2fcf3dd5fe1ba16bcd4bb",
  measurementId: "G-8MM9B3BNLY"
};

firebase.initializeApp(firebaseConfig);

app.use(cors());
app.use(express.json());

// Import and use routes
const usersRoutes =  require('./routes/usersRoutes')
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const authMiddleware = require('./authMiddleware');

app.use('/api', userRoutes);
app.use('/api', searchRoutes);
app.use('/api', passwordRoutes);
app.use('/api', usersRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
