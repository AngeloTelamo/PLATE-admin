const admin = require('firebase-admin');
const serviceAdmin = require('../plate-5508c-firebase-adminsdk-t3fra-2e20fabdc0.json');
const { validationResult } = require('express-validator');
const { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } = require('firebase/auth');


const db = admin.firestore();

const createUser = async (req, res) => {
  const { Fname, Lname, Contact, Email, Password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let imagePath = 'adminProfile/';

  try {
    const userRecord = await admin.auth().createUser({
      email: Email,
      password: Password,
      displayName: `${Fname} ${Lname}`,
    });

    const uid = userRecord.uid;

    if (req.file) {
      const storageBucket = admin.storage().bucket('plate-5508c.appspot.com');
      imagePath += `${uid}/${req.file.originalname}`;

      await storageBucket.file(imagePath).save(req.file.buffer, {
        metadata: {
          contentType: 'image/jpeg',
        },
      });

      console.log('Image uploaded to storage:', imagePath);
    }

    const imageUrl = req.file
      ? `https://storage.googleapis.com/plate-5508c.appspot.com/${uid}/${req.file.originalname}`
      : '';

    const docRef = await db.collection('admin_information').add({
      Firstname: Fname,
      Lastname: Lname,
      Contact,
      Email,
      Password,
      uid: userRecord.uid,
      imageFileName: req.file ? req.file.originalname : '',
    });

    console.log('Document added to Firestore:', docRef.id);

    res.json({ message: 'Data received by the server.' });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ error: 'An error occurred while saving data.', details: error.message });
  }
};

const login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
    const user = userCredential.user;

    console.log('Login successful');
    return res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('An error occurred during login:', error);
    return res.status(401).json({ error: 'Invalid email or password' });
  }
};

const forgotPassword = async (req, res) => {
  const { Email } = req.body;

  console.log('Email received:', Email);

  if (!Email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, Email);
    res.json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'An error occurred while sending the password reset email.', details: error.message });
  }
};

const EditUsers = async (req, res) => {
  try {
    const { uid } = req.body;
    const { firstName, lastName, email } = req.body.editedUser;

    // Update the user data in the 'users' collection
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(uid)
      .update({
        firstName,
        lastName,
        email,
      });

    // Fetch the updated user data
    const updatedUserDoc = await admin.firestore()
      .collection('users')
      .doc(uid)
      .get();

    if (updatedUserDoc.exists) {
      const updatedUserData = updatedUserDoc.data();
      console.log('Updated data from user collection:', updatedUserData);
      return res.json({ updatedUserData });
    } else {
      console.error('Error: User not found UID:', uid);
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in Firestore:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const EditStore = async (req, res) => {
  try {
    const { uid } = req.body;
    const { carinderiaName, streetStore, barangayStore } = req.body.editedStore;

    // Update the user data in the 'users' collection
    const storeDoc = await admin.firestore()
      .collection('stores')
      .doc(uid)
      .update({
        carinderiaName,
        streetStore,
        barangayStore,
      });

    // Fetch the updated user data
    const updatedStoreDoc = await admin.firestore()
      .collection('stores')
      .doc(uid)
      .get();

    if (updatedStoreDoc.exists) {
      const updatedStoreData = updatedStoreDoc.data();
      console.log('Updated data from store collection:', updatedStoreData);
      return res.json({ updatedStoreData });
    } else {
      console.error('Error: Store not found UID:', uid);
      return res.status(404).json({ error: 'Store not found' });
    }
  } catch (error) {
    console.error('Error in Firestore:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const EditAdmin = async (req, res) => {
  try {
    const { Firstname, Lastname, Email } = req.body.editedAdmin;
    const adminId = req.params.id; // Assuming the admin ID is in the URL params

    // Update the user data in the 'admin_information' collection
    const adminDocRef = admin.firestore().collection('admin_information').doc(adminId);

    await adminDocRef.update({
      Firstname,
      Lastname,
      Email,
    });

    // Fetch the updated user data
    const updatedAdminDoc = await adminDocRef.get();

    if (updatedAdminDoc.exists) {
      const updatedAdminData = updatedAdminDoc.data();
      console.log('Updated data from admin_information collection:', updatedAdminData);
      return res.json({ updatedAdminData });
    } else {
      console.error('Error: Admin document not found for ID:', adminId);
      return res.status(404).json({ error: 'Admin document not found' });
    }
  } catch (error) {
    console.error('Error in Firestore:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createUser, login, forgotPassword, EditUsers, EditStore, EditAdmin };
