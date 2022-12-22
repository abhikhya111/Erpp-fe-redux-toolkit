import React from "react";
import AssetAsignList from "./TopFilterAssetAssign";
import AssetAssignList from "./AssetAssignList";

const AllAssets = () => {
  return (
    <div className="bg-white p-5 shadow text-left">
      <AssetAsignList />
      <AssetAssignList />
    </div>
  );
};

export default AllAssets;
