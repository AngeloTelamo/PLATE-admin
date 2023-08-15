import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Transaction</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            className="circle"
            value={70}
            text="70%"
            strokeWidth={3}
            counterClockwise={true}
          />
        </div>
        <p className="title">Total of completed orders</p>
        <p className="total">40</p>
        <p className="desc">Summary of total transaction</p>

        <div className="summary">
          <div className="items">
            <div className="itemTitle">Pending</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon className="size" />
              <div className="resultAmmount">5</div>
            </div>
          </div>
          <div className="items">
            <div className="itemTitle">Cancelled</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon className="size" />
              <div className="resultAmmount">1</div>
            </div>
          </div>
          <div className="items">
            <div className="itemTitle">Completed</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon className="size" />
              <div className="resultAmmount">40</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
