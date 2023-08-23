import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="plate">PLATE</span>
        <span className="title">Login</span>
        <form>
          <input placeholder="Email" type="email"></input>
          <input placeholder="Password" type="password"></input>

          <Link to="/">
            <button className="link">Sign In</button>
          </Link>
        </form>

        <div className="reigsterUp">
          <p>Don't have an account?</p>
          <Link to='/Register' className="registerStyle">
            <p >Register</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
