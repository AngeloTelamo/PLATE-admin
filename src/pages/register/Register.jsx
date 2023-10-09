import "./register.scss";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";

const Register = () => {
  // Create refs for input fields
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactNumberRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // Reference to the Firestore collection
  const userInformationCollection = collection(firestore, "User_Informations");

  const handleSave = async (e) => {
    e.preventDefault();

    // Get values from input fields
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const contactNumber = contactNumberRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !contactNumber) {
      console.error("Required fields are empty");
      return;
    }

    const userData = {
      firstName,
      lastName,
      contactNumber,
      email,
      password,
    };

    try {
      // Create a document with user information in Firestore
      await addDoc(userInformationCollection, userData);

      // Clear input fields after successful submission
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      contactNumberRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";

      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="plate">PLATE</span>
        <span className="title">REGISTER</span>
        <form onSubmit={handleSave}>
          <input placeholder="First name" type="text" ref={firstNameRef}/>
          <input placeholder="Last name" type="text" ref={lastNameRef} />
          <input placeholder="Contact number" type="text" ref={contactNumberRef} />
          <input placeholder="Email" type="email" ref={emailRef} />
          <input placeholder="Password" type="password" ref={passwordRef} />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <InsertPhotoIcon className="insertIcon" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign Up</button>
        </form>

        <div className="registerStyle">
          <p>Do you have an account?</p>
          <Link to="/Login" className="registerLink">
            <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
