import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./register.scss";

class Registerloadingscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: undefined,
      completed: undefined,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Fname, Lname, Contact, Email, Password: "your_password" }), // Replace with actual registration data
      });

      if (response.ok) {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ completed: true });
            setTimeout(() => {
              window.location.href = "/login";
            }, 5000); 
          }, 5000); 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  render() {
    return (
      <>
        {!this.state.completed ? (
          <>
            {!this.state.loading ? (
              <div className="spinner">
                <span>Signing Up...</span>
                <div className="half-spinner"></div>
              </div>
            ) : (
              <div className="completed">&#x2713;</div>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
            </Link>
          </>
        )}
      </>
    );
  }
}

export default Registerloadingscreen;
