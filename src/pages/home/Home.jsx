import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ListTable from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import UserChart from "../../components/chart/UserChart";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homecontainer">
        <Navbar/>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="owners" />

        </div>
        <div className="charts">
          <Featured />
          <UserChart />
        </div>
        <div className="listContainer">
          <div className="listTile">New Users</div>
          <ListTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
