import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          <h1>Bienvenida a Mystic Moon Makeup</h1>
          <p>Aquí podrás gestionar productos, categorías y más.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
