const express = require('express');
const router = express.Router();
const multer = require('multer');
const { validateUser } = require('./userValidation'); // Define your validation rules in 'userValidation.js'
const { isAuthenticated } = require('../authMiddleware');
const { createUser, 
          login, 
          forgotPassword, 
          EditUsers,
          EditStore,
          EditAdmin, 
          } = require('../controllers/userController'); 


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for creating a user
router.post('/submit', upload.single('Profile'), validateUser, createUser );
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/editUser', EditUsers);
router.post('/editStore', EditStore);
router.post('/editProfile', EditAdmin);

// Route that requires authentication (protecting a route)
router.post('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'Protected route' });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;
