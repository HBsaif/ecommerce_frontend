import React from "react";
import "../css/layout.css"; // Add a separate CSS file for layout
import Sidebar from "../Sidebar";
import Footer from "./footer"; // Assuming you're importing your footer component
import Header from "./header"; // Assuming you're importing your header component

const BGLayout = ({ setComponentName, children }) => {
    return (
      <div className="layout">
        <Header />
        <div className="main-container">
          {/* <Sidebar /> */}
          <Sidebar setComponentName={setComponentName} />
          <main className="main-content">
            {children}
          </main>
        </div>
        <Footer /> {/* Place footer after main-container */}
      </div>
    );
  };
  

export default BGLayout;
