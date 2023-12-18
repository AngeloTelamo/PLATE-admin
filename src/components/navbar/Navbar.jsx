import React from "react";
import "./navbar.scss";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">{/* Add your search component here if needed */}</div>
        <div className="items">

          {/*<Link to="/message">
            <div className="item">
              <ChatBubbleOutlineIcon className="icons" />
            </div>
          </Link>*/}

         {/* <Link to="/notif">
          <div className="item">  {/*need for notification pages
            <NotificationsIcon className="icons" />
          </div>
          </Link> 
          */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
