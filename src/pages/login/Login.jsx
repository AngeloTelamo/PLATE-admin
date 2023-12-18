import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loadingscreen from "./LoadingScreen"; // Import the Loadingscreen component

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, Password }),
      });

      if (response.ok) {
        setTimeout(() => {
          setIsLoading(false);
          setIsAuthenticated(true);
          window.location.href = "/home";
        }, 2000);
      } else {
        setError("Login failed. Please check your credentials.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="loginPage">
       { !isAuthenticated && (
        <div className="formWrapper">
        {isLoading && <Loadingscreen />} 
          <span className="plate" style={{ display: isLoading ? "none" : "block" }}>PLATE</span>
          <span className="title" style={{ display: isLoading ? "none" : "block" }}>Login</span>
          <form onSubmit={handleSubmit} >
            <input
              placeholder="Email"
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ display: isLoading ? "none" : "block" }}
            ></input>
            <input
              placeholder="Password"
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ display: isLoading ? "none" : "block" }}
            ></input>

            <button className="link" type="submit" style={{ display: isLoading ? "none" : "block" }}>
              Sign In
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
          <div className="reigsterUp" style={{ display: isLoading ? "none" : "block" }}>
            <p>Don't have an account?</p>
            <Link to="/Register" className="registerStyle">
              <p>Register</p>
            </Link>
            <Link to= "/Forgot" className="registerStyle">
              <p>Forgot Password</p>
            </Link>
          </div>
        </div>
       )}
      </div>
    </div>
  );
};

export default Login;
