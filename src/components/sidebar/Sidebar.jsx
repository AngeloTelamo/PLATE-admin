import "./sidebar.scss/";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PLATE</span>
        </Link>
      </div>
      <hr></hr>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icons" />
            <span> Dashboard </span>
          </li>
          <p className="title">LIST</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icons" />
              <span style={{ color: "black " }}> Users </span>
            </li>
          </Link>
          <Link to="/users/1" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icons" />
              <span> Account </span>
            </li>
          </Link>
          <li>
            <NotificationsNoneIcon className="icons" />
            <span> Notification </span>
          </li>
          <li>
            <HistoryIcon className="icons" />
            <span> Logs </span>
          </li>
          <p className="title">ACCOUNT</p>
          {/* <li>
            <SettingsIcon className="icons" />
            <span> Setings </span>
          </li> */}
          <li>
            <AccountBoxIcon className="icons" />
            <span> Profile </span>
          </li>
          <li>
            <LogoutIcon className="icons" />
            <span> Logout </span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
