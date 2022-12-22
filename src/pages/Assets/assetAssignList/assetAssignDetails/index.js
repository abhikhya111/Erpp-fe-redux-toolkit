import React from "react";
import TopAssetAsignDetails from "./TopAssetAsignDetails";
import AssetAssignDetailsList from "./AssetAssignDetailsList";

const AllAssetsDetails = () => {
  return (
    <div className="bg-white pb-10 text-left">
      <TopAssetAsignDetails />
      <AssetAssignDetailsList />
    </div>
  );
};

export default AllAssetsDetails;
