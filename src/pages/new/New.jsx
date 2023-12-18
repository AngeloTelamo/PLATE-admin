import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";

const New = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <h1 className="top">Edit the user</h1>
        <div className="bottom">
          <div className="left">
            <img
              src="https://i.pinimg.com/564x/ed/90/9f/ed909fbed92f6e2919cf6ef4e63c1683.jpg"
              alt=""
            />
          </div>
          <div className="right">
            <form>
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
                <label>Role</label>
                <input type="text" placeholder="Seller" />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input type="text" placeholder="123456" />
              </div>
              <div className="formInput">
                <label>Carinderia name</label>
                <input type="text" placeholder="Mang Jose" />
              </div>
              <div className="formInput">
                <label>Carinderia Location</label>
                <input type="text" placeholder="CEBU" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;
