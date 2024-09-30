import React, { useEffect, useState } from "react";

import BGCategories from "../components/bgcategories";
import BGProducts from "../components/bgproducts";
import "../components/css/AdminDashboard.css";
import Welcome from "../components/foo";
import BGLayout from "../components/layout/bglayout";

const AdminDashboard = () => {
  const componentsMap = { Welcome, BGCategories, BGProducts };
  const [componentName, setComponentName] = useState("Welcome"); // Default component
  const DynamicComponent = componentsMap[componentName];

  // Set default component when mounted
  useEffect(() => {
    setComponentName("Welcome"); // Initial component name
  }, []);
  return (
    <BGLayout setComponentName={setComponentName}>
      
      <div className="dashboard-content">
        <DynamicComponent />
      </div>
    </BGLayout>
  );
};

export default AdminDashboard;
