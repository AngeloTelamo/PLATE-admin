import "./register.scss";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="plate">PLATE</span>
        <span className="title">REGISTER</span>
        <form>
          <input placeholder="First name" type="text"></input>
          <input placeholder="Last name" type="text"></input>
          <input placeholder="Contact number" type="text"></input>
          <input placeholder="Email" type="email"></input>
          <input placeholder="Password" type="password"></input>
          <input style={{ display: "none" }} type="file" id="file"></input>
          <label htmlFor="file">
            <InsertPhotoIcon className="insertIcon" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>

        <div className="registerStyle">
          <p>Do you have an account?</p>
          <Link to='/Login' className="registerLink">
            <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
