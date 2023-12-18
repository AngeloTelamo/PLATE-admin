import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login.scss";

class Loadingscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: undefined,
      completed: undefined,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, Password }), // Replace with actual email and password
      });

      if (response.ok) {
        this.setState({ loading: true });

        setTimeout(() => {
          this.setState({ completed: true });
        }, 1000);
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
                <span>Signing In...</span>
                <div className="half-spinner"></div>
              </div>
            ) : (
              <div className="completed">&#x2713;</div>
            )}
          </>
        ) : (
          <>
            <Link to="/home">
            </Link>
          </>
        )}
      </>
    );
  }
}

export default Loadingscreen;
