import "./login.scss";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="plate">PLATE</span>
        <span className="title">Login</span>
        <form>
          <input placeholder="Email" type="email"></input>
          <input placeholder="Password" type="password"></input>

          <button>Sign In</button>
        </form>

        <p>Don't have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
