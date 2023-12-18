import "./widget.scss/";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StoreIcon from "@mui/icons-material/Store";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

const getWidgetData = (type, count, sellerCount) => {
  switch (type) {
    case "user":
      return {
        title: "USERS",
        count: count,
        link: "/users",
        icon: <PeopleOutlineIcon className="icon" />,
      };
    case "owners":
      return {
        title: "Carinderia Owners",
        count: sellerCount,
        link: "/users",
        icon: (
          <StoreIcon
            className="icon"
            style={{
              backgroundColor: "rgba(245, 198, 240)",
              color: "rgba(138, 50, 128)",
            }}
          />
        ),
      };
    default:
      return {};
  }
};

const Widget = ({ type }) => {
  const [userData, setUserData] = useState([]);
  const [sellerCount, setSellerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUsers');
        const data = await response.json();
        setUserData(data.data);

        const sellers = data.data.filter(user => user.status === 'Seller');
        setSellerCount(sellers.length);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const count = userData.length;
  const data = getWidgetData(type, count, sellerCount);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <Link to={data.link} className="link">See all</Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/*<KeyboardArrowUpIcon />
            */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
