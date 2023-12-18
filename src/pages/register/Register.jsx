import "./register.scss";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Registerloadingscreen from "../register/LoadingRegisterScreen";


const Register = () => {
  const [Fname, setFName] = useState('');
  const [Lname, setLName] = useState('');
  const [Contact, setContact] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [Profile, setProfile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "Fname") setFName(value);
    else if (name === "Lname") setLName(value);
    else if (name === "Contact") setContact(value);
    else if (name === "Email") setEmail(value);
    else if (name === "Password") setPassword(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
  };

  const renderFileInput = () => (
    <div className="hideForm">
      <input style={{ display: "none" }} type="file" id="file" onChange={handleFileChange} />
      <label htmlFor="file" className={Profile ? "fileLabelWithImage" : "fileLabel"}>
        <InsertPhotoIcon className="insertIcon" />
        <span>Add an avatar</span>
      </label>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (Fname === '' || Lname === '' || Contact === '' || Email === '' || Password === '') {
      setError('Fill all the necessary fields to proceed');
      setIsLoading(false);
    } else if (!isValidEmail(Email)) {
      setError('Invalid email address');
      setIsLoading(false);
    } else {
      setError('');

      try {
       
        const formData = new FormData();
        formData.append('Fname', Fname);
        formData.append('Lname', Lname);
        formData.append('Contact', Contact);
        formData.append('Email', Email);
        formData.append('Password', Password);

        if (Profile) {
          formData.append('Profile', Profile);
        }

        const response = await fetch('http://localhost:5000/api/submit', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
          setIsRegistered(true);
        } else {
          setMessage('Failed to submit data to the server.');
        }
        setFName('');
        setLName('');
        setContact('');
        setEmail('');
        setPassword('');
        setProfile(null);
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred while submitting data.');
      }
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        {isLoading && <Registerloadingscreen />}
        <span className="plate" style={{ display: isLoading || isRegistered ? "none" : "block" }}>PLATE</span>
        <span className="title" style={{ display: isLoading || isRegistered ? "none" : "block" }}>REGISTER</span>

        {isRegistered ? (
          <p>Registration successful. Message: {message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              placeholder="First name"
              type="text"
              name="Fname"
              value={Fname}
              onChange={handleInputChange}
              style={{ display: isLoading || isRegistered ? "none" : "block" }}
            />
            <input
              placeholder="Last name"
              type="text"
              name="Lname"
              value={Lname}
              onChange={handleInputChange}
              style={{ display: isLoading || isRegistered ? "none" : "block" }}
            />
            <input
              placeholder="Contact number"
              type="text"
              name="Contact"
              value={Contact}
              onChange={handleInputChange}
              style={{ display: isLoading || isRegistered ? "none" : "block" }}
            />
            <input
              placeholder="Email"
              type="email"
              name="Email"
              value={Email}
              onChange={handleInputChange}
              style={{ display: isLoading || isRegistered ? "none" : "block" }}
            />
            <input
              placeholder="Password"
              type="password"
              name="Password"
              value={Password}
              onChange={handleInputChange}
              style={{ display: isLoading || isRegistered ? "none" : "block" }}
            />
            {error && <div className="errorMessage">{error}</div>}
            {renderFileInput()}
            <button type="submit" style={{ display: isLoading || isRegistered ? "none" : "block" }}>Sign Up</button>
          </form>
        )}

        <div className="load" style={{ display: isLoading ? "none" : "block" }}>
          <div className="registerStyle">
            <p>Do you have an account?</p>
            <Link to="/Login" className="registerLink">
              <p>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
