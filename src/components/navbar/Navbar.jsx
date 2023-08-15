import "./navbar.scss/";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search...."></input>
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <ChatBubbleOutlineIcon className="icons" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <NotificationsIcon className="icons" />
            <div className="counters">3</div>
          </div>
          <div className="item">
            <img
              src="https://i.pinimg.com/564x/ed/90/9f/ed909fbed92f6e2919cf6ef4e63c1683.jpg"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
