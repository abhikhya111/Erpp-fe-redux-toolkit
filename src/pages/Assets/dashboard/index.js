import React from "react";
import TotalCount from "./TotalCount";
import AssetsMangement from "./AssetsMangement";
import AssetByStatus from "./AssetByStatus";
import AssetCategory from "./AssetCategory";
import '../index.css'

const Dashboard = () => {
  return (
    <div>
      <TotalCount />
      <div className="flex gap-5 flex-wrap md:flex-nowrap">
        <AssetsMangement />
        <AssetByStatus />
      </div>
      <AssetCategory />
    </div>
  );
};

export default Dashboard;
