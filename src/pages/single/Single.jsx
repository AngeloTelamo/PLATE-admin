import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./single.scss";
import Chart from "../../components/chart/Chart";
import ListTable from "../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <button className="editButton">Edit</button>
            <div className="titleTop">
              <h1 className="title">Information</h1>
            </div>
            <div className="item">
              <img
                src="https://i.pinimg.com/564x/ed/90/9f/ed909fbed92f6e2919cf6ef4e63c1683.jpg"
                alt=""
                className="itemImage"
              />
              <div className="detail">
                <h2> Jm Planteras</h2>
                <div className="itemDetails">
                  <div className="key">ID: </div>
                  <div className="value"> 1</div>
                </div>
                <div className="itemDetails">
                  <div className="key">Name: </div>
                  <div className="value"> Jm Planteras</div>
                </div>
                <div className="itemDetails">
                  <div className="key">Email: </div>
                  <div className="value"> jm.planteras@yahoo.com</div>
                </div>
                <div className="itemDetails">
                  <div className="key">Role: </div>
                  <div className="value"> Owner</div>
                </div>
                <div className="itemDetails">
                  <div className="key">Password </div>

                  <div className="value">: *********</div>
                  <VisibilityIcon className="eyeIcon" />
                </div>
                <div className="itemDetails">
                  <div className="key">Carinderia name:</div>
                  <div className="value"> Mang Jose</div>
                </div>
                <div className="itemDetails">
                  <div className="key">Carinderia Location:</div>
                  <div className="value"> Cebu</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart />
          </div>
        </div>
        <div className="bottom">
        <h2> List of Transactions</h2>
          <ListTable/>
        </div>
      </div>
    </div>
  );
};

export default Single;
