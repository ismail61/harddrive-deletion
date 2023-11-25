import React from "react";
import "./index.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

const Dashboard = () => {
  return (
    <main className="main-container p-5 container-fluid">
      <div className="main-title text-center">
        <h3 style={{color:"#ffe3a3"}}>DASHBOARD</h3>
      </div>

      <div className="main-cards row pt-4">
        <div className="card col-md-6 col-lg-3 mb-3 shadow">
          <div className="card-inner text-center">
            <h3>Registered Customer</h3>
          </div>
          <h1 className="text-center">300</h1>
        </div>
        <div className="card col-md-6 col-lg-3 mb-3 shadow">
          <div className="card-inner text-center">
            <h3>Drivers Scanned</h3>
          </div>
          <h1 className="text-center">12</h1>
        </div>
        <div className="card col-md-6 col-lg-3 mb-3 shadow">
          <div className="card-inner text-center">
            <h3>Pending Drives</h3>
          </div>
          <h1 className="text-center">42</h1>
        </div>
        <div className="card col-md-6 col-lg-3 mb-3 shadow">
          <div className="card-inner text-center">
            <h3>Drives Deleted</h3>
          </div>
          <h1 className="text-center">33</h1>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
