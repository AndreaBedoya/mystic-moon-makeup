import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import EditProduct from "../components/EditProduct";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("inicio");

  return (
    <div className="dashboard-container">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          {activeSection === "inicio" && (
            <>
              <h1>Bienvenida a Mystic Moon Makeup</h1>
              <p>Aquí podrás gestionar productos, categorías y más.</p>
            </>
          )}
          {activeSection === "productos" && <EditProduct />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
