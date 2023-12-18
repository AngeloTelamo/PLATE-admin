import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);

      // Check if email is empty before making the API call
      if (!Email) {
        setMessage("Please provide an email address.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email }),
      });

      console.log(response); // Log the response

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div>
          <h2>Forgot Password</h2>
          <label>
            Email:
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button onClick={handleForgotPassword} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
          {message && <p>{message}</p>}
          <p>
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
