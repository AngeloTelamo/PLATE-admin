import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <span className="tops">Edit your account</span>
          <div className="bottom">
            <div className="left">
              <img
                src="https://i.pinimg.com/564x/ed/90/9f/ed909fbed92f6e2919cf6ef4e63c1683.jpg"
                alt=""
              />
            </div>
            <div className="right">
              <div className="editIcon">
                <EditIcon />
              </div>

              <form>
                {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>First name</label>
                  <input type="text" placeholder={input.firstname} />
                </div>
              ))} */}
                <div className="formInput">
                  <label>First name</label>
                  <input type="text" placeholder="Jm Planteras" />
                </div>
                <div className="formInput">
                  <label>Last name</label>
                  <input type="text" placeholder="Planteras" />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input type="text" placeholder="Jm.planteras@Yahoo.com" />
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input type="text" placeholder="123456" />
                </div>
              </form>
              <div className="buttons">
                <button className="uploadBtn">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
