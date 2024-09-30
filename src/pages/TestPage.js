import React from "react";
import Bar from "../components/bar";
import "../components/css/test.css";
import Foo from "../components/foo";
import BGLayout from "../components/layout/bglayout";
import AdminDashboard from "../pages/AdminDashnoard";



function TestPage() {

  const componentsMap = { Foo, Bar, AdminDashboard };
  const componentName = 'Foo';
  const DynamicComponent = componentsMap[componentName];

  return (
    <BGLayout>
      <DynamicComponent/>
    </BGLayout>
   
  );
}

export default TestPage;
