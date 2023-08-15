import "./widget.scss/";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import StoreIcon from "@mui/icons-material/Store";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { blue } from "@mui/material/colors";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        counter: 23,
        link: "See all users",
        icon: <PeopleOutlineIcon className="icon" />,
      };
      break;
    case "owners":
      data = {
        title: "Carinderia Onwers",
        counter: 4,
        link: "View all owners",
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
      break;
    case "orders":
      data = {
        title: "TOTAL ORDERS",
        counter: 23,
        link: "View all orders",
        icon: (
          <LocalOfferIcon
            className="icon"
            style={{
              color: "rgba(47, 173, 57)",
              backgroundColor: "rgba(202, 252, 210)",
            }}
          />
        ),
      };
      break;
    case "refund":
      data = {
        title: "REFUNDED",
        counter: 1,
        link: "View more..",
        icon: (
          <CurrencyExchangeIcon
            className="icon"
            style={{
              backgroundColor: "rgba(245, 242, 211)",
              color: "rgba(181, 170, 58)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
